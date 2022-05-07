package com.example.databasebackend.model;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

public class LaborContractPK implements Serializable {
    private String address;
    private int workplaceindex;

    public LaborContractPK() {}

    public LaborContractPK(String address, int workplaceIndex) {
        this.address = address;
        this.workplaceindex =workplaceIndex;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getWorkplaceIndex() {
        return workplaceindex;
    }

    public void setWorkplaceIndex(int workplaceIndex) {
        this.workplaceindex = workplaceIndex;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LaborContractPK that = (LaborContractPK) o;
        return address.equals(that.address) &&
                workplaceindex == that.workplaceindex;
    }

    @Override
    public int hashCode() {
        return Objects.hash(address, workplaceindex);
    }
}
