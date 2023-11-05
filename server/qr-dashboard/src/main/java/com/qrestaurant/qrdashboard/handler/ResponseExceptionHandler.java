package com.qrestaurant.qrdashboard.handler;

import com.qrestaurant.qrdashboard.exception.EntityNotFoundException;
import com.qrestaurant.qrdashboard.exception.EntityAlreadyExistsException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ResponseExceptionHandler extends ResponseEntityExceptionHandler {
    // 400 - BAD_REQUEST
    @ExceptionHandler(value = AuthenticationException.class)
    public ResponseEntity<Object> handleAuthenticationException(RuntimeException e, WebRequest webRequest) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", e.getMessage());

        return handleExceptionInternal(e, response, new HttpHeaders(), HttpStatus.BAD_REQUEST, webRequest);
    }

    // 403 - FORBIDDEN
    @ExceptionHandler(value = AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDeniedException(RuntimeException e, WebRequest webRequest) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", e.getMessage());

        return handleExceptionInternal(e, response, new HttpHeaders(), HttpStatus.FORBIDDEN, webRequest);
    }

    // 404 - NOT_FOUND
    @ExceptionHandler(value = EntityNotFoundException.class)
    public ResponseEntity<Object> handleEntityNotFoundException(RuntimeException e, WebRequest webRequest) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", e.getMessage());

        return handleExceptionInternal(e, response, new HttpHeaders(), HttpStatus.NOT_FOUND, webRequest);
    }

    // 409 - CONFLICT
    @ExceptionHandler(value = EntityAlreadyExistsException.class)
    public ResponseEntity<Object> handleEntityAlreadyExistsException(RuntimeException e, WebRequest webRequest) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", e.getMessage());

        return handleExceptionInternal(e, response, new HttpHeaders(), HttpStatus.CONFLICT, webRequest);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatusCode status,
                                                                  WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult()
                .getAllErrors()
                .forEach((error) -> {
                    String fieldName = ((FieldError) error).getField();
                    String errorMessage = error.getDefaultMessage();
                    errors.put(fieldName, errorMessage);
                });

        return handleExceptionInternal(ex, errors, headers, HttpStatus.BAD_REQUEST, request);
    }
}
