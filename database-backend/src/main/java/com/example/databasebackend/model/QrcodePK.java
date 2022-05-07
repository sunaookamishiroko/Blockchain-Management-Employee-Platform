package com.example.databasebackend.model;
import java.io.Serializable;
import java.util.Objects;

public class QrcodePK implements Serializable {
    private int workplaceindex;
    private String date;

    public QrcodePK() {}

    public QrcodePK(int workplaceIndex, String date) {
        this.workplaceindex = workplaceIndex;
        this.date = date;
    }

    public int getWorkplaceIndex() {
        return workplaceindex;
    }

    public void setWorkplaceIndex(int workplaceIndex) {
        this.workplaceindex = workplaceIndex;
    }

    public String getDate1() {
        return date;
    }

    public void setDate1(String date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QrcodePK that = (QrcodePK) o;
        return workplaceindex == that.workplaceindex &&
                date.equals(that.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(workplaceindex, date);
    }
}
