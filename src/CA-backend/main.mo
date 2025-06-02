import Types "Types";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";

import Map "mo:map/Map";
import { phash } "mo:map/Map";

import Text "mo:base/Text";
import Blob "mo:base/Blob";




actor {
    var dataBase: Map.Map<Principal, Types.balance> = Map.new<Principal, Types.balance>();
    //Depositar
    public shared(msg) func Depositar(cantidad: Nat): async Text {

        switch(Map.get(dataBase, phash, msg.caller)){
            case(?found) {
                ignore Map.put(dataBase, phash, msg.caller, found + cantidad);
                return "Deposito Realizado!";
            };
            case(null) {
                ignore Map.put(dataBase, phash, msg.caller, cantidad);
                return "Cuenta creada, Deposito Realizado!";
            };
        };
    };

    //Retirar
    public shared(msg) func Retirar(cantidad: Nat): async Text {
    switch(Map.get(dataBase, phash, msg.caller)){
        case(?found) {
            if (found < cantidad) {
                return "Fondos insuficientes para retirar.";
            } else {
                ignore Map.put(dataBase, phash, msg.caller, found - cantidad);
                return "Retiro exitoso, Te quedan: " # Nat.toText(found - cantidad); 
            }
        };
        case(null) { return "No tienes cuenta aún."; };
    };
};

        // Tipo de la imagen
    type Imagen = {
    datos: Blob;         // contenido binario
    tipoMime: Text;      // ejemplo: "image/jpeg"
    autor: Principal;
    };

    // Solo se guarda una imagen a la vez
    var fotoSubida: ?Imagen = null;
    public shared({caller}) func subirFoto(datos: Blob, tipoMime: Text): async Text {
  fotoSubida := ?{ datos; tipoMime; autor = caller };
  return "Foto subida exitosamente.";
    };
    //Ver foto
    public query func verFoto(): async ?Imagen {
    return fotoSubida;
    };
    //Transferencia 
    public shared(msg) func Transferencia(hacia: Text, cantidad: Nat): async Text {
        var fondos: Nat = switch(Map.get(dataBase, phash, msg.caller)) {
            case(?found) {found};
            case(null) {return "Usuario no existente, porfavor crea tu cuenta agregando fondos"};
        };

        if (fondos < cantidad) {
            return "Fondos insuficientes";
        } else {
            var otrosFondos: Nat = switch(Map.get(dataBase, phash, Principal.fromText(hacia))){
                case(?found) {found};
                case(null) {return "Usuario a transferir no existe!"};
            };
            
            ignore Map.put(dataBase, phash, msg.caller, (fondos - cantidad));
            ignore Map.put(dataBase, phash, Principal.fromText(hacia), (otrosFondos + cantidad));
        };

        return "Transferencia realizada!, tu balance actual es de: " # Nat.toText(fondos - cantidad);
    };
    //Balanceo-Estado de cuenta
    public shared(msg) func VerBalance(): async Text{
        switch(Map.get(dataBase, phash, msg.caller, )){
            case(?found) { return Nat.toText(found)};
            case(null) { return "404 Usuario no encotrado!" };
        };
    };


    public shared(msg) func whoami(): async Text {
        return Principal.toText(msg.caller);
    }




};