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

    /* qrcode를 모두 return
     * qrcode가 하나도 존재하지 않으면 null return
     */
    public List<Qrcode> findAll() {
        List<Qrcode> result = repository.findAll();

        if (result.size() == 0) {
            return null;
        } else {
            return result;
        }

    }

    /* 해당하는 workplaceindex와 date의 qrcode를 찾아 return
     * 존재하지 않으면 null return
     */
    public Qrcode findByIndexAndDate(int wpindex, String date) {
        Optional<Qrcode> result = repository.findById(new QrcodePK(wpindex, date));

        if (result.isPresent()) {
            return result.get();
        } else {
            return null;
        }
    }

    /* qrcode를 db에 저장
     * qrcode가 이미 존재하면 null return
     */
    public Qrcode set(Qrcode req) {
        Optional<Qrcode> result = repository.findById(
                new QrcodePK(req.getWorkplaceindex(), req.getDate()));

        if (result.isPresent()) {
            return null;
        } else {
            return repository.save(req);
        }
    }


}
