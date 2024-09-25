import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalUser } from './user.context'
import { useUserApi } from './use-user-api.hook'
import './login.style.css'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [, setGlobalUser] = useGlobalUser()
  const [libera,setLibera] = useState(false)

  const navigate = useNavigate()
  const userApi = useUserApi()


  function handleUsernameChange(event) {
    const username = event.target.value

    setUsername(username)
  }

  function handlePasswordChange(event) {
    const password = event.target.value

    setPassword(password)
  }

  function handleRegistrar(event) {
    event.preventDefault()
    navigate('/registrar')
  }

  async function onLoginSubmit(event) {
    event.preventDefault()

    try {
      if (username && password) {
        const user = await userApi.login(username, password)
        setGlobalUser(user)
        console.log(user)
        navigate("/redistribuicao")
        if(libera){
          setLibera(anteirior=>!anteirior)
        }
      }else{
        if(!libera){

          setLibera(anteirior=>!anteirior)
        }
      }
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
    console.log(errorMessage)
  }

  return (
    <div className='login-bloco'>
      <h1 className='login-titulo' >Redistribuição</h1>
      <form className='login-form' onSubmit={onLoginSubmit}>
        <input
          className='login-input'
          placeholder='login'
          name="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}

        />
        <input
          className='login-input'
          placeholder='password'
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}

        />
        <div className='login-botoes'>
          <button
            className="login-botao">
            Entrar
          </button>
          <button
            className="login-botao"
            onClick={handleRegistrar}>
            Registrar
          </button>
        </div> 
      </form>
      <div>
        {errorMessage}
        {libera&&!errorMessage?'senha ou usuário inválidos':''}

      </div>
    </div>
  )
}