import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { IdataBaseTable  } from "../db-table/IdataBaseTable";
import { DbCred } from "../db-cred";

@Injectable()
export class DbColumnServiceService {
  private _Url ='http://localhost:3001/';

  constructor(private _http: Http, private _dbCred:DbCred) {

  }

  getColumns(tableName:string): Observable<IdataBaseTable[]> {
    let headers = new Headers({
      'Content-Type': 'text/plain'
    });
    let DbCredentials = {
      user          : this._dbCred.user,
      password      : this._dbCred.password,
      connectString : decodeURI(this._dbCred.connectionString)
    }

    let reqMessage = {
      dbConnectionCredentials : DbCredentials,
      tableName : tableName
    }
    let body = JSON.stringify(reqMessage);
    console.log("json: ",body);
    return this._http.post(this._Url, body, {headers: headers})
      .map((response: Response) => <IdataBaseTable[]> response.json())
      .catch((error) => this.handleError(error));
  }

    private handleError(error: Response) {
      alert("There was an error " + error.text())
    return Observable.throw(error.text() || 'Server error');
  }
}
