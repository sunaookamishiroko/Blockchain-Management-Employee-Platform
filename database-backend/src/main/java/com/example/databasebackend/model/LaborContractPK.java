package com.example.databasebackend.model;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class LaborContractPK implements Serializable {
    private String address;
    private int workplaceIndex;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getWorkplaceIndex() {
        return workplaceIndex;
    }

    public void setWorkplaceIndex(int workplaceIndex) {
        this.workplaceIndex = workplaceIndex;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LaborContractPK that = (LaborContractPK) o;
        return address.equals(that.address) &&
                workplaceIndex == that.workplaceIndex;
    }

    @Override
    public int hashCode() {
        return Objects.hash(address, workplaceIndex);
    }
}
