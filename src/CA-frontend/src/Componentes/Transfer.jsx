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

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagenUrl, setImagenUrl] = useState(null);
  const [cantidadRetiro, setCantidadRetiro] = useState("");


  function handleBalance(cantidad) {
    setBalance(cantidad)
  }

  function handleTransferencia(cantidad) {
    setTransferencia(cantidad)
  }

  function handleId2Transfer(id) {
    setId2Transfer(id)
  }

    function handleRetiro(cantidad) {
    setCantidadRetiro(cantidad);
  }

  function handleFileChange(event) {
  const file = event.target.files[0];
  setSelectedFile(file);
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

   async function retirar() {
   const respuesta = await props.actor.Retirar(BigInt(cantidadRetiro));
   setMensaje(respuesta);
   }


  async function subirImagen() {
  if (!selectedFile) {
    setMensaje("Por favor selecciona una imagen");
    return;
  }

  const arrayBuffer = await selectedFile.arrayBuffer();
  const blob = [...new Uint8Array(arrayBuffer)]; // Para convertirlo a [Nat8]
  const tipoMime = selectedFile.type;

  const respuesta = await props.actor.subirFoto(blob, tipoMime);
  setMensaje(respuesta);
}

async function obtenerImagen() {
  const resultado = await props.actor.verFoto();
  if (resultado.length > 0) {
    const foto = resultado[0];
    const byteArray = new Uint8Array(foto.datos);
    const base64String = btoa(String.fromCharCode(...byteArray));
    const url = `data:${foto.tipoMime};base64,${base64String}`;
    setImagenUrl(url);
  } else {
    setMensaje("No hay imagen guardada");
  }
}

  return (
     <div className="transfer-container">
        <h1> {mensaje} </h1>

        <div className="input-group">

            <h2> Tu Principal id ICP: 👇</h2>
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
            
             <Box sx={{ width: 300, maxWidth: '100%' }}>
                <TextField 
                value = {balance}
                onChange={(e) => handleBalance(e.target.value)} 
                fullWidth label="Cantidad" 
                id="fullWidth" />
             </Box>
             <br />
             <Button onClick={depositar} color="secondary" variant="contained" endIcon={<SaveAltIcon />}>
                Depositar
             </Button>
        </div>
         <br></br>
        <div className="input-group">
            <h2>¿Deseas retirar fondos?</h2>
            
            <Box sx={{ width: 300, maxWidth: '100%' }}>
               <TextField 
                  value={cantidadRetiro}
                  onChange={(e) => handleRetiro(e.target.value)}
                  fullWidth 
                  label="Cantidad a retirar" 
                  id="retiro-cantidad" 
               />
            </Box>
            <br />
            <Button onClick={retirar} color="secondary" variant="contained" endIcon={<SaveAltIcon />}>
               Retirar
            </Button>
            </div>

         <br></br>
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
            <h2> Balance: </h2>
            <TextField
                value={fetchedBalance}
                disabled
                fullWidth sx={{ m: 1 }}
                id="standard-disabled"
                defaultValue={balance}
                variant="standard"
            />  
            <br></br>
            <Button onClick={() => fetchBalance()} color="secondary" variant="contained" endIcon={<AccountBalanceWalletIcon />}>
                Consultar
             </Button>
        </div>


         <div className="input-group">
            <h2>Subir su tarjeta Debito-credito</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <br />
            <br></br>
            <Button onClick={subirImagen} color="secondary" variant="contained" endIcon={<SaveAltIcon />}>
               Subir Foto
            </Button>
            <br /><br />
            <Button onClick={obtenerImagen} color="secondary" variant="outlined">
               Ver Foto Subida
            </Button>
            <br />
            {imagenUrl && (
               <div>
                  <img src={imagenUrl} alt="Imagen subida" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />
               </div>
            )}
            </div>


     </div>
  )
}



export default Transfer