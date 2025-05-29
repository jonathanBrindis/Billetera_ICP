import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

function Transfer(props) {
  const [balance, setBalance] = useState()
  const [fetchedBalance, setFetchedBalance] = useState()
  const [mensaje, setMensaje] = useState("")
  const [transferencia, setTransferencia] = useState()
  const [id2Transfer, setId2Transfer] = useState("")

  function handleBalance(cantidad) {
    setBalance(cantidad)
  }

  function handleTransferencia(cantidad) {
    setTransferencia(cantidad)
  }

  function handleId2Transfer(id) {
    setId2Transfer(id)
  }

  async function depositar() {
    const ans = await props.actor.Depositar(BigInt(balance))
    setMensaje(ans)
  }

  async function hacerTransferencia() {
    const ans = await props.actor.Transferencia(id2Transfer, BigInt(transferencia))
    setMensaje(ans)


  }

  async function fetchBalance() {
    const updatedBalance = await props.actor.VerBalance()
    setFetchedBalance(updatedBalance)
  }



  return (
     <div className="transfer-container">
        <h1> {mensaje} </h1>

        <div className="input-group">

            <h2> Tu Principal id: 👇</h2>
            <TextField
                disabled
                fullWidth sx={{ m: 1 }}
                id="standard-disabled"
                defaultValue={props.authClient.getIdentity().getPrincipal().toText()}
                variant="standard"
            />            
        </div>

        <div className="input-group">
            <h2>Depositar:</h2>
            <br></br>
             <Box sx={{ width: 300, maxWidth: '100%' }}>
                <TextField 
                value = {balance}
                onChange={(e) => handleBalance(e.target.value)} 
                fullWidth label="Cantidad" 
                id="fullWidth" />
             </Box>
             <br></br>
             <Button onClick={depositar} color="secondary" variant="contained" endIcon={<SaveAltIcon />}>
                Depositar
             </Button>
        </div>

        <div className="input-group">
            <h2>¿Deseas hacer una transferencia?</h2>

            <label> ¿A quien deseas transferir? </label>
            <br></br>
             <Box sx={{ width: 600, maxWidth: '100%' }}>
                <TextField 
                value={id2Transfer}
                onChange={(e) => handleId2Transfer(e.target.value)}
                fullWidth label="Principal ID" 
                id="fullWidth" />
             </Box>
             <br></br>
             <label> ¿Cúal es el monto? </label>
             <br></br>
             <Box sx={{ width: 300, maxWidth: '100%' }}>
                <TextField 
                value = {transferencia}
                onChange={(e) => handleTransferencia(e.target.value)} 
                fullWidth label="Cantidad" 
                id="fullWidth" />
             </Box>
             <br></br>
             <Button onClick={hacerTransferencia} color="secondary" variant="contained" endIcon={<SendIcon />}>
                Enviar
             </Button>
        </div>
        
        <br></br>
        <div className="input-group">
            <label> Balance: </label>
            <TextField
                value={fetchedBalance}
                disabled
                fullWidth sx={{ m: 1 }}
                id="standard-disabled"
                defaultValue={balance}
                variant="standard"
            />  
            <Button onClick={() => fetchBalance()} color="secondary" variant="contained" endIcon={<AccountBalanceWalletIcon />}>
                Consultar
             </Button>
        </div>

     </div>
  )
}



export default Transfer