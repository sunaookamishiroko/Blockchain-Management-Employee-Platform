package com.example.databasebackend.controller;

import com.example.databasebackend.exceptions.QrcodeAlreadyExistsException;
import com.example.databasebackend.model.Qrcode;
import com.example.databasebackend.repository.QrcodeRepository;
import com.example.databasebackend.service.QrcodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
public class QrcodeController {

    private QrcodeService service;

    @Autowired
    public QrcodeController(QrcodeService service) {
        this.service = service;
    }

    @GetMapping("/getqrcodeall")
    public List<Qrcode> getAllQrcode() {
        List<Qrcode> answer = service.findAll();

        if (answer == null) {
            return null;
        } else {
            return answer;
        }
    }

    @GetMapping("/getqrcode")
    public Qrcode getQrcode(
            @RequestParam(value="workplaceindex") int workplaceindex,
            @RequestParam(value="date") String date) {
        Qrcode answer = service.findByIndexAndDate(workplaceindex, date);

        if (answer == null) {
            return null;
        } else {
            return answer;
        }
    }

    @PostMapping("/setqrcode")
    public ResponseEntity setQrcode(@RequestBody Qrcode req) {
        Qrcode answer = service.set(req);

        if (answer == null) {
            throw new QrcodeAlreadyExistsException(
                    String.format(
                            "workplaceindex[%d] and date[%s] already exists.",
                            req.getWorkplaceindex(), req.getDate()
                    )
            );
        }

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
