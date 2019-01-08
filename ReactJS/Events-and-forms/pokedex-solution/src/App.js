import React, { Component } from 'react';
import './App.css';

import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'
import LoggedInScreen from './components/LoggedInScreen'

class App extends Component {
  constructor() {
    super();

    let route = '';
    if(localStorage.getItem('token')) {
      route = 'loggedIn'
    }

    this.state = {
      route: route
    }

    this.showAppropriateComponent = this.showAppropriateComponent.bind(this);
    this.changeLoginRegister = this.changeLoginRegister.bind(this);
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.showSwitchButton = this.showSwitchButton.bind(this);
  }

  showAppropriateComponent() {
    if(this.state.route === 'login') {
        return <LoginForm setLoggedIn={this.setLoggedIn} />
    }else if(this.state.route === 'loggedIn') {
      return <LoggedInScreen />
    }
    return <SignUpForm />
  }

  changeLoginRegister() {
    if(this.state.route === 'login') {
      this.setState({route: ''})
    }else if(this.state.route === '') {
        this.setState({route: 'login'})
    }
  }

  showSwitchButton() {
    if(!localStorage.getItem('token')) {
       return <a href="#" onClick={this.changeLoginRegister}>Change forms</a>
    }
  }


  setLoggedIn() {
    this.setState({route: 'loggedIn'});
  }



  render() {
    return (
      <div className="App">
          {this.showSwitchButton()}
          {this.showAppropriateComponent()}
      </div>
    );
  }
}

export default App;
