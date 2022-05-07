package com.example.databasebackend.service;

import com.example.databasebackend.model.LaborContract;
import com.example.databasebackend.model.LaborContractPK;
import com.example.databasebackend.repository.LaborContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LaborContractService {
    private LaborContractRepository repository;

    @Autowired
    public LaborContractService(LaborContractRepository repository) {
        this.repository = repository;
    }

    public List<LaborContract> findAll() {
        return repository.findAll();
    }

    public Optional<LaborContract> findByAddressAndWorkplaceIndex(
            String address, int workplaceIndex) {
        return repository.findById(
                new LaborContractPK(address, workplaceIndex));
    }

    public LaborContract setLaborContract(LaborContract req) {
        return repository.save(req);
    }
}
