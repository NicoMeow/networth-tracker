package com.example.restservice.model;

import com.example.restservice.model.Category;

import java.util.List;

public class Equity {
    private List<Category> assets;
    private List<Category> liabilities;

    public Equity(List<Category> assets, List<Category> liabilities) {
        this.assets = assets;
        this.liabilities = liabilities;
    }

    public List<Category> getAssets() {
        return assets;
    }

    public List<Category> getLiabilities() {
        return liabilities;
    }

    public void setLiabilities(List<Category> liabilities) {
        this.liabilities = liabilities;
    }

    public void setAssets(List<Category> assets) {
        this.assets = assets;
    }
}
