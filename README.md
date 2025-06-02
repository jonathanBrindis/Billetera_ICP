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

yaml
Copiar
Editar

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
   dfx start --background
Desplegar los canisters

bash
Copiar
Editar
dfx deploy
Esto compilará y desplegará tus canisters localmente.

Iniciar el servidor frontend

bash
Copiar
Editar
cd CA-frontend
npm start
El frontend estará disponible en http://localhost:8080.

📦 Estructura de canisters (dfx.json)
json
Copiar
Editar
{
  "canisters": {
    "CA-backend": {
      "main": "src/CA-backend/main.mo",
      "type": "motoko"
    },
    "Z3-VB-frontend": {
      "dependencies": ["CA-backend"],
      "source": ["src/CA-frontend/dist"],
      "type": "assets",
      "workspace": "CA-frontend"
    },
    "internet_identity": {
      "candid": "https://github.com/dfinity/internet-identity/releases/latest/download/internet_identity.did",
      "frontend": {},
      "remote": {
        "id": { "ic": "rdmx6-jaaaa-aaaaa-aaadq-cai" }
      },
      "type": "custom",
      "wasm": "https://github.com/dfinity/internet-identity/releases/latest/download/internet_identity_dev.wasm.gz"
    }
  }
}
📚 Documentación útil
Guía rápida de desarrollo en ICP

Documentación de Motoko

Internet Identity

💡 Notas finales
Asegúrate de ejecutar npm run generate cuando hagas cambios en tu backend.

Usa rm -rf .dfx para limpiar el entorno si algo se corrompe en el desarrollo local.
