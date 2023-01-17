package com.example.restservice.component;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class Equity{
    @JsonProperty("entries")
    private List<Entry> entries;

    public CalculatorReturnData calculateNetworth(){
        double assetTtl = calculateTtlByType(this.entries,"asset");
        double liabilityTtl = calculateTtlByType(this.entries, "liability");
        double netWorth = assetTtl - liabilityTtl;
        return new CalculatorReturnData(assetTtl, liabilityTtl, netWorth);
    }

    public CalculatorReturnData updateNetworth(Entry updatedEntry){
        this.updateEntries(updatedEntry);
        //TODO: update to avoid unnecessary recalculations
        return this.calculateNetworth();

    }
    private double calculateTtlByType(List<Entry> entries, String type){
        return entries
                .stream()
                .filter(e -> e.getType().equals(type))
                .map(e -> e.getAmount())
                .reduce(0.0, (a, b) -> a + b);
    }

    //helper function to updated entries
    private void updateEntries(Entry updatedEntry) {
        Entry target = this.entries
                .stream()
                .filter(e -> e.getId() == updatedEntry.getId())
                .findAny()
                .orElse(null);
        System.out.println("target is " + target);
        //TODO: error handling
        target.setAmount(updatedEntry.getAmount());
    }
}
