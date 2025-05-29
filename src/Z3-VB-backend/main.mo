import Types "Types";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";

import Map "mo:map/Map";
import { phash } "mo:map/Map";



actor {
    var dataBase: Map.Map<Principal, Types.balance> = Map.new<Principal, Types.balance>();

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

    public shared(msg) func VerBalance(): async Text{
        switch(Map.get(dataBase, phash, msg.caller)){
            case(?found) { return Nat.toText(found)};
            case(null) { return "404 Usuario no encotrado!" };
        };
    };

    public shared(msg) func whoami(): async Text {
        return Principal.toText(msg.caller);
    }

};