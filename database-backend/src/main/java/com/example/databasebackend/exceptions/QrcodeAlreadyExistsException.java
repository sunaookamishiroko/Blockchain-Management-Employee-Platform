package com.example.databasebackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class QrcodeAlreadyExistsException extends RuntimeException {
    public QrcodeAlreadyExistsException(String msg) {
        super(msg);
    }
}
