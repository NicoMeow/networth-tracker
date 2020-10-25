import React from 'react';

var initialAssets = [
  {"category": "Chequing", "amount": 2000},
  {"category": "Savings for Taxes", "amount": 4000},
  {"category": "Rainy Day Fund", "amount": 506}, 
];

//var initialAssetsTotal = initialAssets.reduce((entry.amount) => {});

var initialLiabilities = [
  {"category": "Credit Card 1", "amount": 4342},
  {"category": "Credit Card 2", "amount": 322},
  {"category": "Credit Card 3", "amount": 322},
];

function Tracker() {
    return (
      <div className="Tracker">
        <Table name="AssetTable" initialData={initialAssets} />
        <br/>
        <Table name="LiabilityTable" initialData={initialLiabilities} />
      </div>
    );
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
    }
  }

  clickedOn(){
    this.setState({color: "green"});
  }

  clickedAway(){
    // set the amount in state to the updated user input
    this.setState({color: "black"});
    //this is where the call to Java API occur. 
  }

  handleChange = (event) => {
    this.setState({amount: event.target.value})
  }

  render() {
    const mystyle = {
      color: this.state.color,
    }
    return (
      <tr>
        <td>{this.props.category}</td>
        <td>
          <input
          defaultValue={this.props.amount}
          onClick={() => this.clickedOn()}
          onBlur={() => this.clickedAway()}
          onChange={() => this.handleChange}
          style={mystyle}
          />
        </td>
      </tr>
    );
  } 
}

// Create a component representing Assets table
class Table extends React.Component {
  render(){
    const initialData = this.props.initialData;
    const entries = initialData.map((entry, index) => {
      return (
        <Row
          key={initialData[index]["category"]}
          category={initialData[index]["category"]}
          amount={initialData[index]["amount"]}
        />        
      );
    });
    return(
      <table>
        <tbody>
          {entries}  
        </tbody>
      </table>
    );
  }
}

export default Tracker;