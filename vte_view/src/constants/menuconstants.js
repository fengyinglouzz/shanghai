const routernextpath = {};
routernextpath.M1= "/patient"; //患者列表
routernextpath.M2= "/monitor"; 	//中高危检测
routernextpath.M3= "/qualityControl"; 	//系统视图
routernextpath.M4_001= "/manage"; 	//用户管理
routernextpath.M4_002= "/systemRole"; 	//角色管理
routernextpath.M4_003= "/systemOrg"; 	//机构管理
routernextpath.M4_004= "/systemDict"; 	//字典管理
routernextpath.M4_005= "/vteModel"; 	//模块管理
routernextpath.M4_006= "/vteAssessmentDict"; 	//评估数据项管理
routernextpath.M4_007= "/systemDictData"; 	//字典子项
routernextpath.M4_008= "/vteDepartment"; 	//患者科室管理

const patientRootCode = "1";

const systemRootCode = "4";



//评估编码
//Caprini评分	
const capriniDictValue = "1";
//Padua评分	2
const paduaDictValue = "2";
//外科出血风险评估	3
const surgeryDictValue  = "3";
//内科出血风险评估	4
const internalMedicineDictValue  = "4";
//药物预防禁忌评估	5
const drugPreventionDictValue  = "5";
//机械预防禁忌评估	6
const mechanicalPrecautionDictValue  = "6";
//Wells评分	7
const wellsDVTDictValue  = "7";
//简化Wells评分	8
const wellsPTEDictValue  = "8";
//修订版Geneva评分	9
const genevaDictValue  = "9";
//医嘱处理	10
const doctorAdviceDictValue  = "10";

//评估编码
//Caprini评分	
const capriniModelCode = "1-001-001-001";
//Padua评分	2
const paduaModelCode = "1-001-001-002";
//外科出血风险评估	3
const surgeryModelCode  = "1-001-002-001";
//内科出血风险评估	4
const internalMedicineModelCode  = "1-001-002-002";
//药物预防禁忌评估	5
const drugPreventionModelCode  = "1-001-003-001";
//机械预防禁忌评估	6
const mechanicalPrecautionModelCode  = "1-001-003-002";
//Wells评分	7
const wellsDVTModelCode  = "1-002-001-001";
//简化Wells评分	8
const wellsPTEModelCode  = "1-002-002-001";
//修订版Geneva评分	9
const genevaModelCode  = "1-002-002-002";
//医嘱处理	10
const doctorAdviceModelCode  = "1-002-003-001";

const patientQueryIndex = {"1-001-001-001":"caprini",//Caprini评分
                          "1-001-001-002":"padua",//Padua评分
                        "1-001-002-001":"surgery",//外科出血风险评估
                        "1-001-002-002":"internalMedicine",//内科出血风险评估
                        "1-001-003-001":"drugPrevention",//药物预防禁忌评估
                        "1-001-003-002":"mechanicalPrecaution",//机械预防禁忌评估
                        "1-002-001-001":"wellsDVT",//Wells评分
                        "1-002-001-002":"diagnosticProcessDVT",//DVT诊断流程建议
                        "1-002-002-001":"wellsPTE",//简化Wells评分
                        "1-002-002-002":"geneva",//修订版Geneva评分
                        "1-002-002-003":"diagnosticProcessPTE",//PTE诊断流程建议
                        "1-002-003-001":"doctorAdvice"};//医嘱处理

export default  {
    routernextpath,
    systemRootCode,
    patientRootCode,
    capriniDictValue,
    paduaDictValue,
    surgeryDictValue ,
    internalMedicineDictValue ,
    drugPreventionDictValue ,
    mechanicalPrecautionDictValue ,
    wellsDVTDictValue ,
    wellsPTEDictValue ,
    genevaDictValue ,
    doctorAdviceDictValue ,
    patientQueryIndex,
    capriniModelCode,
    paduaModelCode,
    surgeryModelCode,
    internalMedicineModelCode,
    drugPreventionModelCode,
    mechanicalPrecautionModelCode,
    wellsDVTModelCode,
    wellsPTEModelCode,
    genevaModelCode,
    doctorAdviceModelCode,
}