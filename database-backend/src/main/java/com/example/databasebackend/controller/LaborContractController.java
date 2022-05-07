package com.example.databasebackend.controller;

import com.example.databasebackend.model.LaborContract;
import com.example.databasebackend.repository.LaborContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LaborContractController {

    @Autowired
    private LaborContractRepository laborContractRepository;

    @GetMapping("/getcontract")
    public List<LaborContract> getAllContract() {
        return laborContractRepository.findAll();
    }
    /*
    @PostMapping("/setcontract")
    pulbic void setContract(@RequestBody ) {

    }*/
}
