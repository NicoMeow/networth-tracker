package com.example.restservice.service;

import com.example.restservice.model.Category;
import com.example.restservice.model.Equity;
import com.example.restservice.model.Row;

import java.util.List;

public class NetWorthCalculator {
    private long assetAmount;
    private long liabilityAmount;
    private long networth;

    public NetWorthCalculator(Equity equity) {
        this.assetAmount = this.calculateAsset(equity.getAssets());
        this.liabilityAmount = this.calculateLiabilities(equity.getLiabilities());
        this.networth = this.calculateNetWorth(this.assetAmount, this.liabilityAmount);
    }

    public long getAssetAmount() {
        return assetAmount;
    }

    public long getLiabilityAmount() {
        return liabilityAmount;
    }

    public long getNetworth() {
        return networth;
    }

    private long calculateAsset(List<Category> assetCategories) {
        long amount = 0;

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

    private long calculateLiabilities(List<Category> liabilityCategories) {
        long amount = 0;

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

    private long calculateNetWorth(long assetAmount, long liabilityAmount) {
        return assetAmount - liabilityAmount;
    }
}
