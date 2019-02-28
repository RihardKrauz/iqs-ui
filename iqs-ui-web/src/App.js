import React, { Component } from 'react';
import './App.css';
import LoginForm from './modules/auth/components/login-form/login-form';
import ProfileCard from './modules/profile/components/profile-card/profile-card';
import RegisterCard from './modules/registration/components/registration-card/registration-card';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './common/services/protected-route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
                <ToastContainer />
            </div>
        );
    }
}

export default App;
