package com.example.restservice.component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CalculatorReturnData {
    private double assetTtl;
    private double liabilityTtl;
    private double netWorth;
}
