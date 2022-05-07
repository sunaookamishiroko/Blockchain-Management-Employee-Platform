package com.example.databasebackend.model;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class QrcodePK implements Serializable {
    private int workplaceIndex;
    private String date1;

    public int getWorkplaceIndex() {
        return workplaceIndex;
    }

    public void setWorkplaceIndex(int workplaceIndex) {
        this.workplaceIndex = workplaceIndex;
    }

    public String getDate1() {
        return date1;
    }

    public void setDate1(String date1) {
        this.date1 = date1;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QrcodePK that = (QrcodePK) o;
        return workplaceIndex == that.workplaceIndex &&
                date1.equals(that.date1);
    }

    @Override
    public int hashCode() {
        return Objects.hash(workplaceIndex, date1);
    }
}
