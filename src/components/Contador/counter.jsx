import {ueState} from 'react';

function MiComponente(){
    const [contador, setContador] = useState(0);

    return (
        <button onClick={()=>setContador(contador + 1)}>Incrementar</button>
    );

}

export default MiComponente;