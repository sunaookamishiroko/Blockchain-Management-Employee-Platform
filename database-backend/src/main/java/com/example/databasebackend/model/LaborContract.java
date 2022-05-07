package com.example.databasebackend.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "laborcontract")
public class LaborContract {

    @EmbeddedId
    private LaborContractPK laborContractPK;

    private String wpName;
    private String wpEmployer;
    private String employeeName;
    private String period;
    private String duties;
    private String workingTime;
    private String workingDays;
    private String wage;
    private String wageDay;
    private String comment;

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
