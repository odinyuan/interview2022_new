package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "Login")
public class Login {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	private String passwd;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	private String getPasswd() {
		return passwd;
	}

	private void setPasswd(Integer id) {
		this.passwd = passwd;
	}


}
