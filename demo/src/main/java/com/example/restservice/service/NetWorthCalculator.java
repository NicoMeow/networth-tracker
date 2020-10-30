package com.example.restservice.service;

import com.example.restservice.model.Category;
import com.example.restservice.model.Equity;
import com.example.restservice.model.Row;

import java.util.List;

public class NetWorthCalculator {
    private double assetAmount;
    private double liabilityAmount;
    private double networth;

    public NetWorthCalculator(Equity equity) {
        this.assetAmount = this.calculateAsset(equity.getAssets());
        this.liabilityAmount = this.calculateLiabilities(equity.getLiabilities());
        this.networth = this.calculateNetWorth(this.assetAmount, this.liabilityAmount);
    }

    public double getAssetAmount() {
        return assetAmount;
    }

    public double getLiabilityAmount() {
        return liabilityAmount;
    }

    public double getNetworth() {
        return networth;
    }

    private double calculateAsset(List<Category> assetCategories) {
        double amount = 0;

        for (int i=0; i<assetCategories.size(); i++) {
            Category category = assetCategories.get(i);
            List<Row> rows = category.getRows();
            for (int j=0; j<rows.size(); j++) {
                Row row = category.getRows().get(j);
                amount += row.getAmount();
            }
        }
        return amount;
    }

    private double calculateLiabilities(List<Category> liabilityCategories) {
        double amount = 0;

        for (int i=0; i<liabilityCategories.size(); i++) {
            Category category = liabilityCategories.get(i);
            List<Row> rows = category.getRows();
            for (int j=0; j<rows.size(); j++) {
                Row row = category.getRows().get(j);
                amount += row.getAmount();
            }
        }
        return amount;
    }

    private double calculateNetWorth(double assetAmount, double liabilityAmount) {
        return assetAmount - liabilityAmount;
    }
}
