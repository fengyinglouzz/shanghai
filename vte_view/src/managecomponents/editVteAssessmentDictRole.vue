<template>
    <div >
		<el-dialog title="编辑模块" v-model="vteAssessmentDictRoleTreeVisible" height="500" :close-on-click-modal="false">
			<el-tree
                :props="props"
                :load="loadNode"
                 lazy
                show-checkbox
                node-key="id"
                @check-change="handleCheckChange"
                :default-expand-all="defaultExpand"
                 ref="tree">
                </el-tree>
			<div :span="24" slot="footer" class="dialog-footer">
				<el-button @click="hideSaveForm">取 消</el-button>
				<el-button type="primary" @click="addVteAssessmentDictRole">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
  import {getQueryVteAssessmentDictTree,addVteAssessmentDictRole} from '@/api/getData'
  export default {
    data() {
      return {
        props: {
          label: 'name',
          children: 'vteAssessmentDictPojoList'
        },
        vteAssessmentDictRoleTreeVisible:false,
        count: 1,
        roleId:0,
        treeData:[],
        defaultExpand:true
      };
    },
    created(){
        this.getModelData();
    },
    methods: {
      	showSaveForm(){
            this.vteAssessmentDictRoleTreeVisible = true;
        },
        hideSaveForm(){
            this.vteAssessmentDictRoleTreeVisible = false;
        },
        setChecked(selectData) {
           this.$refs.tree.setCheckedKeys(selectData);
        },
        handleCheckChange(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
        },
        handleNodeClick(data) {
            console.log(data);
        },
        async getModelData(){
           this.treeData = await getQueryVteAssessmentDictTree();
           if(this.treeData!=null&& this.treeData.length>0){
             for(var i=0;i< this.treeData.length;i++){
               this.treeData[i].name = this.treeData[i].assessmentItemExplain;
               //this.treeData[i].id = this.treeData[i].assessmentItem;
               if(this.treeData[i].vteAssessmentDictPojoList!=null&&this.treeData[i].vteAssessmentDictPojoList.length>0){
                   for(var j=0;j< this.treeData[i].vteAssessmentDictPojoList.length;j++){
                     this.treeData[i].vteAssessmentDictPojoList[j].id = this.treeData[i].vteAssessmentDictPojoList[j].assessmentDictId;
                     this.treeData[i].vteAssessmentDictPojoList[j].name = this.treeData[i].vteAssessmentDictPojoList[j].assessmentDictName;
                   }
               }
             }
           }
        },
        async addVteAssessmentDictRole(){
           var params ={};
           params.roleId = this.roleId;
           const assessmentDictIds = this.$refs.tree.getCheckedKeys();
           params.assessmentDictIds = assessmentDictIds;
           const jsonString = JSON.stringify(params);
           const result = await addVteAssessmentDictRole({jsonString:jsonString});
           if(result.status =="1"){
             	console.log(result)
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
           }else{
             	this.$message({
					            	type: 'error',
					            	message: result.message
					          	});
           }
           this.hideSaveForm();
        },
        loadNode(node, resolve) {
            if (node.level === 0) {
                return resolve(this.treeData);
            }
            if (node.level >= 1) {
                if(node.data.vteAssessmentDictPojoList==null||node.data.vteAssessmentDictPojoList.length==0){
                    node.isLeaf = true;
                    return resolve([]);
                }else{
                    return resolve(node.data.vteAssessmentDictPojoList);
                }
            }                
        }
    }
  };
</script>
