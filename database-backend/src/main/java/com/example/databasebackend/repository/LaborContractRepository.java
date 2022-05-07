package com.example.databasebackend.repository;

import com.example.databasebackend.model.LaborContract;
import com.example.databasebackend.model.LaborContractPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LaborContractRepository extends JpaRepository<LaborContract, LaborContractPK> {
    List<LaborContract> findAllByAddress(String Address);
}
