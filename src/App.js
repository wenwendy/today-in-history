import React, { Component } from 'react';
import './App.css';
import Breach from './Breach.js'
import { Yesterday, Tomorrow, Today } from './DateNavigator.js'
import Peace from './NoBreach.js'

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
      this.tomorrowHandler = this.tomorrowHandler.bind(this);
      this.todayHandler = this.todayHandler.bind(this);
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
            isLoaded: false,
            error
          });
        }
      )
  }

  yesterdayHandler(e){
    console.log('handle yesterday...');
    e.preventDefault();
    this.setState({
      todayDD: this.getDateWithOffset(-1)
    });
  }

  tomorrowHandler(e){
    console.log('handle tomorrow...');
    e.preventDefault();
    this.setState({
      todayDD: this.getDateWithOffset(1)
    });
  }

  getDateWithOffset(offset){
    var d;
    var today = new Date(2000, this.state.todayMM - 1, this.state.todayDD);
    var anotherDay = today.setDate(today.getDate() + offset);
    d = new Date(anotherDay).getDate();
    var m =  new Date(anotherDay).getMonth() + 1;
    this.setState({
      todayMM: m
    }, () =>{
      this.getBreachesToday();
    });

    return d;
  }

  todayHandler(e){
    console.log('handle today...');
    e.preventDefault();
    this.setState({
      todayDD: new Date().getDate(),
      todayMM: new Date().getMonth() + 1
    }, () =>{
      this.getBreachesToday();
    });
  }

  getBreachesToday(){
    console.log('searching for todays breachs');
    var breachesToday = [];
    var breaches = this.state.breaches;
    var todayDD = this.state.todayDD;
    var todayMM = this.state.todayMM;

    breaches.forEach(function(breach){
      var breachDate = new Date(breach.BreachDate);
      var breachDD = breachDate.getDate();
      var breachMM = breachDate.getMonth() + 1;

      if (todayDD === breachDD && todayMM === breachMM){
        console.log(breach);
        breachesToday.push(breach);
      }
    });

    if (breachesToday.length === 0)
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
    const { breachesToday, todayMM, todayDD } = this.state;
    const isPeace = breachesToday.length === 0;
    const todaysView = isPeace ? (<Peace month={todayMM} date={todayDD} />):
      (breachesToday.map(breachToday => (
          <Breach item={breachToday} />
      ))
    );

    return (
      <div className="App">
        <header></header>
        <Yesterday handler={this.yesterdayHandler} isPeace={isPeace} />
        <Today handler={this.todayHandler} isPeace={isPeace} />
        <Tomorrow handler={this.tomorrowHandler} isPeace={isPeace} />
        {todaysView}
      </div>
    );

  }
}

export default App;
