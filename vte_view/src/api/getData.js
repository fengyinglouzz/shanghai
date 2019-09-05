import fetch from '@/config/fetch'

/**
 * 登陆
 */

export const login = data => fetch('/system/login', data, 'POST');

export const sso = data => fetch('/system/sso', data, 'POST');


/**
 * 退出
 */

export const logout = () => fetch('/system/logout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('/admin/info');

/**
 * 获取患者列表
 */

export const getPatientList = data => fetch('/vtePatient/queryList', data, 'POST');

/**
 * 获取患者数量
 */

export const getPatientCount = data => fetch('/vtePatient/queryCount', data, 'POST');

/**
 * 添加患者信息
 */

export const addPatient = data => fetch('/vtePatient/addPatient', data, 'POST');

/**
 * 获取中高危监测列表
 */

export const getMonitorList = data => fetch('/mediumHighRiskPatient/queryMediumHighRiskPatientsList', data, 'POST');

/**
 * 获取中高危监测数量
 */

export const getMonitorCount = data => fetch('/mediumHighRiskPatient/queryMediumHighRiskPatientsCount', data, 'POST');

/**
 * 获取中高危监测科室人数
 */

export const getMonitorDepCount = data => fetch('/mediumHighRiskPatient/queryMediumHighRiskPatientsDeptCount', data, 'POST');

/**
 * 获取患者详情信息
 */

export const getPatientInfo = data => fetch('/vtePatientAssessment/queryPatientAssessment', data, 'POST');

/**
 * 获取患者详情列表
 */

export const getQueryList = data => fetch('/vtePatientAssessment/queryList', data, 'POST');

/**
 * 获取患者详情数量
 */

export const getQueryCount = data => fetch('/vtePatientAssessment/queryCount', data, 'POST');

/**
 * 获取患者详情导出数据表
 */

export const getQueryListExport = data => fetch('/vtePatientAssessment/queryListExport', data, 'POST');

/**
 * 导出全部质控
 * @param {*} data 
 */
export const exportAll = data => fetch('/vtePatientHospitInfo/exportAll', data, 'POST');

/**
 * 获取患者详情策略查询
 */

export const getQueryAssessmentStrategy = data => fetch('/vtePatientAssessment/queryAssessmentStrategy', data, 'POST');

/**
 * 获取患者评估详情查看
 */

export const getQueryAssessment = data => fetch('/vtePatientAssessment/queryAssessment', data, 'POST');

/**
 * 获取患者评估保存
 */

export const getSaveVteAssessmentInfo = data => fetch('/vteAssessmentAdviceSave/saveVteAssessmentInfo', data, 'POST');

/**
 * 获取患者医嘱保存
 */

export const getSaveVteDoctorAdviceInfo = data => fetch('/vteAssessmentAdviceSave/saveVteDoctorAdviceInfo', data, 'POST');

/**
 * 获取患者评估根据最后一次勾选
 */

export const getQueryVteAssessmentLastTime = data => fetch('/vteAssessmentAdviceSave/queryVteAssessmentLastTime', data, 'POST');

/**
 * 获取患者评估注释列表
 */

export const getQueryVteRiskScoreInfoList = data => fetch('/vteAssessmentAdviceSave/queryVteRiskScoreInfoList', data, 'POST');

/**
 * 获取质控视图KPI左侧视图
 */

export const getQualityViewKpi = data => fetch('/qualityView/queryPatientQualityViewKpi', data, 'POST');

/**
 * 获取质控视图VTE风险评估质量
 */

export const getQualityViewRiskAssessment = data => fetch('/qualityView/queryVteQualityRiskAssessment', data, 'POST');

/**
 * 获取质控视图中高危患者预防-中高危患者数
 */

export const getQualityViewRiskPatient = data => fetch('/qualityView/queryPreventionForMiddleHighRiskPatients', data, 'POST');

/**
 * 获取质控视图中高危患者预防-预防措施率
 */

export const getQualityViewRatePatient = data => fetch('/qualityView/queryPreventiveRatePatients', data, 'POST');

/**
 * 获取质控视图出血风险评估质量
 */

export const getQualityViewBleedingRisk = data => fetch('/qualityView/queryBleedingQualityRiskAssessment', data, 'POST');

/**
 * 获取质控视图患病情况
 */

export const getQualityViewPrevalence = data => fetch('/qualityView/queryPrevalenceAssessment', data, 'POST');


/**
 * 获取字典列表
 */
export const getAllDictList = data => fetch('/systemDict/queryAllDict', data);



/**
 * 查询用户列表
 */
export const getSystemUserList = data => fetch('/systemUser/queryList', data, 'POST');

/**
 * 获取用户数量
 */
export const getSystemUserCount = data => fetch('/systemUser/queryCount', data, 'POST');

/**
 * 保存用户信息
 */
export const addSystemUser = data => fetch('/systemUser/saveSystemUserInfo', data, 'POST');

/**
 * 查询用户 信息
 */
export const querySystemUser = data => fetch('/systemUser/querySystemUserInfo', data);

/**
 * 删除用户信息
 */
export const deleteSystemUser = data => fetch('/systemUser/delSystemUserInfo', data);

/**
 * 查询角色模块权限列表
 */
export const getVteRoleModelList = data => fetch('/vteRoleModel/queryList', data);

/**
 * 获取角色模块权限数量
 */
export const getVteRoleModelCount = data => fetch('/vteRoleModel/queryCount', data, 'POST');

/**
 * 保存角色模块权限信息
 */
export const addVteRoleModel = data => fetch('/vteRoleModel/saveVteRoleModelInfo', data, 'POST');

/**
 * 查询角色模块权限信息
 */
export const queryVteRoleModel = data => fetch('/vteRoleModel/queryVteRoleModelInfo', data);

/**
 * 删除角色模块权限信息
 */
export const deleteVteRoleModel = data => fetch('/vteRoleModel/delVteRoleModelInfo', data);

/**
 * 查询用户角色列表
 */
export const getSystemUserRoleList = data => fetch('/systemUserRole/queryList', data);

/**
 * 获取用户角色数量
 */
export const getSystemUserRoleCount = data => fetch('/systemUserRole/queryCount', data);

/**
 * 保存用户角色信息
 */
export const addSystemUserRole = data => fetch('/systemUserRole/saveSystemUserRoleInfo', data, 'POST');

/**
 * 查询用户角色信息
 */
export const querySystemUserRole = data => fetch('/systemUserRole/querySystemUserRoleInfo', data);

/**
 * 删除用户角色信息
 */
export const deleteSystemUserRole = data => fetch('/systemUserRole/delSystemUserRoleInfo', data);
/**
 * 查询全部角色
 */
export const getsystemUserRolePojoList = data => fetch('/systemRole/queryRolePojoList', data);

/**
 * 查询医院全部
 */
export const getHospitalPojoList = data => fetch('/systemOrg/queryVteHospitalPojoList', data);

/**
 * 查询机构列表
 */
export const getSystemOrgList = data => fetch('/systemOrg/queryList', data, 'POST');
/**
 * 查询机构-科室列表
 */
export const getSystemDepartmentList = data => fetch('/systemOrg/querySystemAllDepartmentList', data, 'POST');

/**
 * 获取机构数量
 */
export const getSystemOrgCount = data => fetch('/systemOrg/queryCount', data, 'POST');

/**
 * 保存机构信息
 */
export const addSystemOrg = data => fetch('/systemOrg/saveSystemOrgInfo', data, 'POST');

/**
 * 查询机构信息
 */
export const querySystemOrg = data => fetch('/systemOrg/querySystemOrgInfo', data);

/**
 * 删除机构信息
 */
export const deleteSystemOrg = data => fetch('/systemOrg/delSystemOrgInfo', data, 'POST');

/**
 * 查询字典列表
 */
export const getSystemDictList = data => fetch('/systemDict/queryList', data, 'POST');

/**
 * 查询字典列表
 */
export const getSystemDictPojoList = data => fetch('/systemDict/queryAllDictList', data);

/**
 * 获取字典数量
 */
export const getSystemDictCount = data => fetch('/systemDict/queryCount', data, 'POST');

/**
 * 保存字典信息
 */
export const addSystemDict = data => fetch('/systemDict/saveSystemDictInfo', data, 'POST');

/**
 * 查询字典信息
 */
export const querySystemDict = data => fetch('/systemDict/querySystemDictInfo', data);

/**
 * 删除字典信息
 */
export const deleteSystemDict = data => fetch('/systemDict/delSystemDictInfo', data, 'POST');

/**
 * 查询字典数据列表
 */
export const getSystemDictDataList = data => fetch('/systemDictData/queryList', data, 'POST');

/**
 * 获取字典数据数量
 */
export const getSystemDictDataCount = data => fetch('/systemDictData/queryCount', data, 'POST');

/**
 * 保存字典数据信息
 */
export const addSystemDictData = data => fetch('/systemDictData/saveSystemDictDataInfo', data, 'POST');

/**
 * 查询字典数据信息
 */
export const querySystemDictData = data => fetch('/systemDictData/querySystemDictDataInfo', data);

/**
 * 删除字典数据信息
 */
export const deleteSystemDictData = data => fetch('/systemDictData/delSystemDictDataInfo', data, 'POST');

/**
 * 查询角色列表
 */
export const getSystemRoleList = data => fetch('/systemRole/queryList', data, 'POST');

/**
 * 获取角色数量
 */
export const getSystemRoleCount = data => fetch('/systemRole/queryCount', data, 'POST');

/**
 * 保存角色信息
 */
export const addSystemRole = data => fetch('/systemRole/saveSystemRoleInfo', data, 'POST');

/**
 * 查询角色信息
 */
export const querySystemRole = data => fetch('/systemRole/querySystemRoleInfo', data);

/**
 * 删除角色信息
 */
export const deleteSystemRole = data => fetch('/systemRole/delSystemRoleInfo', data, 'POST');

/**
 * 查询风险评估列表
 */
export const getVteAssessmentList = data => fetch('/vteAssessment/queryList', data, 'POST');

/**
 * 获取风险评估数量
 */
export const getVteAssessmentCount = data => fetch('/vteAssessment/queryCount', data, 'POST');

/**
 * 保存风险评估信息
 */
export const addVteAssessment = data => fetch('/vteAssessment/saveVteAssessmentInfo', data, 'POST');

/**
 * 查询风险评估信息
 */
export const queryVteAssessment = data => fetch('/vteAssessment/queryVteAssessmentInfo', data);

/**
 * 删除风险评估信息
 */
export const deleteVteAssessment = data => fetch('/vteAssessment/delVteAssessmentInfo', data);

/**
 * 查询评分数据项字典列表
 */
export const getVteAssessmentDictList = data => fetch('/vteAssessmentDict/queryList', data, 'POST');

/**
 * 获取评分数据项字典数量
 */
export const getVteAssessmentDictCount = data => fetch('/vteAssessmentDict/queryCount', data, 'POST');

/**
 * 保存评分数据项字典信息
 */
export const addVteAssessmentDict = data => fetch('/vteAssessmentDict/saveVteAssessmentDictInfo', data, 'POST');

/**
 * 查询评分数据项字典信息
 */
export const queryVteAssessmentDict = data => fetch('/vteAssessmentDict/queryVteAssessmentDictInfo', data);

/**
 * 删除评分数据项字典信息
 */
export const deleteVteAssessmentDict = data => fetch('/vteAssessmentDict/delVteAssessmentDictInfo', data, 'POST');

/**
 * 查询角色-评分数据字典关联表列表
 */
export const getVteAssessmentDictRoleList = data => fetch('/vteAssessmentDictRole/queryList', data, 'POST');

/**
 * 获取角色-评分数据字典关联表数量
 */
export const getVteAssessmentDictRoleCount = data => fetch('/vteAssessmentDictRole/queryCount', data, 'POST');

/**
 * 保存角色-评分数据字典关联表信息
 */
export const addVteAssessmentDictRole = data => fetch('/vteAssessmentDictRole/saveVteAssessmentDictRoleInfo', data, 'POST');

/**
 * 查询角色-评分数据字典关联表信息
 */
export const queryVteAssessmentDictRole = data => fetch('/vteAssessmentDictRole/queryVteAssessmentDictRoleInfo', data);

/**
 * 删除角色-评分数据字典关联表信息
 */
export const deleteVteAssessmentDictRole = data => fetch('/vteAssessmentDictRole/delVteAssessmentDictRoleInfo', data);

/**
 * 查询患者科室（用于方便日后统计使用）列表
 */
export const getVteDepartmentList = data => fetch('/vteDepartment/queryList', data, 'POST');

/**
 * 获取患者科室（用于方便日后统计使用）数量
 */
export const getVteDepartmentCount = data => fetch('/vteDepartment/queryCount', data, 'POST');

/**
 * 保存患者科室（用于方便日后统计使用）信息
 */
export const addVteDepartment = data => fetch('/vteDepartment/saveVteDepartmentInfo', data, 'POST');

/**
 * 查询患者科室（用于方便日后统计使用）信息
 */
export const queryVteDepartment = data => fetch('/vteDepartment/queryVteDepartmentInfo', data);

/**
 * 删除患者科室（用于方便日后统计使用）信息
 */
export const deleteVteDepartment = data => fetch('/vteDepartment/delVteDepartmentInfo', data);

/**
 * 查询医嘱处理列表
 */
export const getVteDoctorAdviceList = data => fetch('/vteDoctorAdvice/queryList', data, 'POST');

/**
 * 获取医嘱处理数量
 */
export const getVteDoctorAdviceCount = data => fetch('/vteDoctorAdvice/queryCount', data, 'POST');

/**
 * 保存医嘱处理信息
 */
export const addVteDoctorAdvice = data => fetch('/vteAssessmentAdviceSave/saveVteDoctorAdviceInfo', data, 'POST');

/**
 * 查询医嘱处理信息
 */
export const queryVteDoctorAdvice = data => fetch('/vteDoctorAdvice/queryVteDoctorAdviceInfo', data);

/**
 * 删除医嘱处理信息
 */
export const deleteVteDoctorAdvice = data => fetch('/vteDoctorAdvice/delVteDoctorAdviceInfo', data);
 
/**
 * 查询DVT诊断流程建议列表
 */
export const getVteDvtAdviceList = data => fetch('/vteDvtAdvice/queryList', data, 'POST');

/**
 * 获取DVT诊断流程建议数量
 */
export const getVteDvtAdviceCount = data => fetch('/vteDvtAdvice/queryCount', data, 'POST');

/**
 * 保存DVT诊断流程建议信息
 */
export const addVteDvtAdvice = data => fetch('/vteDvtAdvice/saveVteDvtAdviceInfo', data, 'POST');

/**
 * 查询DVT诊断流程建议信息
 */
export const queryVteDvtAdvice = data => fetch('/vteDvtAdvice/queryVteDvtAdviceInfo', data);

/**
 * 删除DVT诊断流程建议信息
 */
export const deleteVteDvtAdvice = data => fetch('/vteDvtAdvice/delVteDvtAdviceInfo', data);

/**
 * 查询模块表列表
 */
export const getVteModelList = data => fetch('/vteModel/queryList', data, 'POST');

/**
 * 获取模块表数量
 */
export const getVteModelCount = data => fetch('/vteModel/queryCount', data, 'POST');

/**
 * 保存模块表信息
 */
export const addVteModel = data => fetch('/vteModel/saveVteModelInfo', data, 'POST');

/**
 * 查询模块表信息
 */
export const queryVteModel = data => fetch('/vteModel/queryVteModelInfo', data);

/**
 * 删除模块表信息
 */
export const deleteVteModel = data => fetch('/vteModel/delVteModelInfo', data, 'POST');

/**
 * 查询VTE风险分度列表
 */
export const getVteRiskScoreList = data => fetch('/vteRiskScore/queryList', data, 'POST');

/**
 * 获取VTE风险分度数量
 */
export const getVteRiskScoreCount = data => fetch('/vteRiskScore/queryCount', data, 'POST');

/**
 * 保存VTE风险分度信息
 */
export const addVteRiskScore = data => fetch('/vteRiskScore/saveVteRiskScoreInfo', data, 'POST');

/**
 * 查询VTE风险分度信息
 */
export const queryVteRiskScore = data => fetch('/vteRiskScore/queryVteRiskScoreInfo', data);

/**
 * 删除VTE风险分度信息
 */
export const deleteVteRiskScore = data => fetch('/vteRiskScore/delVteRiskScoreInfo', data);

/**
 * 获取患者详情树
 */

export const getQueryVteModelTree = data => fetch('/vteModel/queryVteModelTree', data, 'POST');

/**
 * 获取患者详情树字典
 */

export const getQueryVteAssessmentDictTree = data => fetch('/vteAssessmentDict/queryVteAssessmentDictTree', data);

/**
 * 获取患者详情角色字典
 */
export const getQueryAssessmentDicByRoleId = data => fetch('/vteAssessmentDictRole/queryAssessmentDicByRoleId', data, 'POST');

/**
 * 获取患者详情角色
 */
export const getQueryVteModelByRoleId = data => fetch('/vteRoleModel/queryVteModelByRoleId', data, 'POST');
