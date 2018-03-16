import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card.js'

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        itemToday: {}
      };
    }

  componentDidMount() {
    fetch("https://haveibeenpwned.com/api/v2/breaches")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
            itemToday: this.getItemToday(result)
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  getItemToday(breaches, today=new Date()){
    var breachesToday = [];
    var todayDD = today.getDate();
    var todayMM = today.getMonth() + 1;
    //console.log(today + ": " + todayMM + '-' + todayDD);

    breaches.forEach(function(breach){
      var breachDate = new Date(breach.BreachDate);
      var breachDD = breachDate.getDate();
      var breachMM = breachDate.getMonth() + 1;
      //console.log(breach.BreachDate + ': ' + breachMM + '-' + breachDD);

      if (todayDD == breachDD && todayMM == breachMM){
        console.log(breach);
        breachesToday.push(breach);
      }
    });

    if (breachesToday.length == 0)
    {
      return {};
    }
    return breachesToday[0];
  }

  render() {
    const { error, isLoaded, items, itemToday } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Today in History</h1>
        </header>
        <div>
          <Card item={itemToday} />
        </div>
      </div>
    );
  }
}

export default App;
