<template>
    <div class="fillcontain">
        <head-top ref="headTop"></head-top>
        <el-col :span="14" :offset="4" class="form_container">
            <el-form :rules="querySystemOrgListFormrules" :model="querySystemOrgListForm" ref="querySystemOrgListForm"
                     label-width="150px">
                <el-col :span="12">
                    <el-form-item label="机构名称" prop="orgName">
                        <el-input v-model="querySystemOrgListForm.orgName"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="机构联系人" prop="orgContact">
                        <el-input v-model="querySystemOrgListForm.orgContact"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="组织机构电话" prop="orgPhone">
                        <el-input v-model="querySystemOrgListForm.orgPhone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="组织机构邮箱" prop="orgEmail">
                        <el-input v-model="querySystemOrgListForm.orgEmail"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="组织机构地址" prop="orgAddress">
                        <el-input v-model="querySystemOrgListForm.orgAddress"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="12" :offset="8">
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="reset">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-col>
        <div class="table_container">
            <el-table
                :data="tableData"
                max-height="460"
                border>
                <el-table-column prop="num" label="序号" min-width="60"></el-table-column>
                <el-table-column prop="orgName" label="组织机构名称" min-width="150"></el-table-column>
                <el-table-column prop="orgCode" label="组织机构代码" min-width="150"></el-table-column>
                <el-table-column prop="orgContact" label="组织机构联系人" min-width="150"></el-table-column>
                <el-table-column prop="orgType" label="机构类型" min-width="150"></el-table-column>
                <el-table-column prop="orgPhone" label="组织机构电话" min-width="150"></el-table-column>
                <el-table-column prop="orgEmail" label="组织机构邮箱" min-width="150"></el-table-column>
                <el-table-column prop="orgAddress" label="组织机构地址" min-width="150"></el-table-column>

                <el-table-column
                    fixed="right"
                    label="操作"
                    width="240">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
                        <el-button @click="delDataClick(scope.row)" size="small">删除</el-button>
                        <el-button v-if="scope.row.orgType==='hospital'" @click="adddEpartmentClick(scope.row)"
                                   size="small">添加科室
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="科室" v-model="addDepartmentFormVisible" :close-on-click-modal="false">
                <el-form rules="addDepartmentFormrules" :model="addDepartmentForm" ref="addDepartmentForm">
                    <el-col :span="24">
                        <el-form-item label="科室代码" prop="orgCode">
                            <el-input v-model="addDepartmentForm.orgCode" :disabled="true" style="width: 10%"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="show">
                        <el-form-item label="科室名称" prop="orgId">
                            <el-input v-model="addDepartmentForm.orgId" style="width: 80%"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="科室名称" prop="orgName">
                            <el-input v-model="addDepartmentForm.orgName" style="width: 80%"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="科室类型" prop="orgType">
                            <el-select v-model="addDepartmentForm.orgType" clearable placeholder="请选择"
                                       style="width: 80%;">
                                <el-option
                                    v-for="item in departmentOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form>
                <div :span="24" slot="footer" class="dialog-footer">
                    <el-button @click="addDepartmentFormVisible = false">取 消</el-button>
                    <el-button @click="addDepartmentinfo()">确 定</el-button>
                </div>
            </el-dialog>

            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40, 50, 100]"
                    :page-size="limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../managecomponents/addSystemOrg'
    import {getSystemOrgList, getSystemOrgCount, addSystemOrg, deleteSystemOrg} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'
    import {debug} from 'util';


    export default {
        data() {
            return {
                querySystemOrgListForm: {
                    orgId: '',
                    orgName: '',
                    orgCode: '',
                    orgContact: '',
                    orgType: '',
                    orgPhone: '',
                    orgEmail: '',
                    orgAddress: '',
                    orgLeaf: '',
                    orgVersion: ''
                },
                querySystemOrgListFormrules: {},
                addDepartmentForm: {
                    orgId: '',
                    orgName: '',
                    orgCode: '',
                    orgContact: '',
                    orgType: '',
                    orgPhone: '',
                    orgEmail: '',
                    orgAddress: '',
                    orgLeaf: '',
                    orgVersion: ''
                },
                addDepartmentFormrules: {},
                addDepartmentFormVisible: false,
                departmentOptions: [
                    {value: "department_w", text: "department_w"},
                    {value: "department_n", text: "department_n"}
                ],
                show: false,
                baseUrl,
                baseImgPath,
                tableData: [],
                currentPage: 1,
                offset: 0,
                limit: 10,
                count: 0
            }
        },
        components: {
            headTop,
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                try {
                    const params = {
                        ...this.querySystemOrgListForm
                    }
                    params.pageSort = "org_code asc";
                    const jsonString = JSON.stringify(params);
                    const countData = await getSystemOrgCount({jsonString: jsonString});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getSystemOrgs(jsonString);
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleClick(row) {
                this.$refs.headTop.title = "机构信息";
                if (row.orgType == "hospital") {//医院
                    this.$refs.headTop.systemOrgFormVisible = true;
                    this.$refs.headTop.addSystemOrgForm.orgId = row.orgId;
                    if (row.orgName != null) this.$refs.headTop.addSystemOrgForm.orgName = row.orgName;
                    if (row.orgCode != null) this.$refs.headTop.addSystemOrgForm.orgCode = row.orgCode;
                    if (row.orgContact != null) this.$refs.headTop.addSystemOrgForm.orgContact = row.orgContact;
                    if (row.orgType != null) this.$refs.headTop.addSystemOrgForm.orgType = row.orgType;
                    if (row.orgPhone != null) this.$refs.headTop.addSystemOrgForm.orgPhone = row.orgPhone;
                    if (row.orgEmail != null) this.$refs.headTop.addSystemOrgForm.orgEmail = row.orgEmail;
                    if (row.orgAddress != null) this.$refs.headTop.addSystemOrgForm.orgAddress = row.orgAddress;
                    if (row.orgLeaf != null) this.$refs.headTop.addSystemOrgForm.orgLeaf = row.orgLeaf;
                    if (row.orgVersion != null) this.$refs.headTop.addSystemOrgForm.orgVersion = row.orgVersion;
                } else {//科室
                    this.addDepartmentFormVisible = true;
                    this.addDepartmentForm.orgId = row.orgId;
                    if (row.orgName != null) this.addDepartmentForm.orgName = row.orgName;
                    if (row.orgCode != null) this.addDepartmentForm.orgCode = row.orgCode;
                    if (row.orgType != null) this.addDepartmentForm.orgType = row.orgType;

                }

            },
            handleSizeChange(val) {
                this.limit = val;
                console.log(`每页 $#{val} 条`);
                this.initData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.initData();
            },
            reset() {
                this.$refs.querySystemOrgListForm.resetFields();
            },
            search() {
                this.initData();
            },
            async getSystemOrgs(jsonString) {
                const Users = await getSystemOrgList({offset: this.offset, limit: this.limit, jsonString: jsonString});
                this.tableData = [];
                let i = this.offset = (this.currentPage - 1) * this.limit;
                Users.forEach(item => {
                    const tableData = {};
                    tableData.num = i + 1,
                        i++,
                        tableData.orgId = item.orgId;
                    tableData.orgId = item.orgId;
                    tableData.orgName = item.orgName;
                    tableData.orgCode = item.orgCode;
                    tableData.orgContact = item.orgContact;
                    tableData.orgType = item.orgType;
                    tableData.orgPhone = item.orgPhone;
                    tableData.orgEmail = item.orgEmail;
                    tableData.orgAddress = item.orgAddress;
                    tableData.orgLeaf = item.orgLeaf;
                    tableData.orgVersion = item.orgVersion;
                    this.tableData.push(tableData);
                })
            },
            adddEpartmentClick(row) {
                this.addDepartmentFormVisible = true;
                this.clearFrom();
                this.addDepartmentForm.orgCode = row.orgCode;
            },
            addDepartmentinfo() {
                this.$refs.addDepartmentForm.validate(async (valid) => {
                    if (valid) {
                        const params = {
                            ...this.addDepartmentForm
                        }
                        try {
                            const jsonString = JSON.stringify(params);
                            const result = await addSystemOrg({jsonString: jsonString});
                            if (result.status == 1) {
                                console.log(result)
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.addDepartmentFormVisible = false;
                                this.clearFrom();
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: result.message
                                });
                            }
                            this.initData();
                        } catch (err) {
                            console.log(err)
                        }
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请检查输入是否正确',
                            offset: 100
                        });
                        return false;
                    }
                });
            },
            clearFrom() {
                this.addDepartmentForm = {
                    orgId: '',
                    orgName: '',
                    orgCode: '',
                    orgContact: '',
                    orgType: '',
                    orgPhone: '',
                    orgEmail: '',
                    orgAddress: '',
                    orgLeaf: '',
                    orgVersion: ''
                }
            },
            delDataClick(row) {
                this.$confirm('确认删除该机构, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delSystemOrgData(row);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            async delSystemOrgData(row) {
                const data = {};
                data.ids = String(row.orgId);
                const jsonString = JSON.stringify(data);
                const result = await deleteSystemOrg({jsonString: jsonString});
                if (result.status == 1) {
                    console.log(result)
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: result.message
                    });
                }
                this.initData();
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }

    .form_container {
        padding-top: 20px;
    }

    .line {
        text-align: center;
    }

    .hideContent {
        display: none;
    }
</style>

