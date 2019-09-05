<template>
    <div >
		<el-dialog title="编辑模块" v-model="vteRoleModelTreeVisible" height="500" :close-on-click-modal="false">
			<el-tree
                :props="props"
                :load="loadNode"
                lazy
                show-checkbox
                node-key="modelId"
                @check-change="handleCheckChange"
                :default-expand-all="defaultExpand"
                 ref="tree">
                </el-tree>
			<div :span="24" slot="footer" class="dialog-footer">
				<el-button @click="hideSaveForm">取 消</el-button>
				<el-button type="primary" @click="addVteRoleModels">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
  import {getQueryVteModelTree,addVteRoleModel} from '@/api/getData'
  export default {
    data() {
      return {
        props: {
          label: 'modelName',
          children: 'childrenList'
        },
        vteRoleModelTreeVisible:false,
        count: 1,
        treeData:[],
        roleId:0,
        defaultExpand:true
      };
    },
    created(){
        this.getModelData();
    },
    methods: {
      	showSaveForm(){
            this.vteRoleModelTreeVisible = true;
        },
        hideSaveForm(){
            this.vteRoleModelTreeVisible = false;
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
            this.treeData = await getQueryVteModelTree();
        },
        async addVteRoleModels(){
           var params ={};
           params.roleId = this.roleId;
           const modelIds = this.$refs.tree.getCheckedKeys();
           params.modelIds = modelIds;
           const jsonString = JSON.stringify(params);
           const result = await addVteRoleModel({jsonString:jsonString});
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
                if(node.data.childrenList==null||node.data.childrenList.length==0){
                    node.isLeaf = true;
                    return resolve([]);
                }else{
                    return resolve(node.data.childrenList);
                }
            }                
        }
    }
  };
</script>
