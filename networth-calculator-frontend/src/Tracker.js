import React from 'react';
import Entry from './Entry';

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //initialize all three calculated values to null
      netWorth: null,
      assetTtl: null,
      liabilityTtl: null,
      error: null,
    }
    this.initialDataJson = require('./resource/initialData.json');
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

 componentDidMount() {
   fetch("http://localhost:8080/calculate-net-worth", {
     //for mocking purpose, will change to POST
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(this.initialDataJson)
   })
     .then(res => res.json())
     .then(
       (result) => {
         this.setState({
           assetTtl: result.assetTtl,
           liabilityTtl: result.liabilityTtl,
           netWorth: result.netWorth
         })
       },
       (error) => {
         this.setState({
           error
         })
       }
     )
 }


handleAmountChange(id, newAmount) {
    console.log("new amount is", newAmount);
    console.log("id is", id);
     fetch("http://localhost:8080/update-net-worth", {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
      "id": id,
      "amount": newAmount
      })
    })
     .then(res => res.json())
     .then(
       (result) => {
         this.setState({
           assetTtl: result.assetTtl,
           liabilityTtl: result.liabilityTtl,
           netWorth: result.netWorth
         })
       },
       (error) => {
         this.setState({
           error
         })
       }
     )
 }

  // take in an array of objects and group by a certain property, return a map with keys being the property.   
  // using Array.prototype.reduce()       
  groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, cur) => {
      let key = cur[property];
      let curGroup = acc[key] ?? [];
      //return updated returnedMap
      return {...acc, [key]: [...curGroup, cur]};
    }, {}); 
  }

  render() {
    //group by whether entry is asset or liability
    let assetAndLiabilityObject = this.groupBy(this.initialDataJson['entries'], 'type');
    let assets = assetAndLiabilityObject['asset'];
    let liabilities = assetAndLiabilityObject['liability'];
    // further group by the category of the asset or liability
    let assetCategoryObject = this.groupBy(assets, 'category');
    let liabilityCategoryObject = this.groupBy(liabilities, 'category');

    return (
      <div className="Tracker">
        <div className="networth">
          <h2>{"Net Worth: " + this.state.netWorth}</h2>       
        </div>
        <br/>
        <table>
        <h3>Assets</h3>
            <tbody>
            {Object.keys(assetCategoryObject).map((categoryName) => {
                return (
                  <React.Fragment key={categoryName}>
                <tr>
                   <th id={categoryName}>
                      {categoryName}
                  </th>
                </tr>
                {assetCategoryObject[categoryName].map((entryObj) => {
                  return <Entry key={entryObj['id']} entryObj={entryObj} onAmountChange={this.handleAmountChange}/>
                })}
                </React.Fragment>)
              })}
             </tbody>
        <h4>
          {"Total Assets: " + this.state.assetTtl}
        </h4>
        <br/>
        <h3>Liabilities</h3>
            <tbody>
            {Object.keys(liabilityCategoryObject).map((categoryName) => {
                return (
                  <React.Fragment key={categoryName}>
                <tr>
                   <th id={categoryName}>
                      {categoryName}
                  </th>
                </tr>
                {liabilityCategoryObject[categoryName].map((entryObj) => {
                  return <Entry key={entryObj['id']} entryObj={entryObj} onAmountChange={this.handleAmountChange}/>
                })}
                </React.Fragment>)
              })}
             </tbody>
        <h4>
          {"Total Liabilities: " + this.state.liabilityTtl}
        </h4>
        </table>
      </div>
    );
  }
}

export default Tracker;