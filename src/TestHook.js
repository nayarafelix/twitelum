import { useState } from 'react';

function TestHook() {
    
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
        <h1>O primeiro botão foi clicado { contador } vezes</h1>
        <button onClick={noClique} >Botão</button>
        
        <h1>Clique para ligar ou desligar</h1>
        <button onClick={noCliqueDoSegundoBotao} >{ texto() }</button>
        </>
    );    
}

export default TestHook;