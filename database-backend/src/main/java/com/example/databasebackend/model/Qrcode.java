package com.example.databasebackend.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "qrcodecheck")
public class Qrcode implements Serializable {

    @EmbeddedId
    private QrcodePK qrcodePK;

    private int randomNum;

    public int getRandomNum() {
        return randomNum;
    }

    public void setRandomNum(int randomNum) {
        this.randomNum = randomNum;
    }
}
