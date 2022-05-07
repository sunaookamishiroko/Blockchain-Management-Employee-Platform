package com.example.databasebackend.service;

import com.example.databasebackend.model.LaborContract;
import com.example.databasebackend.model.LaborContractPK;
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

    public LaborContract findByAddress(String address) {
        return repository.findByAddress(address);
    }

    public LaborContract set(LaborContract req) {
        return repository.save(req);
    }

    public Map<String, String> delete(LaborContractPK req) {
        repository.deleteById(req);

        Map<String, String> answer = new HashMap<String, String>();
        answer.put("status", "ok");
        return answer;
    }
}
