import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card.js'
import Yesterday from './Yesterday.js'

class App extends Component {

  constructor(props) {
    console.log('constructing ...');
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        breaches: [],
        breachesToday: [],
        todayMM: new Date().getMonth() + 1,
        todayDD: new Date().getDate()
      };
      this.yesterdayHandler = this.yesterdayHandler.bind(this);
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

  yesterdayHandler(e){
    console.log('handle yesterday...');
    e.preventDefault();
    this.setState({
      todayDD: this.getYesterdayDD()
    }, () =>{
      this.getBreachesToday();
    });
  }

  getYesterdayDD(){
    var d = this.state.todayDD - 1;
    if (d == 0){
      var today = new Date(2000, this.state.todayMM - 1, this.state.todayDD);
      console.log(today);
      var yesterday = today.setDate(today.getDate() - 1);
      d = new Date(yesterday).getDate();
      console.log(d);
      console.log(new Date(yesterday).getMonth() + 1);
      this.setState({
        todayMM: new Date(yesterday).getMonth() + 1
      }, () =>{
        this.getBreachesToday();
      });
    }
    return d;
  }

  getBreachesToday(){
    var breachesToday = [];
    var breaches = this.state.breaches;
    var todayDD = this.state.todayDD;
    var todayMM = this.state.todayMM;
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
      this.setState({
        breachesToday: breachesToday
      });
    }
  }

  render() {
    console.log('rendering App ...');
    const { error, isLoaded, breaches, breachesToday, todayMM, todayDD } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Today in History</h1>
          <h2>{todayMM}-{todayDD}</h2>
        </header>
        <Yesterday handler={this.yesterdayHandler} />
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
