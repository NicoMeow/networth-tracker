package com.example.restservice.controller;

import com.example.restservice.model.Equity;
import com.example.restservice.service.NetWorthCalculatorService;
import org.springframework.web.bind.annotation.*;

@RestController
public class NetWorthCalculatorController {

    @PostMapping(path = "/calculate-net-worth", consumes = "application/json")
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public NetWorthCalculatorService calculate(@RequestBody Equity equity) {
        return new NetWorthCalculatorService(equity);
    }
}
