import { useState } from 'react';

function Hook() {
    
    //destructuring
    const [contador, setContador] = useState(0);
    const noClique = () => {
        setContador(contador + 1);
    }
    
    const [ligado, setLigado] = useState(0);
    const noCliqueDoSegundoBotao = () => {
        setLigado(!ligado);
    }
    const texto = () => {
        return (ligado) ? 'ON' : 'OFF';
    }

    return (
        <>
        <fieldset>
            <h1>O primeiro botão foi clicado { contador } vezes</h1>
            <br></br>
            <button onClick={noClique} >Botão</button>
        </fieldset>
        <br></br>
        <fieldset>
            <h1>Clique para ligar ou desligar</h1>
            <br></br>
            <button onClick={noCliqueDoSegundoBotao} >{ texto() }</button>
        </fieldset>
        </>
    );    
}

export default Hook;