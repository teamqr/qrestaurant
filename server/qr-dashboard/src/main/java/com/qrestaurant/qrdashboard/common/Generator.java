package com.qrestaurant.qrdashboard.common;

import org.springframework.stereotype.Component;

@Component
public class Generator {
    public String generateAlphaNumericalString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        StringBuilder generatedString = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int index = (int)(characters.length() * Math.random());

            generatedString.append(characters.charAt(index));
        }

        return generatedString.toString();
    }
}
