import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";




module Types {
    public type dataBase = HashMap.HashMap<Principal, balance>;
    public type balance =  Nat;
    public type infoUser ={
        balance:Nat;
        agenda: [Principal];
        transacciones: [Text];
    }
}