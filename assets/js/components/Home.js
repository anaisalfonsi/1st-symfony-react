import React, { Component } from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import Users from './Users';
import Posts from './Posts';
import Contact from './Contact';
import JobApplication from "./JobApplication";

class Home extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className={"navbar-brand"} to={"/"}> Symfony React Project </Link>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className={"nav-link"} to={"/posts"}> Posts </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={"nav-link"} to={"/users"}> Users </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={"nav-link"} to={"/contact"}> Contact </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={"nav-link"} to={"/apply"}> Job Application </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Switch>
                    <Route path="/users" component={Users} />
                    <Route path="/posts" component={Posts} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/apply" component={JobApplication} />
                </Switch>
            </div>
        )
    }
}

export default Home;