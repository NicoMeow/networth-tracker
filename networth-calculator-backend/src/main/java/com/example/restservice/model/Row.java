package com.example.restservice.model;

public class Row {
    private String name;
    private double amount;

    public Row(String name, double amount){
        this.name = name;
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }
}
