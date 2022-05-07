package com.example.databasebackend.exceptions;

public class LaborContractNotFoundException extends RuntimeException {
    public LaborContractNotFoundException(String msg) {
        super(msg);
    }
}
