import React, { Component } from 'react';
import './App.css';
import LoginForm from './auth/components/login-form/login-form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginForm></LoginForm>
      </div>
    );
  }
}

export default App;
