package com.example.databasebackend.controller;

import com.example.databasebackend.exceptions.LaborContractAlreadyExistsException;
import com.example.databasebackend.exceptions.LaborContractNotFoundException;
import com.example.databasebackend.model.LaborContract;
import com.example.databasebackend.model.LaborContractPK;
import com.example.databasebackend.repository.LaborContractRepository;
import com.example.databasebackend.service.LaborContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

// laborcontract에 대한 controller
@RestController
public class LaborContractController {

    private LaborContractService service;

    @Autowired
    public LaborContractController(LaborContractService service) {
        this.service = service;
    }

    /*
     * 가지고 있는 모든 근로계약서를 return
     * 데이터 확인용으로 실제로는 사용되지 않음
     */
    @GetMapping("/getcontractall")
    public List<LaborContract> getAllContract() {
        List<LaborContract> answer = service.findAll();

        if (answer == null) {
            return null;
        } else {
            return answer;
        }
    }

    /*
     * 요청한 이더리움 address가 가지고 있는 근로계약서들을 return
     * 없으면 null return
     */
    @GetMapping("/getcontract")
    public List<LaborContract> getContract(@RequestParam String address) {
        List<LaborContract> answer = service.findByAddress(address);

        if (answer == null) {
            return null;
        } else {
            return answer;
        }
    }

    /*
     * 요청한 이더리움 address가 가지고 있는 근로계약서들을 return
     * 없으면 null return
     */
    @PostMapping("/setcontract")
    public ResponseEntity setContract(@RequestBody LaborContract req) {
        LaborContract laborContract = service.set(req);

        if (laborContract == null) {
            throw new LaborContractAlreadyExistsException(
                    String.format(
                            "laborcontract with address[%s] and workplaceindex[%d] already exists.",
                            req.getAddress(), req.getWorkplaceindex()
                    )
            );
        }

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /*
     * 요청한 이더리움 address가 가지고 있는 근로계약서들을 return
     * 없으면 null return
     */
    @DeleteMapping("/deletecontract")
    public ResponseEntity deleteLaborcontract(@RequestBody LaborContractPK req){

        boolean answer = service.delete(req);

        if (!answer) {
            throw new LaborContractNotFoundException(
                    String.format(
                            "laborcontract with address[%s] and workplaceindex[%d] not found.",
                            req.getAddress(), req.getWorkplaceindex()
                    )
            );
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
