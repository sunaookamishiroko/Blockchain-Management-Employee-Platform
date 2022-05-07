package com.example.databasebackend.controller;

import com.example.databasebackend.model.Qrcode;
import com.example.databasebackend.repository.QrcodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class QrcodeController {
    @Autowired
    private QrcodeRepository qrcodeRepository;

    @GetMapping("/getqrcode")
    public List<Qrcode> getAllQrcode() {
        return qrcodeRepository.findAll();
    }

    //@PostMapping("/setqrcode")
}
