import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Páginas
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage"
import Hook from "./Hook.js";
import Calculator from "./StateElevator/Calculator";

class PrivateRoute extends React.Component {
    estaAutenticado = () => {
        return (localStorage.getItem('TOKEN')) ? true : false
    }

    render() {
        const { component: Component, ...props } = this.props

        if (this.estaAutenticado()) {
            return <Component {...props} />
        } else {
            return <Redirect to="/login"/>
        }
    }
}

class Roteamento extends React.Component {
    render() {
        return (
            <Switch>
                <PrivateRoute path="/" component={HomePage} exact={true}/>
                <Route path="/login" component={LoginPage}/>
                <Route component={NotFoundPage} />
                <Route path="/hook" component={Hook}/>
                <Route path="/calculator" component={Calculator}/>
            </Switch>
        );
    }
}

export default Roteamento;