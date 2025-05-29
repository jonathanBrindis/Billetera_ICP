import { createActor, canisterId } from "../../declarations/Z3-VB-backend";
import { HttpAgent } from "@dfinity/agent";
import {AuthClient} from "@dfinity/auth-client"
import { useState } from "react";
import Header from "./Componentes/Header";
import Transfer from "./Componentes/Transfer";

function App() {
  const [log, setLog] = useState(false)
  const [authClient, setAuthClient] = useState(null)
  const [actor, setActor] = useState(null)

  const environment = process.env.DFX_NETWORK === 'local'
  const localHost = 'http://localhost:4943'
  const productionHost = 'https://ic0.app'
  
async function init() {

  const authClient = await AuthClient.create()
    if (await authClient.isAuthenticated()) {
      handleAuthenticated(authClient)
    } else {
      setAuthClient(authClient)
    }
}


async function login() {
    const authClient = await AuthClient.create()
    await authClient.login({
      maxTimeToLive: BigInt(10 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      identityProvider: environment? `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943/` : 'https://identity.ic0.app',
      onSuccess: () => { 
        handleAuthenticated(authClient)
        setLog(true)
        console.log(authClient.getIdentity().getPrincipal().toText())
      }
    })
  }

async function handleAuthenticated(authClient) {
  const identity = authClient.getIdentity()
  const agent = new HttpAgent({
      identity, 
      host: environment? localHost : productionHost,
    })

    const actor = createActor(canisterId, {
      agent,
    })

    setAuthClient(authClient)
    setActor(actor)
    setLog(true)
}

  async function logout() {
    await authClient.logout()
    setLog(false)
  }

  return (
    <div> 
      <div>
         <Header 
          log = {log}
          login = {login}
          logout = {logout}
         />
      <div>
        <h1 style={{color:'white', fontFamily: 'cursive', textAlign:'center', paddingTop: 80}}> Bienvenido{log? " de nuevo!": ", porfavor inicia sesión!"}</h1>
      </div>
      { log && <Transfer 
        authClient = {authClient}
        actor = {actor}
      />

      }


      </div>
    </div>
    )
}

export default App;