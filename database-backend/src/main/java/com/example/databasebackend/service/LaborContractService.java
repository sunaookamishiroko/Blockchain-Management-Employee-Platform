package com.example.databasebackend.service;

import com.example.databasebackend.model.LaborContract;
import com.example.databasebackend.model.LaborContractPK;
import com.example.databasebackend.model.Qrcode;
import com.example.databasebackend.repository.LaborContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    public List<LaborContract> findByAddress(String address) {
        List<LaborContract> result = repository.findAllByAddress(address);

        if (result == null) {
            return null;
        } else {
            return result;
        }
    }

    public LaborContract set(LaborContract req) {
        Optional<LaborContract> result = repository.findById(
                new LaborContractPK(req.getAddress(), req.getWorkplaceindex()));

        if (result.isPresent()) {
            return null;
        } else {
            return repository.save(req);
        }
    }

    public Boolean delete(LaborContractPK req) {
        Optional<LaborContract> result = repository.findById(req);

        if (result.isPresent()) {
            repository.deleteById(req);
            return true;
        } else {
            return false;
        }

    }
}
