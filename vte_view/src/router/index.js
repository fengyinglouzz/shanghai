import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const sso = r => require.ensure([], () => r(require('@/page/sso')), 'sso');
const patient = r => require.ensure([], () => r(require('@/page/patient')), 'patient');
const patientList = r => require.ensure([], () => r(require('@/page/patientList')), 'patientList');
const caprini = r => require.ensure([], () => r(require('@/page/caprini')), 'caprini');
const padua = r => require.ensure([], () => r(require('@/page/padua')), 'padua');
const surgery = r => require.ensure([], () => r(require('@/page/surgery')), 'surgery');
const internalMedicine = r => require.ensure([], () => r(require('@/page/internalMedicine')), 'internalMedicine');
const drugPrevention = r => require.ensure([], () => r(require('@/page/drugPrevention')), 'drugPrevention');
const mechanicalPrecaution = r => require.ensure([], () => r(require('@/page/mechanicalPrecaution')), 'mechanicalPrecaution');
const wellsDVT = r => require.ensure([], () => r(require('@/page/wellsDVT')), 'wellsDVT');
const diagnosticProcessDVT = r => require.ensure([], () => r(require('@/page/diagnosticProcessDVT')), 'diagnosticProcessDVT');
const diagnosticProcessPTE = r => require.ensure([], () => r(require('@/page/diagnosticProcessPTE')), 'diagnosticProcessPTE');
const wellsPTE = r => require.ensure([], () => r(require('@/page/wellsPTE')), 'wellsPTE');
const geneva = r => require.ensure([], () => r(require('@/page/geneva')), 'geneva');
const doctorAdvice = r => require.ensure([], () => r(require('@/page/doctorAdvice')), 'doctorAdvice');
const monitor = r => require.ensure([], () => r(require('@/page/monitor')), 'monitor');
const qualityControl = r => require.ensure([], () => r(require('@/page/qualityControl')), 'qualityControl');
const patientQuery = r => require.ensure([], () => r(require('@/page/patientQuery')), 'patientQuery');

const manage = r => require.ensure([], () => r(require('@//managepage/manage')), 'manage');
const systemUserList = r => require.ensure([], () => r(require('@/managepage/systemUserList')), 'systemUserList');
const systemRoleList = r => require.ensure([], () => r(require('@/managepage/systemRoleList')), 'systemRoleList');
const systemOrgList = r => require.ensure([], () => r(require('@/managepage/systemOrgList')), 'systemOrgList');
const vteDepartmentList  = r => require.ensure([], () => r(require('@/managepage/vteDepartmentList')), 'vteDepartmentList');
const systemDictList = r => require.ensure([], () => r(require('@/managepage/systemDictList')), 'systemDictList');
const systemDictDataList = r => require.ensure([], () => r(require('@/managepage/systemDictDataList')), 'systemDictDataList');
const vteModelList = r => require.ensure([], () => r(require('@/managepage/vteModelList')), 'vteModelList');
const vteAssessmentDictList = r => require.ensure([], () => r(require('@/managepage/vteAssessmentDictList')), 'vteAssessmentDictList');


const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: systemUserList,
			meta: {
				menuShow:true,
				menuName:"用户列表",
				path: '/manage',
				menuTitle:['用户列表']
			}
		},{
			path: '/systemRole',
			component: systemRoleList,
			meta: {
				menuShow:true,
				menuName:"角色列表",
				path: '/systemRole',
				menuTitle:['角色列表']
			}
		},{
			path: '/systemOrg',
			component: systemOrgList,
			meta: {
				menuShow:true,
				menuName:"机构列表",
				path: '/systemOrg',
				menuTitle:['机构列表']
			}
		},{
			path: '/vteDepartment',
			component: vteDepartmentList,
			meta: {
				menuShow:true,
				menuName:"患者科室管理",
				path: '/vteDepartment',
				menuTitle:['患者科室管理']
			}
		},{
			path: '/systemDict',
			component: systemDictList,
			meta: {
				menuShow:true,
				menuName:"字典列表",
				path: '/systemDict',
				menuTitle:['字典列表']
			}
		},{
			path: '/systemDictData',
			component: systemDictDataList,
			meta: {
				menuShow:true,
				menuName:"字典子项列表",
				path: '/systemDictData',
				menuTitle:['字典子项列表']
			}
		},{
			path: '/vteModel',
			component: vteModelList,
			meta: {
				menuShow:true,
				menuName:"模块列表",
				path: '/vteModel',
				menuTitle:['模块列表']
			}
		},{
			path: '/vteAssessmentDict',
			component: vteAssessmentDictList,
			meta: {
				menuShow:true,
				menuName:"评估数据项列表",
				path: '/vteAssessmentDict',
				menuTitle:['评估数据项列表']
			}
		}]
	},
	{
		path: '/patient',
		component: patient,
		name: '',
		children: [
		{
			path: '',
			component: patientList,
			meta: {
				menuShow:true,
				menuName:"患者列表",
				path: '/patient',
				menuTitle:['患者列表']
			}
		},{
			path: '/patientQuery',
			component: patientQuery,
			meta: {
				menuShow:false,
				menuName:"患者详情",
				path: '/patientQuery',
				menuTitle:['患者列表', '患者详情']
			}
		},{
			path: '/caprini',
			component: caprini,
			meta: {
				menuShow:false,
				menuName:"Caprini风险评估",
				path: '/caprini',
				menuTitle:['患者列表', '患者详情', 'Caprini风险评估']
			}
		},{
			path: '/padua',
			component: padua,
			meta: {
				menuShow:false,
				menuName:"Padua风险评估",
				path: '/padua',
				menuTitle:['患者列表', '患者详情', 'Padua风险评估']
			}
		},{
			path: '/surgery',
			component: surgery,
			meta: {
				menuShow:false,
				menuName:"外科出血风险评估",
				path: '/surgery',
				menuTitle:['患者列表', '患者详情', '外科出血风险评估']
			}
		},{
			path: '/internalMedicine',
			component: internalMedicine,
			meta: {
				menuShow:false,
				menuName:"内科出血风险评估",
				path: '/internalMedicine',
				menuTitle:['患者列表', '患者详情', '内科出血风险评估']
			}
		},{
			path: '/drugPrevention',
			component: drugPrevention,
			meta: {
				menuShow:false,
				menuName:"药物预防禁忌评估",
				path: '/drugPrevention',
				menuTitle:['患者列表', '患者详情', '药物预防禁忌评估']
			}
		},{
			path: '/mechanicalPrecaution',
			component: mechanicalPrecaution,
			meta: {
				menuShow:false,
				menuName:"机械预防禁忌评估",
				path: '/mechanicalPrecaution',
				menuTitle:['患者列表', '患者详情', '机械预防禁忌评估']
			}
		},{
			path: '/wellsDVT',
			component: wellsDVT,
			meta: {
				menuShow:false,
				menuName:"Wells评分",
				path: '/wellsDVT',
				menuTitle:['患者列表', '患者详情', 'Wells评分']
			}
		},{
			path: '/diagnosticProcessDVT',
			component: diagnosticProcessDVT,
			meta: {
				menuShow:false,
				menuName:"DVT诊断流程建议",
				path: '/diagnosticProcessDVT',
				menuTitle:['患者列表', '患者详情', 'DVT诊断流程建议']
			}
		},{
			path: '/diagnosticProcessPTE',
			component: diagnosticProcessPTE,
			meta: {
				menuShow:false,
				menuName:"PTE诊断流程建议",
				path: '/diagnosticProcessPTE',
				menuTitle:['患者列表', '患者详情', 'PTE诊断流程建议']
			}
		},{
			path: '/wellsPTE',
			component: wellsPTE,
			meta: {
				menuShow:false,
				menuName:"简化Wells评分",
				path: '/wellsPTE',
				menuTitle:['患者列表', '患者详情', '简化Wells评分']
			}
		},{
			path: '/geneva',
			component: geneva,
			meta: {
				menuShow:false,
				menuName:"修订版Geneva评分",
				path: '/geneva',
				menuTitle:['患者列表', '患者详情', '修订版Geneva评分']
			}
		},{
			path: '/doctorAdvice',
			component: doctorAdvice,
			meta: {
				menuShow:false,
				menuName:"医嘱处理",
				path: '/doctorAdvice',
				menuTitle:['患者列表', '患者详情', '医嘱处理']
			}
		},{
			path: '/monitor',
			component: monitor,
			meta: {
				menuShow:true,
				menuName:"中高危监测",
				path: '/monitor',
				menuTitle:['中高危监测']
			}
		},{
			path: '/qualityControl',
			component: qualityControl,
			meta: {
				menuShow:true,
				menuName:"质控视图",
				path: '/qualityControl',
				menuTitle:['质控视图']
			}
		}]
	},
	{
		path: '/sso',
		component: sso
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
