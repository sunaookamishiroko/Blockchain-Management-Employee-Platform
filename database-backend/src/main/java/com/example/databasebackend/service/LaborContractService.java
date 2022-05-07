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

    /* 근로계약서를 모두 return
     * 근로계약서가 하나도 존재하지 않으면 null return
     */
    public List<LaborContract> findAll() {
        List<LaborContract> result = repository.findAll();

        if (result.size() == 0) {
            return null;
        } else {
            return result;
        }
    }

    /* 해당하는 address의 모든 근로계약서를 찾아서 return
     * 존재하지 않으면 null return
     */
    public List<LaborContract> findByAddress(String address) {
        List<LaborContract> result = repository.findAllByAddress(address);

        if (result == null) {
            return null;
        } else {
            return result;
        }
    }

    /* 근로계약서를 DB에 저장
     * 근로계약서가 이미 존재하면 null return
     */
    public LaborContract set(LaborContract req) {
        Optional<LaborContract> result = repository.findById(
                new LaborContractPK(req.getAddress(), req.getWorkplaceindex()));

        if (result.isPresent()) {
            return null;
        } else {
            return repository.save(req);
        }
    }

    /* 근로계약서를 DB에서 삭제
     * 근로계약서가 이미 존재하면 false return
     */
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
