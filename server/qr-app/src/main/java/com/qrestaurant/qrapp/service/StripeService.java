package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.exception.StripePaymentException;
import com.qrestaurant.qrapp.model.request.NewPaymentRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeService {
    @Value("${STRIPE_PRIVATE_KEY}")
    private String stripePrivateKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripePrivateKey;
    }

    public String createPayment(NewPaymentRequest newPaymentRequest) throws StripePaymentException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(newPaymentRequest.amount())
                .setCurrency("pln")
                .build();

        try {
            PaymentIntent paymentIntent = PaymentIntent.create(params);

            return paymentIntent.getClientSecret();
        } catch (StripeException e) {
            throw new StripePaymentException(e.getMessage());
        }
    }
}
