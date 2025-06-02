# 💸 Billetera ICP 

Bienvenido a **Billetera ICP**, una aplicación web descentralizada construida sobre el Internet Computer (ICP). Esta billetera permite gestionar transferencias de tokens y autenticar usuarios usando **Internet Identity**, todo desplegado mediante `dfx`.

---

## 📁 Estructura del Proyecto

Billetera_ICP/

├── CA-backend/ # Lógica de la billetera en Motoko

├── CA-frontend/ # Interfaz desarrollada con React

├── dfx.json # Configuración de canisters

├── README.md # Este archivo

└── .dfx/ # Archivos temporales generados por dfx


---

## 🚀 Tecnologías usadas

- 🌐 **Internet Computer (ICP)**
- 💻 **Motoko** para la lógica del backend
- ⚛️ **React** en el frontend (`CA-frontend`)
- 🧠 **Internet Identity** para autenticación
- 🧰 Herramientas: `dfx`, `npm`, `vscode`, `git`

---

## 🧪 Ejecutar el proyecto localmente

1. **Instalar dependencias**  
   Asegúrate de tener `dfx` y `npm` instalados:

   ```bash
   npm install
   dfx start --background --clean

   //Desplegar canister 
   dfx deploy

   //Iniciar el servidor frontend
   cd CA-frontend
   npm start

El frontend estará disponible en http://localhost:8080.
   
💡 Notas finales
Asegúrate de ejecutar npm run generate cuando hagas cambios en tu backend.

Usa rm -rf .dfx para limpiar el entorno si algo se corrompe en el desarrollo local.
