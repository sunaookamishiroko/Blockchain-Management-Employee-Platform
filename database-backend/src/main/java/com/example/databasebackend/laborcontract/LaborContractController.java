package com.example.databasebackend.laborcontract;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LaborContractController {

    @GetMapping("/getcontract")
    public void getContract() {

    }

    @PostMapping("/setcontract")
    pulbic void setContract(@RequestBody ) {

    }
}
