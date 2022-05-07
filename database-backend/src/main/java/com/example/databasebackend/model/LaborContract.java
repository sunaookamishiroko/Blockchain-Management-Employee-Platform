package com.example.databasebackend.model;

import javax.persistence.*;

@Entity
@Table(name = "laborcontract")
@IdClass(LaborContractPK.class)
public class LaborContract {

    @Id
    private String address;

    @Column(name = "wpname")
    private String wpName;

    @Column(name = "wpemployer")
    private String wpEmployer;

    @Column(name = "employeename")
    private String employeeName;

    @Id
    @Column(name = "workplaceindex")
    private int workplaceIndex;

    private String period;

    private String duties;

    @Column(name = "workingtime")
    private String workingTime;

    @Column(name = "workingdays")
    private String workingDays;

    private String wage;

    @Column(name = "wageday")
    private String wageDay;

    private String comment;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getWpName() {
        return wpName;
    }

    public void setWpName(String wpName) {
        this.wpName = wpName;
    }

    public String getWpEmployer() {
        return wpEmployer;
    }

    public void setWpEmployer(String wpEmployer) {
        this.wpEmployer = wpEmployer;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public int getWorkplaceIndex() {
        return workplaceIndex;
    }

    public void setWorkplaceIndex(int workplaceIndex) {
        this.workplaceIndex = workplaceIndex;
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

    public String getWorkingTime() {
        return workingTime;
    }

    public void setWorkingTime(String workingTime) {
        this.workingTime = workingTime;
    }

    public String getWorkingDays() {
        return workingDays;
    }

    public void setWorkingDays(String workingDays) {
        this.workingDays = workingDays;
    }

    public String getWage() {
        return wage;
    }

    public void setWage(String wage) {
        this.wage = wage;
    }

    public String getWageDay() {
        return wageDay;
    }

    public void setWageDay(String wageDay) {
        this.wageDay = wageDay;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
