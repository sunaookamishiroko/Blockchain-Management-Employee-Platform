package com.example.databasebackend.exceptions;

public class QrcodeAlreadyExistsException extends RuntimeException {
    public QrcodeAlreadyExistsException(String msg) {
        super(msg);
    }
}
