import { Injectable } from '@angular/core';

export class DbCred {
    _user: string;
    _password: string;
    _connectionString: string;

  constructor(){}

  set user(value:string){
    this._user = value;
  }

  get user():string {
    return this._user
  }

  set password(value:string){
    this._password = value;
  }

  get password():string {
    return this._password;
  }

  set connectionString(value:string){
    this._connectionString  = value;
  }

  get connectionString():string {
    return this._connectionString;
  }


}
