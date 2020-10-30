import React from 'react';

//The initial data
var initialData = {
  "assets": [
    {"category": "Cash and Investments", 
    "rows": [
      {"name": "Chequing", "amount": 2000},
      {"name": "Savings for Taxes", "amount": 4000},
      {"name": "Rainy Day Fund", "amount": 506},
      {"name": "Savings for Fun", "amount": 5000},
      {"name": "Savings for Travel", "amount": 400},
      {"name": "Savings for Personal Development", "amount": 200},
      {"name": "Investment 1", "amount": 506},
      {"name": "Investment 2", "amount": 5000},
      {"name": "Other", "amount": 0}
    ]},
    {"category": "Long Term Assets", 
    "rows": [
      {"name": "Primary Home", "amount": 455000},
      {"name": "Second Home", "amount": 1564321}
    ]}
  ],
  "liabilities": [
    {"category": "Short Term Liabilities", 
    "rows": [
      {"name": "Credit Card 1", "amount": 4342},
      {"name": "Credit Card 2", "amount": 322}
    ]},
    {"category": "Long Term Debt", 
    "rows": [
      {"name": "Mortgage 1", "amount": 250999},
      {"name": "Mortgage 2", "amount": 632634},
      {"name": "Line of Credit", "amount": 2000},
      {"name": "Investment Loan", "amount": 2000},
      {"name": "Student Loan", "amount": 0},
      {"name": "Car Loan", "amount": 0}
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
      color: "black",
      // The amount from user input
      inputAmount: null,
    };
  }

  handleClick() {
    this.setState({color: "green"});
  }

  handleBlur(event) {
    this.setState({color: "black", inputAmount: event.target.value}, () => {
      console.log("state is", this.state);
    });
  }

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
          onClick={() => {this.handleClick()}}
          //onBlur={(event) => {this.handleBlur(event)}}
          //Lift state up
          onBlur = {this.props.onBlur}
          style={mystyle}
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