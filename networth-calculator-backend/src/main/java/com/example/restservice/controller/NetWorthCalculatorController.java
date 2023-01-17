package com.example.restservice.controller;

import com.example.restservice.component.CalculatorReturnData;
import com.example.restservice.component.Entry;
import com.example.restservice.component.Equity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class NetWorthCalculatorController {
    private Equity equity;

    @PostMapping(path = "/calculate-net-worth", consumes = "application/json")
    @ResponseBody
    public CalculatorReturnData calculateNetWorth(@RequestBody Equity equity) {
        //store in memory to use later for updates
        this.equity = equity;
        System.out.println(equity.getEntries().size());
        CalculatorReturnData calculateReturnData = equity.calculateNetworth();
        System.out.println("returned asset is " + calculateReturnData.getAssetTtl());
        System.out.println("returned liability is " + calculateReturnData.getLiabilityTtl());
        System.out.println("returned networth is " + calculateReturnData.getNetWorth());
        return calculateReturnData;
    }

    @PostMapping(path = "/update-net-worth", consumes = "application/json")
    @ResponseBody
    public CalculatorReturnData updateNetWorth(@RequestBody Entry updatedEntry) {
        System.out.println("updated entry is" + updatedEntry);
        System.out.println("updated entry is" + updatedEntry.getId());
        System.out.println("updated entry is" + updatedEntry.getAmount());
        return this.equity.updateNetworth(updatedEntry);
    }
}
