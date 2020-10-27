package com.example.restservice.model;

public class Row {
    private String name;
    private long amount;

    public Row(String name, long amount){
        this.name = name;
        this.amount = amount;
    }

    public long getAmount() {
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
