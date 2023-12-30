package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.model.request.NewPaymentRequest;
import com.qrestaurant.qrapp.service.StripeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/app/stripe")
public class StripeController {
    private final StripeService stripeService;

    public StripeController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> createPayment(@Valid @RequestBody NewPaymentRequest newPaymentRequest) {
        String clientSecret = stripeService.createPayment(newPaymentRequest);

        Map<String, String> response = new HashMap<>();
        response.put("clientSecret", clientSecret);

        return ResponseEntity.ok(response);
    }
}
