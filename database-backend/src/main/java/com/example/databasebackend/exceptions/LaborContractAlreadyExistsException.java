package com.example.databasebackend.exceptions;

public class LaborContractAlreadyExistsException extends RuntimeException {
    public LaborContractAlreadyExistsException(String msg) {
        super(msg);
    }
}
