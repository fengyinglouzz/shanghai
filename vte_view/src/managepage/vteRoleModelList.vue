<template>
    <div class="fillcontain">
        <head-top ref="headTop"></head-top>
        <el-col :span="14" :offset="4" class="form_container">
          <el-form :rules="queryVteRoleModelListFormrules" :model="queryVteRoleModelListForm"  ref="queryVteRoleModelListForm" label-width="150px">
				<el-col :span="12">
				  <el-form-item label="" prop="roleModelId">
	                <el-input v-model="queryVteRoleModelListForm.roleModelId"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="模块id" prop="modelId">
	                <el-input v-model="queryVteRoleModelListForm.modelId"></el-input>
	              </el-form-item>
	            </el-col>
				<el-col :span="12">
				  <el-form-item label="角色ID" prop="roleId">
	                <el-input v-model="queryVteRoleModelListForm.roleId"></el-input>
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
            	 <el-table-column   prop="roleModelId"  label=""  min-width="150">  </el-table-column>
            	 <el-table-column   prop="modelId"  label="模块id"  min-width="150">  </el-table-column>
            	 <el-table-column   prop="roleId"  label="角色ID"  min-width="150">  </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="80">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="Pagination" style="text-align: left;margin-top: 10px;">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="count">
              </el-pagination>
          </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../managecomponents/addVteRoleModel'
    import {getVteRoleModelList, getVteRoleModelCount, addVteRoleModel} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getDictData} from '@/common/dictCache'
    import { debug } from 'util';

    
    export default {
        data(){
            return {
                queryVteRoleModelListForm: {
							 roleModelId:'',
							 modelId:'',
							 roleId:''
                },
                queryVteRoleModelListFormrules: {
                   
		            },
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
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const params = {
                      ...this.queryVteRoleModelListForm
                    }
                    const jsonString = JSON.stringify(params);
                    const countData = await getVteRoleModelCount({jsonString:jsonString});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getVteRoleModels(jsonString);
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
	          handleClick(row) {
              this.$refs.headTop.vteRoleModelFormVisible = true;
              			this.$refs.headTop.addVteRoleModelForm.roleModelId = row.roleModelId;
              			this.$refs.headTop.addVteRoleModelForm.modelId = row.modelId;
              			this.$refs.headTop.addVteRoleModelForm.roleId = row.roleId;
	        },
            handleSizeChange(val) {
              this.limit = val;
              console.log(`每页 
Expression val is undefined on line 135, column 33 in WebContent\managepage\${classNameAliasLower}List.vue.
The problematic instruction:
----------
==> ${val} [on line 135, column 31 in WebContent\managepage\${classNameAliasLower}List.vue]
----------

Java backtrace for programmers:
----------
freemarker.core.InvalidReferenceException: Expression val is undefined on line 135, column 33 in WebContent\managepage\${classNameAliasLower}List.vue.
	at freemarker.core.TemplateObject.assertNonNull(TemplateObject.java:124)
	at freemarker.core.Expression.getStringValue(Expression.java:118)
	at freemarker.core.Expression.getStringValue(Expression.java:93)
	at freemarker.core.DollarVariable.accept(DollarVariable.java:76)
	at freemarker.core.Environment.visit(Environment.java:196)
	at freemarker.core.MixedContent.accept(MixedContent.java:92)
	at freemarker.core.Environment.visit(Environment.java:196)
	at freemarker.core.Environment.process(Environment.java:176)
	at freemarker.template.Template.process(Template.java:232)
	at cn.org.rapid_framework.generator.Generator.saveNewOutputFileContent(Generator.java:206)
	at cn.org.rapid_framework.generator.Generator.generateNewFileOrInsertIntoFile(Generator.java:139)
	at cn.org.rapid_framework.generator.Generator.generateByModelProvider(Generator.java:90)
	at cn.org.rapid_framework.generator.Generator.generateByModelProvider(Generator.java:54)
	at cn.org.rapid_framework.generator.GeneratorFacade.generateByTable(GeneratorFacade.java:41)
	at com.gen.data.GeneratorData.run(GeneratorData.java:138)
	at com.insight.weixin.action.RestfulAction.creatModel(RestfulAction.java:72)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(Unknown Source)
	at java.lang.reflect.Method.invoke(Unknown Source)
	at com.opensymphony.xwork2.DefaultActionInvocation.invokeAction(DefaultActionInvocation.java:404)
	at com.opensymphony.xwork2.DefaultActionInvocation.invokeActionOnly(DefaultActionInvocation.java:267)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:229)
	at com.core.framework.interceptor.ExceptionInterceptor.intercept(ExceptionInterceptor.java:42)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at com.opensymphony.xwork2.interceptor.DefaultWorkflowInterceptor.doIntercept(DefaultWorkflowInterceptor.java:221)
	at com.opensymphony.xwork2.interceptor.MethodFilterInterceptor.intercept(MethodFilterInterceptor.java:86)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at com.opensymphony.xwork2.validator.ValidationInterceptor.doIntercept(ValidationInterceptor.java:150)
	at org.apache.struts2.interceptor.validation.AnnotationValidationInterceptor.doIntercept(AnnotationValidationInterceptor.java:48)
	at com.opensymphony.xwork2.interceptor.MethodFilterInterceptor.intercept(MethodFilterInterceptor.java:86)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at com.opensymphony.xwork2.interceptor.ConversionErrorInterceptor.intercept(ConversionErrorInterceptor.java:123)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at com.opensymphony.xwork2.interceptor.ParametersInterceptor.doIntercept(ParametersInterceptor.java:186)
	at com.opensymphony.xwork2.interceptor.MethodFilterInterceptor.intercept(MethodFilterInterceptor.java:86)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at com.opensymphony.xwork2.interceptor.StaticParametersInterceptor.intercept(StaticParametersInterceptor.java:105)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at org.apache.struts2.interceptor.CheckboxInterceptor.intercept(CheckboxInterceptor.java:83)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at org.apache.struts2.interceptor.FileUploadInterceptor.intercept(FileUploadInterceptor.java:207)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at com.opensymphony.xwork2.interceptor.ModelDrivenInterceptor.intercept(ModelDrivenInterceptor.java:74)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at com.opensymphony.xwork2.interceptor.ScopedModelDrivenInterceptor.intercept(ScopedModelDrivenInterceptor.java:127)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at org.apache.struts2.interceptor.ProfilingActivationInterceptor.intercept(ProfilingActivationInterceptor.java:107)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at org.apache.struts2.interceptor.debugging.DebuggingInterceptor.intercept(DebuggingInterceptor.java:206)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at com.opensymphony.xwork2.interceptor.ChainingInterceptor.intercept(ChainingInterceptor.java:115)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at com.opensymphony.xwork2.interceptor.I18nInterceptor.intercept(I18nInterceptor.java:143)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at com.opensymphony.xwork2.interceptor.PrepareInterceptor.doIntercept(PrepareInterceptor.java:121)
	at com.opensymphony.xwork2.interceptor.MethodFilterInterceptor.intercept(MethodFilterInterceptor.java:86)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at org.apache.struts2.interceptor.ServletConfigInterceptor.intercept(ServletConfigInterceptor.java:170)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at com.opensymphony.xwork2.interceptor.AliasInterceptor.intercept(AliasInterceptor.java:123)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at com.opensymphony.xwork2.interceptor.ExceptionMappingInterceptor.intercept(ExceptionMappingInterceptor.java:176)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:224)
	at com.opensymphony.xwork2.DefaultActionInvocation$2.doProfiling(DefaultActionInvocation.java:223)
	at com.opensymphony.xwork2.util.profiling.UtilTimerStack.profile(UtilTimerStack.java:455)
	at com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:221)
	at org.apache.struts2.impl.StrutsActionProxy.execute(StrutsActionProxy.java:50)
	at org.apache.struts2.dispatcher.Dispatcher.serviceAction(Dispatcher.java:504)
	at org.apache.struts2.dispatcher.FilterDispatcher.doFilter(FilterDispatcher.java:419)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:240)
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:207)
	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:88)
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:106)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:240)
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:207)
	at org.apache.logging.log4j.web.Log4jServletFilter.doFilter(Log4jServletFilter.java:71)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:240)
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:207)
	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:212)
	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:106)
	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:502)
	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:141)
	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:79)
	at org.apache.catalina.valves.AbstractAccessLogValve.invoke(AbstractAccessLogValve.java:616)
	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:88)
	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:522)
	at org.apache.coyote.http11.AbstractHttp11Processor.process(AbstractHttp11Processor.java:1095)
	at org.apache.coyote.AbstractProtocol$AbstractConnectionHandler.process(AbstractProtocol.java:672)
	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1500)
	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.run(NioEndpoint.java:1456)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)
	at java.lang.Thread.run(Unknown Source)
