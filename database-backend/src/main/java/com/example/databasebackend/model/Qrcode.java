package com.example.databasebackend.model;

import javax.persistence.*;
import java.io.Serializable;

// qrcode 테이블
// PK -> workplaceindex, date
@Entity
@Table(name = "qrcodecheck")
@IdClass(QrcodePK.class)
public class Qrcode implements Serializable {

    @Id
    @Column(name = "workplaceindex")
    private int workplaceindex;

    @Id
    private String date;

    @Column(name = "randomnum")
    private int randomnum;

    public int getWorkplaceindex() {
        return workplaceindex;
    }

    public void setWorkplaceindex(int workplaceindex) {
        this.workplaceindex = workplaceindex;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getRandomnum() {
        return randomnum;
    }

    public void setRandomnum(int randomnum) {
        this.randomnum = randomnum;
    }
}
