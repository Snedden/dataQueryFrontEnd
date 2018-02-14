import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { IdataBaseTable  } from "../db-table/IdataBaseTable";
import { IdataBaseTableColumn  } from "../db-column/IdataBaseTableColumn";
import { DbCred } from "../db-cred";
import { DataBaseTable } from '../db-table/DataBaseTable';

@Injectable()
export class DataTablesService {
  private _Url ='http://localhost:3000/';
  private columns_Url ='http://localhost:3001/';
  private data_Url = 'http://localhost:3002/';
  dbCredentials : any;
  constructor(private _http: Http, private _dbCred: DbCred) {
    this.dbCredentials = {
      user          : _dbCred.user,
      password      : _dbCred.password,
      connectString : decodeURI(_dbCred.connectionString)
    }
  }

  getTables(): Observable<DataBaseTable []> {
    let headers = new Headers({
      'Content-Type': 'text/plain'
    });
    console.log(this._dbCred);
    let body = JSON.stringify(this.dbCredentials);
    console.log("json: ",body);
    return this._http.post(this._Url, body, {headers: headers})
      .map((response: Response) => <DataBaseTable []> response.json())
      .catch((error) => this.handleError(error));
  }

   getColumns(tableName:string): Observable<IdataBaseTableColumn[]> {
    let headers = new Headers({
      'Content-Type': 'text/plain'
    });
    let reqMessage = {
      dbConnectionCredentials : this.dbCredentials,
      tableName : tableName
    }
    let body = JSON.stringify(reqMessage);
    console.log("json: ",body);
    return this._http.post(this.columns_Url, body, {headers: headers})
      .map((response: Response) => <IdataBaseTableColumn[]> response.json())
      .catch((error) => this.handleError(error));
  }

  getData(tableName : string, selectedColumnNames : Object[]){
    let headers = new Headers({
      'Content-Type': 'text/plain'
    });
    let reqMessage = {
      dbConnectionCredentials : this.dbCredentials,
      tableName : tableName ,
      selectedColumnNames : selectedColumnNames,
    }
    let body = JSON.stringify(reqMessage);
    console.log("json: ",body);
    return this._http.post(this.data_Url, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error) => this.handleError(error));
  }

   private handleError(error: Response) {
      alert("There was an error " + error.text())
    return Observable.throw(error.text() || 'Server error');
  }
}
