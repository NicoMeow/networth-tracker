import React from 'react';

//The initial data
var initialData = {
  "assets": [
    {"category": "Cash and Investments", 
    "rows": [
      {"name": "Chequing", "amount": 2000.00},
      {"name": "Savings for Taxes", "amount": 4000.00},
      {"name": "Rainy Day Fund", "amount": 506.00},
      {"name": "Savings for Fun", "amount": 5000.00},
      {"name": "Savings for Travel", "amount": 400.00},
      {"name": "Savings for Personal Development", "amount": 200.00},
      {"name": "Investment 1", "amount": 506.00},
      {"name": "Investment 2", "amount": 5000.00},
      {"name": "Other", "amount": 0.00}
    ]},
    {"category": "Long Term Assets", 
    "rows": [
      {"name": "Primary Home", "amount": 455000.00},
      {"name": "Second Home", "amount": 1564321.00}
    ]}
  ],
  "liabilities": [
    {"category": "Short Term Liabilities", 
    "rows": [
      {"name": "Credit Card 1", "amount": 4342.00},
      {"name": "Credit Card 2", "amount": 322.00}
    ]},
    {"category": "Long Term Debt", 
    "rows": [
      {"name": "Mortgage 1", "amount": 250999.00},
      {"name": "Mortgage 2", "amount": 632634.00},
      {"name": "Line of Credit", "amount": 2000.00},
      {"name": "Investment Loan", "amount": 2000.00},
      {"name": "Student Loan", "amount": 0.00},
      {"name": "Car Loan", "amount": 0.00}
    ]}
  ]
}

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //initialize all three calculated values to null
      netWorth: null,
      assetTtl: null,
      liabilityTtl: null,
      isLoaded: false,
      error: null,
      assets: initialData.assets,
      liabilities: initialData.liabilities
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/calculate-net-worth", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"assets": this.state.assets, "liabilities": this.state.liabilities})
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            assetTtl: result.assetAmount,
            liabilityTtl: result.liabilityAmount,
            netWorth: result.networth
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  handleBlur(names, event) {
    //update the amount in the corresponding entry to user input and send a API request
    const entryName = names.entryName;
    const categoryName = names.categoryName;
    const typeName = names.typeName;
    const inputAmount = event.target.value;

    //find the entry to modify
    const categoryIndex = this.state[typeName].findIndex(x => x.category === categoryName);
    //console.log(this.state[typeName][categoryIndex]);
    const rowIndex = this.state[typeName][categoryIndex].rows.findIndex(y => y.name === entryName);
    //console.log("row index is", rowIndex);
    const copy  = this.state[typeName].slice();
    copy[categoryIndex].rows[rowIndex].amount = inputAmount;
    this.setState({[typeName]:copy});
    fetch("http://localhost:8080/calculate-net-worth", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"assets": this.state.assets, "liabilities": this.state.liabilities})
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            assetTtl: result.assetAmount,
            liabilityTtl: result.liabilityAmount,
            netWorth: result.networth
          })
        },
        (error) => {
          this.setState({  
            isLoaded: true,
            error
          })
        }
      )
  }

  render() {
    return (
      <div className="Tracker">
        <div className="networth">
          <h2>{"Net Worth: " + this.state.netWorth}</h2>       
        </div>
        <br/>
        <h3>Assets</h3>
        <Table name="AssetTable" CategoriesData={this.state.assets} typeName="assets" onBlur={(names, event) => {this.handleBlur(names, event)}}/>
        <h4>
          {"Total Assets: " + this.state.assetTtl}
        </h4>
        <br/>
        <h3>Liabilities</h3>
        <Table name="LiabilityTable" CategoriesData={this.state.liabilities} typeName="liabilities" onBlur={(names, event) => {this.handleBlur(names, event)}}/>
        <h4>
          {"Total Liabilities: " + this.state.liabilityTtl}
        </h4>
      </div>
    );
  }
}

// Create a component representing networth
// Create a reusable component representing a row in tde table
class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Store current amount in state, initialize to JSON in memory then update to user input
      // The amount from user input
      inputAmount: null,
    };
  }

  // handleInput(event) {
  //   if(!((event.keyCode > 95 && event.keyCode < 106)
  //   || (event.keyCode > 47 && event.keyCode < 58) 
  //   || event.keyCode === 8)) {
  //     return false;
  //   }
  // }

  render() {
    const mystyle = {
      color: this.state.color,
    }
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>
          <input
          defaultValue={this.props.amount}
          //onChange={(event) => {this.handleChange(event)}}
          //onBlur={(event) => {this.handleBlur(event)}}
          //Lift state up
          onBlur = {this.props.onBlur}
          style={mystyle}
          type="number"
          min="0"
          step=".01"
          />
        </td>
      </tr>
    );
  } 
}

// Create a component representing Assets table
class Table extends React.Component {  
  // Each category forms a segment in table
  renderCategorySeg(CategoryData) { 
    const entriesData = CategoryData.rows;
    const categoryName = CategoryData.category;
    const typeName = this.props.typeName;
    //console.log("typeName is", typeName);
    const entries = entriesData.map((entry) => {
      return (
        <Row
          key={entry["name"]}
          name={entry["name"]}
          amount={entry["amount"]}
          //onBlur = {(event) => {this.handleBlur(event); this.setState({changedEntryName: entry['name']})}}
         
          // onBlur = {(event) => {
          //   this.setState({
          //     inputAmount: event.target.value,
          //     changedEntryName: entry["name"]
          //   }, ()=>{console.log("updated state is", this.state)})
          // }}
          
          //onBlur = {(event) => this.props.onBlur(event, categoryName)}
          onBlur = {(event) => 
            this.props.onBlur({
              "entryName": entry["name"], 
              "categoryName": categoryName,
              "typeName": typeName
            }, event)}
        />        
      );
    });
    return (
      <React.Fragment key={categoryName}>
        <tr>
          <th id={categoryName}>
            {categoryName}
          </th>
        </tr>
        {entries}
      </React.Fragment>
    );
  }

  render(){
    const categoriesData = this.props.CategoriesData;
    const categories = categoriesData.map((entry) => {
      return this.renderCategorySeg(entry);
    })
    return(
      <table>
        <tbody>
          {categories}
        </tbody>
      </table>
    );
  }
}

export default Tracker;