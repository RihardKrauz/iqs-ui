import React, { Component } from 'react';
import './App.css';
import LoginForm from './auth/components/login-form/login-form';
import ProfileCard from './profile/components/profile-card/profile-card';
import RegisterCard from './registration/components/registration-card/registration-card';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './common/routing/protected-route';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Redirect exact from="/" to="login" />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/register" component={RegisterCard} />
                        <ProtectedRoute path="/profile" component={ProfileCard} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
