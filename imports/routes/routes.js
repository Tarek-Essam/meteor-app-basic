import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];
const browserHistory = createBrowserHistory();

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/dashboard');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        browserHistory.replace('/');
    }
};

export const routes = (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" render={() => (
                Meteor.userId() ? (
                    <Redirect to="/Dashboard" />
                ) : (
                        <Login />
                    )
            )}/>
            <Route exact path="/signup" render={() => (
                Meteor.userId() ? (
                    <Redirect to="/Dashboard" />
                ) : (
                        <Signup />
                    )
            )} />
            <Route exact path="/dashboard" render={() => (
                !Meteor.userId() ? (
                    <Redirect to="/" />
                ) : (
                        <Dashboard />
                    )
            )} />
            <Route path="*" component={NotFound} />
            
        </Switch>
    </Router>
);
