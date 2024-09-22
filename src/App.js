import './App.css';
import { useState } from 'react'
import { useHttp } from './use-http.hook'

function App() {
  const [valor, setValor] = useState('')
  const [usuario, setUsuario] = useState('')
  const [response, setResponse] = useState(null)
  const httpInstance = useHttp('https://www.tatitata.com.br', { "usuario": usuario })

  function handleValorChange(event) {
    const text = event.target.value

    setValor(text)
  }

  function handleUsuarioChange(event) {
    const text = event.target.value

    setUsuario(text)
  }

  async function handleRegistrar(event) {
    event.preventDefault()
    const response = await httpInstance.get('redistribuir?investimento=' + valor)
    setResponse(response)
  }

  function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  }

  function showMensagem(r) {
    if (r.mensagem !== "") {

      return (
        <p className={`css-${r.quitada} valor`}>
          {`${r.mensagem}`}
        </p>
      )
    }
    else {
      return
    }
  }

  function showCaixinhas() {
    if (response === null) {
      return (
        <p></p>
      )
    }
    if (response.length > 0) {
      return (
        <div className='caixinhas'>{response.map(r => {
          return (
            <div key={r.nome} className='caixinha' >
              <p className={`css-${r.quitada} titulo`}>
                {`${r.nome}`}</p>
              <p className={`css-${r.quitada} valor`}>
                {`Depositar: ${formatarMoeda(r.investimento.toFixed(2))}`}</p>
              <p className={`css-${r.quitada} valor`}>
                {`Total: ${formatarMoeda(r.total)}`}</p>
              {showMensagem(r)}
              <p className={`css-${r.quitada} valor`}>
                {`Porcentagem pós deposito: ${((r.arrecadado + r.investimento) / r.total * 100).toFixed(2)}%`}</p>
            </div>
          )
        })}</div>
      )
    } else {
      return (
        <div className='caixinhas'>
          <p className='css-false'>
            Não tem nenhuma caixinha para esse usuário
          </p>
        </div>
      )
    }
  }

  return (
    <div className="App">
      <form className='form'>
        <p className='header'>Digite o id do usuário:</p>
        <input
          name="user"
          value={usuario}
          placeholder="1"
          onChange={handleUsuarioChange}
        />
        <p className='header'>Digite o valor que deseja investir:</p>
        <input
          name="query"
          value={valor}
          placeholder="Ex. 1000"
          onChange={handleValorChange}
        />
        <button type="submit"
          onClick={handleRegistrar}
        >Calcular</button>
      </form>
      {showCaixinhas()}

    </div>
  )
}

export default App;
