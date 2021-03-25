import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho';
import NavMenu from '../../components/NavMenu';
import Dashboard from '../../components/Dashboard';
import Widget from '../../components/Widget';
import TrendsArea from '../../components/TrendsArea';
import Tweet from '../../components/Tweet';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            novoTweet: "",
            tweets: []
        }
        this.alteraEstado = this.alteraEstado.bind(this)
    }

    ehValido() {
        let tweetLength = this.state.novoTweet.length;
        return tweetLength > 0 && tweetLength < 140;
    }

    alteraEstado(evento) {
        const novoTexto = evento.target.value
        this.setState({ novoTweet: novoTexto })
    }

    adicionaTweet = (infosDoEvento) => {
        infosDoEvento.preventDefault()
        if(this.state.novoTweet.length > 0) {
            const URL = `https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`
            const objeto = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ conteudo: this.state.novoTweet })
            }
            fetch(URL, objeto)
                .then((respostaDoServer) => {
                    return respostaDoServer.json()
                })
                .then((tweetVindoDoServidor) => {
                    console.log(tweetVindoDoServidor)
                    this.setState({
                        tweets: [tweetVindoDoServidor, ...this.state.tweets]
                    })
                })
        }
    }

    hasTwittes = () => {
        let retorno = this.state.tweets.map( (tweet) => {
            return <Tweet conteudo={tweet.conteudo} usuario={tweet.usuario} key={tweet._id} />})

        if(this.state.tweets.length === 0){
            retorno =  <article>
                <p>Você ainda não efetuou nenhum twitte, que tal twitter algo!</p>
            </article>
        }

        return retorno;
    }

    componentDidMount() {
        fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then(response => response.json())
            .then((tweets) => {
            this.setState({
                tweets
            })
        })
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
                        <form onSubmit={this.adicionaTweet} className="novoTweet">
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
                            { this.hasTwittes() }
                        </div>
                    </Widget>
                </Dashboard>
            </div>
        </Fragment>
        );
    }
}

export default HomePage;
