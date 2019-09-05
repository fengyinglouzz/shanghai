
import {setStore,getStore} from '../config/mUtils'
import {getAllDictList} from '../api/getData'


export const isEmptyObject = object =>{
        if(object==null){
            return true;
        }
        if(JSON.stringify(object)=='{}'){
            return  true;
        }
        if(JSON.stringify(object)=='"{}"'){
            return  true;
        }
        return false;
}

export const getDictData = orgId =>{
            const dictcache =  getStore("DICT_CACHE");
            if(isEmptyObject(dictcache)){
                const dict =   getAllDictList();
                if(isEmptyObject(dict)){
                    const jsonstr = '{"doctorAdviceResult":[{"dictInternational":"zh_CN","dictDataValue":"1","dictCode":"doctor_advice_result","dictName":"医嘱处理诊断结果","orgId":1,"dictDataName":"PTE"},{"dictInternational":"zh_CN","dictDataValue":"2","dictCode":"doctor_advice_result","dictName":"医嘱处理诊断结果","orgId":1,"dictDataName":"DVT"}],"patientSynGrade":[],"dvtAdviceIshistory":[{"dictInternational":"zh_CN","dictDataValue":"1","dictCode":"dvt_advice_ishistory","dictName":"DVT诊断流程建议是否历史","orgId":1,"dictDataName":"是"},{"dictInternational":"zh_CN","dictDataValue":"2","dictCode":"dvt_advice_ishistory","dictName":"DVT诊断流程建议是否历史","orgId":1,"dictDataName":"否"}],"assessmentResult":[{"dictInternational":"zh_CN","dictDataValue":"3","dictCode":"assessment_result","dictName":"风险评估结果","orgId":1,"dictDataName":"高危"},{"dictInternational":"zh_CN","dictDataValue":"2","dictCode":"assessment_result","dictName":"风险评估结果","orgId":1,"dictDataName":"中危"},{"dictInternational":"zh_CN","dictDataValue":"1","dictCode":"assessment_result","dictName":"风险评估结果","orgId":1,"dictDataName":"低危"}],"assessmentType":[{"dictInternational":"zh_CN","dictDataValue":"1","dictCode":"assessment_type","dictName":"风险评估类型","orgId":1,"dictDataName":"VTE风险评估"},{"dictInternational":"zh_CN","dictDataValue":"2","dictCode":"assessment_type","dictName":"风险评估类型","orgId":1,"dictDataName":"出血风险评估"},{"dictInternational":"zh_CN","dictDataValue":"3","dictCode":"assessment_type","dictName":"风险评估类型","orgId":1,"dictDataName":"预防禁忌评估"},{"dictInternational":"zh_CN","dictDataValue":"4","dictCode":"assessment_type","dictName":"风险评估类型","orgId":1,"dictDataName":"DVT疑诊"},{"dictInternational":"zh_CN","dictDataValue":"5","dictCode":"assessment_type","dictName":"风险评估类型","orgId":1,"dictDataName":"PTE疑诊"},{"dictInternational":"zh_CN","dictDataValue":"6","dictCode":"assessment_type","dictName":"风险评估类型","orgId":1,"dictDataName":"诊断结果及医嘱"}],"patientCapriniGrade":[{"dictInternational":"zh_CN","dictDataValue":"1","dictCode":"patient_caprini_grade","dictName":"患者数据Caprini风险等级","orgId":1,"dictDataName":"低危"},{"dictInternational":"zh_CN","dictDataValue":"2","dictCode":"patient_caprini_grade","dictName":"患者数据Caprini风险等级","orgId":1,"dictDataName":"中危"},{"dictInternational":"zh_CN","dictDataValue":"3","dictCode":"patient_caprini_grade","dictName":"患者数据Caprini风险等级","orgId":1,"dictDataName":"高危"}],"patientPaduaGrade":[{"dictInternational":"zh_CN","dictDataValue":"1","dictCode":"patient_padua_grade","dictName":"患者数据Padua风险等级","orgId":1,"dictDataName":"低危"},{"dictInternational":"zh_CN","dictDataValue":"3","dictCode":"patient_padua_grade","dictName":"患者数据Padua风险等级","orgId":1,"dictDataName":"高危"}],"doctorAdviceRisk":[{"dictInternational":"zh_CN","dictDataValue":"1","dictCode":"doctor_advice_risk","dictName":"风险预防f措施","orgId":1,"dictDataName":"一般预防"},{"dictInternational":"zh_CN","dictDataValue":"2","dictCode":"doctor_advice_risk","dictName":"风险预防f措施","orgId":1,"dictDataName":"药物预防"},{"dictInternational":"zh_CN","dictDataValue":"3","dictCode":"doctor_advice_risk","dictName":"风险预防f措施","orgId":1,"dictDataName":"机械预防"}],"patientIsRisk":[{"dictInternational":"zh_CN","dictDataValue":"1","dictCode":"patient_is_risk","dictName":"已完成VTE风险评","orgId":1,"dictDataName":"是"},{"dictInternational":"zh_CN","dictDataValue":"2","dictCode":"patient_is_risk","dictName":"已完成VTE风险评","orgId":1,"dictDataName":"否"}],"assessmentItem":[{"dictInternational":"zh_CN","dictDataValue":"8","dictCode":"assessment_item","dictName":"风险评估项目","orgId":1,"dictDataName":"简化Wells评分"},{"dictInternational":"zh_CN","dictDataValue":"9","dictCode":"assessment_item","dictName":"风险评估项目","orgId":1,"dictDataName":"修订版Geneva评分"},{"dictInternational":"zh_CN","dictDataValue":"10","dictCode":"assessment_item","dictName":"风险评估项目","orgId":1,"dictDataName":"医嘱处理"},{"dictInternational":"zh_CN","dictDataValue":"7","dictCode":"assessment_item","dictName":"风险评估项目","orgId":1,"dictDataName":"Wells评分"},{"dictInternational":"zh_CN","dictDataValue":"6","dictCode":"assessment_item","dictName":"风险评估项目","orgId":1,"dictDataName":"机械预防禁忌评估"},{"dictInternational":"zh_CN","dictDataValue":"5","dictCode":"assessment_item","dictName":"风险评估项目","orgId":1,"dictDataName":"药物预防禁忌评估"},{"dictInternational":"zh_CN","dictDataValue":"1","dictCode":"assessment_item","dictName":"风险评估项目","orgId":1,"dictDataName":"Caprini评分"},{"dictInternational":"zh_CN","dictDataValue":"2","dictCode":"assessment_item","dictName":"风险评估项目","orgId":1,"dictDataName":"Padua评分"},{"dictInternational":"zh_CN","dictDataValue":"3","dictCode":"assessment_item","dictName":"风险评估项目","orgId":1,"dictDataName":"外科出血风险评估"},{"dictInternational":"zh_CN","dictDataValue":"4","dictCode":"assessment_item","dictName":"风险评估项目","orgId":1,"dictDataName":"内科出血风险评估"}],"assessmentStage":[{"dictInternational":"zh_CN","dictDataValue":"1","dictCode":"assessment_stage","dictName":"风险评估阶段","orgId":1,"dictDataName":"入院"},{"dictInternational":"zh_CN","dictDataValue":"2","dictCode":"assessment_stage","dictName":"风险评估阶段","orgId":1,"dictDataName":"术后"},{"dictInternational":"zh_CN","dictDataValue":"3","dictCode":"assessment_stage","dictName":"风险评估阶段","orgId":1,"dictDataName":"转科室"},{"dictInternational":"zh_CN","dictDataValue":"4","dictCode":"assessment_stage","dictName":"风险评估阶段","orgId":1,"dictDataName":"动态"}],"rolePower":[{"dictInternational":"zh_CN","dictDataValue":"1","dictCode":"role_power","dictName":"角色数据权限","orgId":1,"dictDataName":"全部"},{"dictInternational":"zh_CN","dictDataValue":"2","dictCode":"role_power","dictName":"角色数据权限","orgId":1,"dictDataName":"本科室"}]}';
                    const dictd =  JSON.parse(jsonstr)
                    setStore("DICT_CACHE",dictd);
                    return dictd                    
                }
                setStore("DICT_CACHE",dict);
                return dict;
            }
            return JSON.parse(dictcache);
}







