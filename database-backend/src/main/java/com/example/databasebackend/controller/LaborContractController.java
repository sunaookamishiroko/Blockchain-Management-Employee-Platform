package com.example.databasebackend.controller;

import com.example.databasebackend.model.LaborContract;
import com.example.databasebackend.repository.LaborContractRepository;
import com.example.databasebackend.service.LaborContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class LaborContractController {

    private LaborContractService service;

    @Autowired
    public LaborContractController(LaborContractService service) {
        this.service = service;
    }

    @GetMapping("/getcontractall")
    public List<LaborContract> getAllContract() {
        return service.findAll();
    }

    @GetMapping("/getcontract")
    public Optional<LaborContract> getContract(
            @RequestParam String address,
            @RequestParam int workplaceIndex) {
        return service.findByAddressAndWorkplaceIndex(
                address, workplaceIndex);
    }

    @PostMapping("/setcontract")
    public LaborContract setContract(@RequestBody LaborContract req) {
        return service.setLaborContract(req);
    }
}
