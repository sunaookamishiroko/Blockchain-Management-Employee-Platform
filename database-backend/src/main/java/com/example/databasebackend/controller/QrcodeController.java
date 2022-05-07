package com.example.databasebackend.controller;

import com.example.databasebackend.model.Qrcode;
import com.example.databasebackend.repository.QrcodeRepository;
import com.example.databasebackend.service.QrcodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class QrcodeController {

    private QrcodeService service;

    @Autowired
    public QrcodeController(QrcodeService service) {
        this.service = service;
    }

    @GetMapping("/getqrcode")
    public Optional<Qrcode> getQrcode(
            @RequestParam(value="workplaceindex") int workplaceindex,
            @RequestParam(value="date") String date) {
        return service.findByIndexAndDate(workplaceindex, date);
    }

    @GetMapping("/getqrcodeall")
    public List<Qrcode> getAllQrcode() {
        return service.findAll();
    }

    @PostMapping("/setqrcode")
    public Qrcode setQrcode(@RequestBody Qrcode req) {
        return service.setQrcode(req);
    }
}
