package com.insight.axiswevservice.pojo;

import java.io.Serializable;

public class SingleSignOnAndHospitInfo extends BatchPatientHospitInfo  implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private java.lang.String userCode;
	
	private java.lang.String userName;
	
	private java.lang.String userDepartment;
	
	private java.lang.String userRole;
	
	private java.lang.String modelCode;

	public java.lang.String getUserCode() {
		return userCode;
	}

	public void setUserCode(java.lang.String userCode) {
		this.userCode = userCode;
	}

	public java.lang.String getUserName() {
		return userName;
	}

	public void setUserName(java.lang.String userName) {
		this.userName = userName;
	}

	public java.lang.String getUserDepartment() {
		return userDepartment;
	}

	public void setUserDepartment(java.lang.String userDepartment) {
		this.userDepartment = userDepartment;
	}

	public java.lang.String getUserRole() {
		return userRole;
	}

	public void setUserRole(java.lang.String userRole) {
		this.userRole = userRole;
	}

	public java.lang.String getModelCode() {
		return modelCode;
	}

	public void setModelCode(java.lang.String modelCode) {
		this.modelCode = modelCode;
	}
	

}
