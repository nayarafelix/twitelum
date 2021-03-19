import React from "react";
import { Switch, Route } from "react-router-dom";

// Páginas
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TestHook from "./TestHook.js";

class Roteamento extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" component={HomePage} exact={true}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/testhook" component={TestHook}/>
            </Switch>
        );
    }
}

export default Roteamento;