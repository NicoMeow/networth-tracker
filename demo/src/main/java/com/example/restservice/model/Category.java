package com.example.restservice.model;

import java.util.List;

public class Category {
    private String category;
    private List<Row> rows;

    public Category(String category, List<Row> rows) {
        this.category = category;
        this.rows = rows;
    }

    public String getCategory() {
        return category;
    }

    public List<Row> getRows() {
        return rows;
    }

    public void setRows(List<Row> rows) {
        this.rows = rows;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
