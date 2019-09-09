
package com.insight.wisehealth.vte.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.insight.core.config.ExportConfig;
import com.insight.core.util.CSVUtils;
import com.insight.core.util.JsonUtil;
import com.insight.core.util.R;
import com.insight.core.util.StringUtil;
import com.insight.core.util.DateUtil;
import com.insight.wisehealth.vte.loginpojo.LoginModelPojo;
import com.insight.wisehealth.vte.loginpojo.LoginUserPojo;
import com.insight.wisehealth.vte.persistence.TbVteAssessment;
import com.insight.wisehealth.vte.persistencepojo.TbVteAssessmentPojo;
import com.insight.wisehealth.vte.pojo.VteAssessmentAndListPojo;
import com.insight.wisehealth.vte.pojo.VteAssessmentStrategyPojo;
import com.insight.wisehealth.vte.pojo.VtePatientAssessmentPojo;
import com.insight.wisehealth.vte.service.VteAssessmentService;

/**
 * 
 * 描述:风险评估Controller
 * 
 * Copyright © 2019 Insight.ltd All rights reserved
 * 
 * @author 王珠珠
 * @version 1.0.0
 */
@RestController
public class VteAssessmentController  {
	@Autowired
	private VteAssessmentService vteAssessmentService;
	/**
	 * 列表查询
	 * @param start
	 * @param limit
	 * @param jsonString
	 * @return
	 */
	@RequestMapping("/vtePatientAssessment/queryList")
   public List queryList(@RequestParam("start")  Integer  start,@RequestParam("limit") Integer  limit ,@RequestParam(value="jsonString",required=false) String  jsonString) {
	    if(StringUtil.isEmpty(jsonString)){
	    	jsonString = "{}";
	    }
    	Map map = JsonUtil.getMapFromJson(jsonString);
		map.put("start", start);
		map.put("limit", limit);
		List list = new ArrayList();
		try {
			list = vteAssessmentService.queryVteAssessmentListWithAdvice(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
	    return list;
    }
   /**
    * 列表计数
    * @param jsonString
    * @return
    */
   @RequestMapping("/vtePatientAssessment/queryCount")
   public R queryCount(@RequestParam(value="jsonString",required=false) String  jsonString) {
	    if(StringUtil.isEmpty(jsonString)){
	    	jsonString = "{}";
	    }
	    Map map = JsonUtil.getMapFromJson(jsonString);
	    int count = 0;
		try {
			count = vteAssessmentService.countVteAssessmentListWithAdvice(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    return R.ok().put("count", count);
    }
   // 通用版本历史导出
   /**
   @RequestMapping("/vtePatientAssessment/queryListExport")
   public R queryListExport(@RequestParam(value="jsonString",required=false) String  jsonString,@RequestParam("excelStr") String  excelStr ,HttpServletRequest request) {
	    if(StringUtil.isEmpty(jsonString)){
	    	jsonString = "{}";
	    }
	    Map map = JsonUtil.getMapFromJson(jsonString);
		List list = new ArrayList();
		Map resultMap = new HashMap();
		try {
			list = vteAssessmentService.queryVteAssessmentAdviceExport(map);
			
			if(StringUtil.isEmpty(excelStr)){
				excelStr = ".xlsx";
			}
			String templateFilePath = ExportConfig.templateFilePath  + ExportConfig.templateFileInnerPath;
			List headList = new ArrayList();
			headList.add("时间");
			headList.add("风险评估阶段");
			headList.add("类型");
			headList.add("项目");
			headList.add("结果");
			headList.add("分值");
			String[] cols = { "createDt", "assessmentStageExplain", "assessmentTypeExplain", "assessmentItemExplain", "resultExplain", "assessmentScore"};
			File filePath =outputExcelFile(list, excelStr, templateFilePath, headList, cols);
			StringBuffer url = request.getRequestURL(); 
			String tempContextUrl = url.delete(url.length() - request.getRequestURI().length(), url.length()).append("/").toString(); 
			String canonicalPath = filePath.getAbsolutePath();
			String oldStr = ExportConfig.templateFilePath;
			resultMap.put("filePath", tempContextUrl + canonicalPath.substring(oldStr.length()-1, canonicalPath.length()));
			System.out.println(tempContextUrl + canonicalPath.substring(oldStr.length()-1, canonicalPath.length()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	    return R.ok(resultMap);
   }
   **/
   
   // 东方 【评分明细导出】
   @RequestMapping("/vtePatientAssessment/queryListExport")
   public R queryListExport(@RequestParam(value="jsonString",required=false) String  jsonString,@RequestParam("excelStr") String  excelStr ,HttpServletRequest request, HttpSession httpSession) {
	    if(StringUtil.isEmpty(jsonString)){
	    	jsonString = "{}";
	    }
   		LoginUserPojo loginUserPojo = (LoginUserPojo)httpSession.getAttribute("loginUserPojo");
   		List<LoginModelPojo> loginModelPojoList = loginUserPojo.getLoginModelPojoList();
   	
	    Map map = JsonUtil.getMapFromJson(jsonString);
		List list = new ArrayList();
		Map resultMap = new HashMap();
		VtePatientAssessmentPojo patientAssessmentPojo = new VtePatientAssessmentPojo();
   		VteAssessmentAndListPojo assessmentAndListPojo = new VteAssessmentAndListPojo();
		try {
			list = vteAssessmentService.queryVteAssessmentAdviceExport(map);
			List list1 = new ArrayList<>();
			for(int i = 0; i < list.size(); i++) {
				Object object = list.get(i);
				HashMap map2 = (HashMap) list.get(i); 
				int assessmentId = (int) map2.get("assessmentId");
		   		map.put("assessmentId", assessmentId);
		   		map.put("modelName", "assessment");
				assessmentAndListPojo = vteAssessmentService.queryAssessment(map);
				String strTotal = " ";
				if(assessmentAndListPojo == null) {
					list1.add("");
				} else {
					Map<String, List<String>> selectMap = assessmentAndListPojo.getSelectData();
					for(int j = 1; j <= 5; j++) {
						if(j == 4) continue;
						if(selectMap.containsKey(j + "")) {
							for(String str : selectMap.get(j + "")) {
								strTotal += str + " |";
							}
						}
					}
					list1.add(strTotal.substring(0, strTotal.length() - 1));
				}
				// 评估明细
				strTotal = "";
			}
			patientAssessmentPojo = vteAssessmentService.queryPatientAssessment(map,loginModelPojoList);
			// 住院号
			String patientCode = patientAssessmentPojo.getPatientCode();
			String patientInHospital = vteAssessmentService.queryPatientInHospital(map);
			Map map1 = new HashMap();
			map1.put("姓名", patientAssessmentPojo.getPatientName());
			map1.put("性别", patientAssessmentPojo.getPatientSex());
			map1.put("年龄", patientAssessmentPojo.getPatientAge());
			map1.put("住院号", patientAssessmentPojo.getPatientCode());
			map1.put("入院时间", patientInHospital);
			map1.put("科室", patientAssessmentPojo.getPatientDepartment());
			map1.put("病区", patientAssessmentPojo.getPatientArea());
			map1.put("评估人", patientAssessmentPojo.getPatientName());

			if(StringUtil.isEmpty(excelStr)){
				excelStr = ".xlsx";
			}
			String templateFilePath = ExportConfig.templateFilePath  + ExportConfig.templateFileInnerPath;
			List headList = new ArrayList();
			headList.add("姓名");
			headList.add("性别");
			headList.add("年龄");
			headList.add("住院号");
			headList.add("入院时间");
			headList.add("科室");
			headList.add("病区");
			headList.add("评估人");
			
			headList.add("评估时间");
			headList.add("风险评估阶段");
			headList.add("类型");
			headList.add("项目");
			headList.add("结果");
			headList.add("分值");

			headList.add("评估明细");

			String[] cols = {"","","","","","","","" ,"createDt", "assessmentStageExplain", "assessmentTypeExplain", "assessmentItemExplain", "resultExplain", "assessmentScore", "assessmentDetail"};
			File filePath =outputExcelFile(list, excelStr, templateFilePath, headList, cols, list1, map1);
			
			StringBuffer url = request.getRequestURL(); 
			String tempContextUrl = url.delete(url.length() - request.getRequestURI().length(), url.length()).append("/").toString(); 
			String canonicalPath = filePath.getAbsolutePath();
			String oldStr = ExportConfig.templateFilePath;
			resultMap.put("filePath", tempContextUrl + canonicalPath.substring(oldStr.length()-1, canonicalPath.length()));
			System.out.println(tempContextUrl + canonicalPath.substring(oldStr.length()-1, canonicalPath.length()));
		} catch (Exception e) {
			e.printStackTrace();
		}
	    return R.ok(resultMap);
   }
   
	/**
	 * 详情页患者信息及评估
	 * @param patientHospitId
	 * @return
	 */
   @RequestMapping( value = "/vtePatientAssessment/queryPatientAssessment", method = RequestMethod.POST)
   public VtePatientAssessmentPojo queryPatientAssessment(@RequestParam(value="patientHospitId",required=true ) Integer patientHospitId,HttpSession httpSession) {
	   
   		Map map = new HashMap();
   		VtePatientAssessmentPojo patientAssessmentPojo = new VtePatientAssessmentPojo();
   		if(patientHospitId == null){
   			return null;
   		}
   		LoginUserPojo loginUserPojo = (LoginUserPojo)httpSession.getAttribute("loginUserPojo");
   		List<LoginModelPojo> loginModelPojoList = loginUserPojo.getLoginModelPojoList();
   		
   		
   		map.put("patientHospitId", patientHospitId);
   		//获取登录人信息，查询相应评分项目，存入map中
		try {
			patientAssessmentPojo = vteAssessmentService.queryPatientAssessment(map,loginModelPojoList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	    return patientAssessmentPojo;
   }
   /**
    * 患者详情页上部策略查询
    * @param patientHospitId
    * @return
    */
   @RequestMapping( value = "/vtePatientAssessment/queryAssessmentStrategy", method = RequestMethod.POST)
   public VteAssessmentStrategyPojo queryAssessmentStrategy(@RequestParam(value="patientHospitId",required=true) Integer patientHospitId) {
	   
	   
   		Map map = new HashMap();
   		VteAssessmentStrategyPojo patientAssessmentPojo = new VteAssessmentStrategyPojo();
   		if(patientHospitId == null){
   			return null;
   		}
   		map.put("patientHospitId", patientHospitId);
   		//获取登录人信息，查询相应评分项目，存入map中
   		
		try {
			patientAssessmentPojo = vteAssessmentService.queryAssessmentStrategy(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	    return patientAssessmentPojo;
   }
   /**
    * 列表点击详情
    * @param patientHospitId
    * @param modelName
    * @return
    */
   @RequestMapping( value = "/vtePatientAssessment/queryAssessment", method = RequestMethod.POST)
   public VteAssessmentAndListPojo queryAssessment(@RequestParam(value="assessmentId",required=true) Integer assessmentId,@RequestParam(value="modelName",required=true) String modelName) {
	   
   		Map map = new HashMap();
   		VteAssessmentAndListPojo assessmentAndListPojo = new VteAssessmentAndListPojo();
   		map.put("assessmentId", assessmentId);
   		map.put("modelName", modelName);
   		//获取登录人信息，查询相应评分项目，存入map中
   		
		try {
			assessmentAndListPojo = vteAssessmentService.queryAssessment(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	    return assessmentAndListPojo;
   }
   /**
    * 列表点击详情
    * @param patientHospitId
    * @param modelName
    * @return
    */
   @RequestMapping( value = "/vtePatientAssessment/queryAssessmentView", method = RequestMethod.POST)
   public VteAssessmentAndListPojo queryAssessmentView(@RequestParam(value="jsonString",required=false) String  jsonString,@RequestParam(value="modelName",required=true) String modelName) {
	   if(StringUtil.isEmpty(jsonString)){
	    	jsonString = "{}";
	    }
	   Map map = JsonUtil.getMapFromJson(jsonString);
   		VteAssessmentAndListPojo assessmentAndListPojo = new VteAssessmentAndListPojo();
   		map.put("modelName", modelName);
   		//获取登录人信息，查询相应评分项目，存入map中
   		
		try {
			assessmentAndListPojo = vteAssessmentService.queryAssessmentView(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	    return assessmentAndListPojo;
   }
   /**
	 * @param jsonString
	 * @return
	 */
   @RequestMapping( value = "/vteAssessmentAdviceSave/saveVteAssessmentInfo", method = RequestMethod.POST)
   public R saveVteAssessmentInfo(@RequestParam(value="jsonString",required=false) String  jsonString,HttpSession httpSession) {
	    if(StringUtil.isEmpty(jsonString)){
	    	jsonString = "{}";
	    }
	    LoginUserPojo loginUserPojo = (LoginUserPojo)httpSession.getAttribute("loginUserPojo");
	   String userName =  loginUserPojo.getUserName();
	    
	    Map map = JsonUtil.getMapFromJson(jsonString);
	    map.put("userName", userName);
	    
	    TbVteAssessment saveVteAssessment;
		try {
			saveVteAssessment = vteAssessmentService.saveVteAssessment(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	    return  R.ok();
    }
   
   /**
	 * @param jsonString
	 * @return
	 */
   @RequestMapping("/vteAssessment/delVteAssessmentInfo")
   public R delVteAssessmentInfo(@RequestParam(value="jsonString",required=false) String  jsonString) {
	    if(StringUtil.isEmpty(jsonString)){
	    	jsonString = "{}";
	    }
	    Map map = JsonUtil.getMapFromJson(jsonString);
	   
		try {
			  vteAssessmentService.delVteAssessment(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	    return  R.ok();
    }
   /**
	 * @param jsonString
	 * @return
	 */
   @RequestMapping("/vteAssessment/queryVteAssessmentInfo")
   public TbVteAssessment queryVteAssessmentInfo(@RequestParam(value="jsonString",required=false) String  jsonString) {
	    if(StringUtil.isEmpty(jsonString)){
	    	jsonString = "{}";
	    }
	    Map map = JsonUtil.getMapFromJson(jsonString);
	    TbVteAssessment queryVteAssessmentInfo=null;
		try {
			   queryVteAssessmentInfo = vteAssessmentService.queryVteAssessmentInfo(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	    return  queryVteAssessmentInfo;
    }
   
   
   /**
	 * @param jsonString
	 * @return
	 */
  @RequestMapping("/vteAssessmentAdviceSave/queryVteAssessmentLastTime")
  public TbVteAssessmentPojo queryVteAssessmentInfoLastTime(@RequestParam(value="patientHospitId",required=true) Integer patientHospitId,@RequestParam(value="modelCode",required=true) String modelCode,@RequestParam( value="superModelCode",required=false ) String superModelCode) {
	    Map map = new HashMap();
	    map.put("patientHospitId", patientHospitId);
	    map.put("modelCode", modelCode);
	    map.put("superModelCode", superModelCode);
	    TbVteAssessmentPojo queryVteAssessmentInfo=null;
		try {
			   queryVteAssessmentInfo = vteAssessmentService.queryVteAssessmentInfoLastTime(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	    return  queryVteAssessmentInfo;
   }
   
  // 东方
  protected File outputExcelFile(List dataList,String excelStr, String templateFilePath,List headList,String[] cols, List list1, Map map1) {
		//产生一个唯一的路径 防止并发
		
		BufferedInputStream bufferInputStream = null;
		try {
			
			File file = new File(templateFilePath);
			 if (!file.exists()) {
				 file.mkdirs();
			 }
			
			String createFilePathName = templateFilePath  + DateUtil.getYYYYMMDDHHMMSSDate(new Date()) + excelStr ;
			// 产生导出文件
			
			File downloadFile = new File(createFilePathName);
			if(".csv".equals(excelStr)){
				CSVUtils.exportCsv(downloadFile, headList, dataList);
			}else if (".xlsx".equals(excelStr)){
				CSVUtils.writeExcel(downloadFile, headList, dataList,cols, map1,list1);
			}
			
			// 设置response的编码方式
			//response.setContentType("application/x-msdownload");
			// 写明要下载的文件的大小
			//response.setContentLength((int) downloadFile.length());
			// 解决中文乱码
			//response.setHeader("Content-Disposition", "attachment;filename="
			//		+ encode(fileName + suffix));
			bufferInputStream = new BufferedInputStream(new FileInputStream(
					downloadFile));
			return downloadFile;
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (bufferInputStream != null) {
				try {
					bufferInputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return null;
	}
   
  
   
   /**
	 * 导出CVS文件
	 * 
	 * @param dataList 导出数据
	 * @param excelStr 后缀名
	 * @param createFilePathName 存放路径
	 * @param headList 头信息 
	 * @param cols 列信息
	 */
   protected File outputExcelFile(List dataList,String excelStr, String templateFilePath,List headList,String[] cols) {
		//产生一个唯一的路径 防止并发
		
		BufferedInputStream bufferInputStream = null;
		try {
			
			File file = new File(templateFilePath);
			 if (!file.exists()) {
				 file.mkdirs();
			 }
			
			String createFilePathName = templateFilePath  + DateUtil.getYYYYMMDDHHMMSSDate(new Date()) + excelStr ;
			// 产生导出文件
			
			File downloadFile = new File(createFilePathName);
			if(".csv".equals(excelStr)){
				CSVUtils.exportCsv(downloadFile, headList, dataList);
			}else if (".xlsx".equals(excelStr)){
				CSVUtils.writeExcel(downloadFile, headList, dataList,cols);
			}
			
			// 设置response的编码方式
			//response.setContentType("application/x-msdownload");
			// 写明要下载的文件的大小
			//response.setContentLength((int) downloadFile.length());
			// 解决中文乱码
			//response.setHeader("Content-Disposition", "attachment;filename="
			//		+ encode(fileName + suffix));
			bufferInputStream = new BufferedInputStream(new FileInputStream(
					downloadFile));
			return downloadFile;
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (bufferInputStream != null) {
				try {
					bufferInputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return null;
	}
   
   	private String gainFilePath(String tempFilePath){
		Date d = new Date();
		String fileNamePath = d.getTime()+"_1";
		File file =new File(tempFilePath+"/"+fileNamePath);
		int i=2;
		while(true){
			if  (!file .exists()  && !file .isDirectory()){  
				file .mkdir(); //目录创建 
				return tempFilePath+"/"+fileNamePath+"/";    
			}else{
				fileNamePath = d.getTime()+"_"+i;
				file =new File(tempFilePath+"/"+fileNamePath);
			}
		}
	}
   
   
   
   
   
   
   
   

}