package com.example.databasebackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

// 예외 핸들러
@RestController
@ControllerAdvice
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    // default 예외
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest req) {
        ExceptionResponse exceptionResponse =
                new ExceptionResponse(new Date(), ex.getMessage(), req.getDescription(false));

        return new ResponseEntity(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 해당 qrcode가 이미 존재하면 발생하는 예외
    @ExceptionHandler(QrcodeAlreadyExistsException.class)
    public final ResponseEntity<Object> handleQrcodeAlreadyExistsException(Exception ex, WebRequest req) {
        ExceptionResponse exceptionResponse =
                new ExceptionResponse(new Date(), ex.getMessage(), req.getDescription(false));

        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    // 해당 근로계약서가 이미 존재하면 발생하는 예외
    @ExceptionHandler(LaborContractAlreadyExistsException.class)
    public final ResponseEntity<Object> handleLaborContractAlreadyExistsException(Exception ex, WebRequest req) {
        ExceptionResponse exceptionResponse =
                new ExceptionResponse(new Date(), ex.getMessage(), req.getDescription(false));

        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    // 해당 근로계약서를 찾을 수 없을 겨우 발생하는 예외
    @ExceptionHandler(LaborContractNotFoundException.class)
    public final ResponseEntity<Object> handleLaborContractNotFoundException(Exception ex, WebRequest req) {
        ExceptionResponse exceptionResponse =
                new ExceptionResponse(new Date(), ex.getMessage(), req.getDescription(false));

        return new ResponseEntity(exceptionResponse, HttpStatus.NOT_FOUND);
    }
}
