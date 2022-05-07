package com.example.databasebackend.model;

import javax.persistence.*;

@Entity
@Table(name = "laborcontract")
@IdClass(LaborContractPK.class)
public class LaborContract {

    @Id
    private String address;

    @Column(name = "wpname")
    private String wpname;

    @Column(name = "wpemployer")
    private String wpemployer;

    @Column(name = "employeename")
    private String employeename;

    @Id
    @Column(name = "workplaceindex")
    private int workplaceindex;

    private String period;

    private String duties;

    @Column(name = "workingtime")
    private String workingtime;

    @Column(name = "workingdays")
    private String workingdays;

    private String wage;

    @Column(name = "wageday")
    private String wageday;

    private String comment;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getWpname() {
        return wpname;
    }

    public void setWpname(String wpname) {
        this.wpname = wpname;
    }

    public String getWpemployer() {
        return wpemployer;
    }

    public void setWpemployer(String wpemployer) {
        this.wpemployer = wpemployer;
    }

    public String getEmployeename() {
        return employeename;
    }

    public void setEmployeename(String employeename) {
        this.employeename = employeename;
    }

    public int getWorkplaceindex() {
        return workplaceindex;
    }

    public void setWorkplaceindex(int workplaceindex) {
        this.workplaceindex = workplaceindex;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public String getDuties() {
        return duties;
    }

    public void setDuties(String duties) {
        this.duties = duties;
    }

    public String getWorkingtime() {
        return workingtime;
    }

    public void setWorkingtime(String workingtime) {
        this.workingtime = workingtime;
    }

    public String getWorkingdays() {
        return workingdays;
    }

    public void setWorkingdays(String workingdays) {
        this.workingdays = workingdays;
    }

    public String getWage() {
        return wage;
    }

    public void setWage(String wage) {
        this.wage = wage;
    }

    public String getWageday() {
        return wageday;
    }

    public void setWageday(String wageday) {
        this.wageday = wageday;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
