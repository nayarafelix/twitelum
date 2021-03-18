import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho';
import NavMenu from './components/NavMenu';
import Dashboard from './components/Dashboard';
import Widget from './components/Widget';
import TrendsArea from './components/TrendsArea';
import Tweet from './components/Tweet';

class App extends Component {
    constructor() {
        super();
        this.state = {
            novoTweet: "",
            tweets: ["Tweet 1", "Tweet 2", "Tweet 3"]
        }
        this.alteraEstado = this.alteraEstado.bind(this)
    }

    alteraEstado(evento) {
        this.setState({ novoTweet: evento.target.value })
    }

    ehValido() {
        let tweetLength = this.state.novoTweet.length;
        return tweetLength > 0 && tweetLength < 140;
    }

    enviaTweet = (evento) => {
        evento.preventDefault();
        let texto = this.state.novoTweet;
        
        if(this.ehValido()) {
            this.setState({
                tweets: [texto, ...this.state.tweets],
                novoTweet: ""
            })
        }
        
    }

    listTweets = () => {
        console.log("Nayara");
        let tweets = this.state.tweets;

        if (tweets.length > 0) {
            return tweets.map((tweet, index) => { return (<Tweet conteudo={tweet} key={"Chave" + index} /> )})
        } else {
            return (
                <article className="tweet">
                    <p className="tweet__conteudo">
                        <span>Nenhum tweet para ser apresentado. Crie seu primeiro tweet.</span>
                    </p>
                </article>
            )
        }
    }

    render() {
        return (
        <Fragment>
            <Cabecalho>
                <NavMenu usuario="@omariosouto" />
            </Cabecalho>
            <div className="container">
                <Dashboard>
                    <Widget>
                        <form onSubmit={this.enviaTweet} className="novoTweet">
                            <div className="novoTweet__editorArea">
                                <span className={`novoTweet__status ${!this.ehValido() ? 'novoTweet__status--invalido' : ''}`}>
                                    { this.state.novoTweet.length }/140
                                </span>
                                <textarea 
                                    className="novoTweet__editor"
                                    value={ this.state.novoTweet }
                                    onChange={this.alteraEstado}
                                    placeholder="O que está acontecendo?">
                                </textarea>
                            </div>
                            <button type="submit" disabled={!this.ehValido()} className="novoTweet__envia">Tweetar</button>
                        </form>
                    </Widget>
                    <Widget>
                        <TrendsArea />
                    </Widget>
                </Dashboard>
                <Dashboard posicao="centro">
                    <Widget>
                        <div className="tweetsArea">
                            { this.listTweets() }
                        </div>
                    </Widget>
                </Dashboard>
            </div>
        </Fragment>
        );
    }
}

export default App;
