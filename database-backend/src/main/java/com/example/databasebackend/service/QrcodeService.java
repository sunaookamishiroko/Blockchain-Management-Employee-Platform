package com.example.databasebackend.service;

import com.example.databasebackend.model.Qrcode;
import com.example.databasebackend.model.QrcodePK;
import com.example.databasebackend.repository.QrcodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QrcodeService {
    private QrcodeRepository repository;

    @Autowired
    public QrcodeService(QrcodeRepository repository) {
        this.repository = repository;
    }

    public List<Qrcode> findAll() {
        return repository.findAll();
    }

    public Optional<Qrcode> findByIndexAndDate(int wpindex, String date) {
        return repository.findById(new QrcodePK(wpindex, date));
    }

    public Qrcode setQrcode(Qrcode req) {
        return repository.save(req);
    }


}
