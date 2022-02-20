package com.example.demo;
import java.util.*;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

// This tells Hibernate to make a table out of this class
@Entity
@Table(name = "pid_prescription")
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    //@Column(name = "id", updatable = false, nullable = false)
    private Integer id;


    private int pid;


    private Long issue_date;


    private String content;


    private boolean status;

    public Long getIssue_date() {
//        Date time = new Date();
//        time.setTime(issue_date);
//        return time;
        return issue_date;
    }

    public String getContent() {
        return content;
    }

    public boolean isStatus() {
        return status;
    }


    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public void setIssue_date(Long issue_date) {
        this.issue_date = issue_date;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
