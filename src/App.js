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
        breaches: [],
        breachesToday: []
      };
    }

  componentDidMount() {
    fetch("https://haveibeenpwned.com/api/v2/breaches")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            breaches: result
          });
          this.getBreachesToday();
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


  getBreachesToday(breaches=this.state.breaches, today=new Date()){
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
      this.setState({
        breachesToday: []
      });
    }
    else{
      console.log("setting state");
      this.setState({
        breachesToday: breachesToday
      });
    }
  }

  render() {
    console.log('rendering ...');
    const { error, isLoaded, breaches, breachesToday } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Today in History</h1>
        </header>
        <ul>
          {breachesToday.map(breachToday => (
            <Card item={breachToday} />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
