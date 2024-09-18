import './App.css';
import { useState } from 'react'
import { useHttp } from './use-http.hook'

function App() {
  const [text, setText] = useState('')
  const [response, setResponse] = useState([{
    nome: '',
    classificacao: '',
    utilidade: '',
    investimento: 0,
    arrecadado: 0,
    total: 1,
    mensagem: '',
    quitada: false
  }])
  const httpInstance = useHttp('https://www.tatitata.com.br')

  function handleTextChange(event) {
    const text = event.target.value

    setText(text)
  }


  async function handleRegistrar(event) {
    event.preventDefault()
    const response = await httpInstance.get('caixinhas/configDefault?investimento=' + text)
    console.log(response)
    setResponse(response)
  }

  return (
    <div className="App">
      <form className='form'>
        <p className='header'>Digite o valor que deseja investir</p>
        <input
          name="query"
          value={text}
          placeholder="Ex. 1000"
          onChange={handleTextChange}
        />
        <button type="submit"
          onClick={handleRegistrar}
        >Calcular</button>
      </form>
      <div className='caixinhas'>{response.map(r => {
        return (
          <div key={r.nome} className='caixinha' >
            <p className={`css-${r.quitada} titulo`}>
              {`${r.nome}`}</p>
            <p className={`css-${r.quitada} valor`}>
              {`Depositar: R$ ${r.investimento.toFixed(2)}`}</p>
            <p className={`css-${r.quitada} valor`}>
              {`Total: R$ ${r.total}`}</p>
            <p className={`css-${r.quitada} mensagem`}>
              {`${r.mensagem}`}</p>
            <p className={`css-${r.quitada} valor`}>
              {`Porcentagem pós deposito: ${((r.arrecadado + r.investimento) / r.total * 100).toFixed(2)}%`}</p>
          </div>
        )
        // ${r.total} 
        // ${r.arrecadado} 
        // ${r.classificacao} 
        // ${r.utilidade} 
      })}</div>
    </div>
  );
}

export default App;
