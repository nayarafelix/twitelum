import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'
import { NotificacaoContext } from '../../context/NotificacaoContext'
import { LoginService } from "../../services/LoginService.js";

import './loginPage.css' 

const InputFormField = ({ id, label, errors, values, onChange }) => {
    return (
        <div className="loginPage__inputWrap">
            <label className="loginPage__label" htmlFor={id}>
                { label }
            </label>
            <input 
                className="loginPage__input" 
                type="text" 
                id={id} 
                name={id} 
                value={values[id]} 
                onChange={onChange}
            />
            <p style={{ color: "red" }}>{ errors[id] && errors[id]}</p>
        </div>
    )
}

class LoginPage extends Component {
    static contextType = NotificacaoContext;

    constructor() {
        super();
        this.state = {
            values: {
                inputLogin: "",
                inputSenha: ""
            },
            error: {}
        };
    }

    formValidations = () => {
        const { inputLogin, inputSenha } = this.state.values;
        const errors = {};

        if (!inputLogin) errors.inputLogin = "Esse campo é obrigatório";
        if (!inputSenha) errors.inputSenha = "Esse campo é obrigatório";

        this.setState({ errors });
    }

    onFormFieldChange = ({ target }) => {
        const value = target.value;
        const name = target.name;
        const values = { ...this.state.values, [name]: value };
        this.setState({ values }, () => {
            this.formValidations();
        });
    }

    fazerLogin = infosDoEvento => {
        infosDoEvento.preventDefault();

        const dadosDeLogin = {
            login: this.state.value.inputLogin,
            senha: this.state.value.inputSenha
        }

        LoginService.logar(dadosDeLogin)
        .then(() => {
            this.context.setMsg("Bem vindo ao Twitelum, login foi um sucesso!");
            this.props.history.push("/");
        })
        .catch(err => {
            console.error(`[Erro ${err.status}]`, err.message);
            this.context.setMsg(err.message);
        })
    };

    render() {
        return (
            <Fragment>
                <Cabecalho />
                <div className="loginPage">
                    <div className="container">
                        <Widget>
                            <h2 className="loginPage__title">Seja bem vindo!</h2>
                            <form onSubmit={this.fazerLogin} className="loginPage__form" action="/">
                                <InputFormField
                                    id="inputLogin" 
                                    label="Login: " 
                                    error={this.state.errors}
                                    value={this.state.values}
                                    onChange={this.onFormFieldChange}
                                />
                                <InputFormField 
                                    id="inputSenha"
                                    label="Senha: " 
                                    error={this.state.errors}
                                    value={this.state.values}
                                    onChange={this.onFormFieldChange} 
                                />
                                {/* <div className="loginPage__errorBox">
                                    Mensagem de erro!
                                </div> */}
                                <div className="loginPage__inputWrap">
                                    <button className="loginPage__btnLogin" type="submit">
                                        Logar
                                    </button>
                                </div>
                            </form>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default LoginPage