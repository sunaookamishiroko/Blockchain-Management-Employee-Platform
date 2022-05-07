package com.example.databasebackend.repository;

import com.example.databasebackend.model.LaborContract;
import com.example.databasebackend.model.LaborContractPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaborContractRepository extends JpaRepository<LaborContract, LaborContractPK> {
}
