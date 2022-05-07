package com.example.databasebackend.controller;

import com.example.databasebackend.exceptions.QrcodeAlreadyExistsException;
import com.example.databasebackend.model.Qrcode;
import com.example.databasebackend.service.QrcodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// qrcode에 대한 controller
@RestController
public class QrcodeController {

    private QrcodeService service;

    @Autowired
    public QrcodeController(QrcodeService service) {
        this.service = service;
    }

    /*
     * 저장된 모든 qrcode를 return
     * 데이터 확인용으로 실제로는 사용되지 않음
     */
    @GetMapping("/getqrcodeall")
    public List<Qrcode> getAllQrcode() {
        List<Qrcode> answer = service.findAll();

        if (answer == null) {
            return null;
        } else {
            return answer;
        }
    }

    /*
     * 요청한 workplaceindex와 해당 date의 qrcode를 return
     * 존재하지 않으면 null return
     */
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

    /*
     * 요청한 qrcode를 DB에 저장
     * 해당 qrcode가 이미 존재하면 예외 발생
     * 정상적으로 완료되면 status code 201 return
     */
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
