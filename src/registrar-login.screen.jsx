import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { useUserApi } from './use-user-api.hook'
import { useGlobalUser } from './user.context'


export function RegistrarLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [, setGlobalUser] = useGlobalUser()

  const userApi = useUserApi()

  const navigate = useNavigate()

  function handleUsernameChange(event) {
    const username = event.target.value

    setUsername(username)
  }

  function handlePasswordChange(event) {
    const password = event.target.value

    setPassword(password)
  }

  function handleConfirmarPasswordChange(event) {
    const confirmar = event.target.value

    setConfirmarPassword(confirmar)
  }

  async function onCriarLogin(event) {
    event.preventDefault()

    try {
      await userApi.criarLogin(username, password, confirmarPassword)
      const user = await userApi.login(username, password)
      setGlobalUser(user)
      navigate(PATH.criarPersonagem)
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <div className='login-bloco registrar-bloco'>
      <h1 className='login-titulo' >Redistribuição</h1>
      <form className='form-login' onSubmit={onCriarLogin}>
        <input className='login-input' placeholder='usuario' name="username" type="text" value={username} onChange={handleUsernameChange} />
        <input className='login-input' placeholder='senha' name="password" type="password" value={password} onChange={handlePasswordChange} />
        <input className='login-input' placeholder='confirmar senha' name="password" type="password" value={confirmarPassword} onChange={handleConfirmarPasswordChange} />
        <div className='botoes-login'>
          <button className="login-botao">Registrar</button>
          <Link to={'/login'}>
            voltar
          </Link>
        </div>
      </form>
      {errorMessage}
    </div>
  )
}