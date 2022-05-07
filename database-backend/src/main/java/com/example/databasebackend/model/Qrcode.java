package com.example.databasebackend.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "qrcodecheck")
@IdClass(QrcodePK.class)
public class Qrcode implements Serializable {

    @Id
    @Column(name = "workplaceindex")
    private int workplaceIndex;

    @Id
    private String date;

    @Column(name = "randomnum")
    private int randomNum;

    public int getWorkplaceIndex() {
        return workplaceIndex;
    }

    public void setWorkplaceIndex(int workplaceIndex) {
        this.workplaceIndex = workplaceIndex;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getRandomNum() {
        return randomNum;
    }

    public void setRandomNum(int randomNum) {
        this.randomNum = randomNum;
    }
}
