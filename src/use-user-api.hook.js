import { useMemo } from 'react'
import { useGlobalUser } from './user.context'
import { useHttp } from './use-http.hook'


export function useUserApi() {
  const [user] = useGlobalUser()

  const httpInstance = useHttp('https://www.tatitata.com.br', {
    authorization: user.token
  })

  async function login(nomeUsuario, senha) {
    const response = await httpInstance.post('/auth/login', { nomeUsuario, senha })

    return response
  }

  async function criarLogin(username, password, confirmPassword) {
    const response = await httpInstance.post('/auth/register', { username, password, confirmPassword })

    return response
  }

  async function criarPersonagem(name, raceId, faction) {
    const response = await httpInstance.post(
      '/user/create-character', {
      name: name,
      raceId: raceId,
      faction: faction
    });

    return response
  }

  async function obterMeusPersonagens(username, password, confirmPassword) {
    const response = await httpInstance.get('/user/me/characters')

    return response
  }

  async function obterPersonagemAtual(IDPersonagemAtual) {
    const response = await httpInstance.get(`/user/me/characters/${IDPersonagemAtual}`);

    return response;
  }

  async function removerPersonagem(idPersonagemParaRemover) {
    const response = await httpInstance.post(`/user/me/characters/${idPersonagemParaRemover}/delete`);

    return response;
  }

  return useMemo(() => ({
    login,
    criarLogin,
    obterMeusPersonagens,
    obterPersonagemAtual,
    criarPersonagem, 
    removerPersonagem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])
}