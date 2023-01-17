import React from 'react';

//new class that makes use of new data, no need to pass functions around. makes API call directly asking for update when value is changed.
//each entry contains name,category,type,id information, as well as the amount. it starts with the initial amount, then whenever there is a change,
//    need to make api call to update amount. The update would be original total + the amount changed. Thus the backend needs to know the original total,
// the old entry amount and the new entered entry amount. Entry needs to trigger a change above it, which should be the tracker class. The solution 
class Entry extends React.Component{
    constructor(props){
        super(props);
        console.log('props is', props);
        this.state = {
            curAmount: this.props.entryObj.amount,
            //the amount when user clicks on amount to make possible changes
            oldAmount: null,
        }
        this.storeOldAmount = this.storeOldAmount.bind(this);
        this.handleBlur = this.handleBlur.bind(this);    }

    // revisit to make sure state is set
    storeOldAmount(){
      this.setState((state) => ({
        oldAmount: state.curAmount
      }));
    }

    handleBlur(e){
      console.log('here props are', this.props);
      console.log('here this points to', this);
      console.log('here event is', e);
      //should only recalculate when amount is changed
      if (this.state.oldAmount !== e.target.value){
        console.log('amount changed, oldAmount is ', this.state.oldAmount, "new value is ", e.target.valueAsNumber);
        this.setState({
          curAmount: e.target.value
        })
        this.props.onAmountChange(this.props.entryObj.id, e.target.valueAsNumber);
      }
    }

    render() {
        return (
            <tr>
            <td>{this.props.entryObj.name}</td>
            <td>
              <input
              defaultValue={this.state.curAmount}
              onClick={this.storeOldAmount}
              onBlur = {this.handleBlur}
              type="number"
              min="0"
              step=".01"
              />
            </td>
          </tr>
        );
      }
}

export default Entry;