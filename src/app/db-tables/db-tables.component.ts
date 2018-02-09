import { Component, OnInit } from '@angular/core';
import { IdataBaseTable } from '../db-table/IdataBaseTable';
import { DataTablesService} from "./db-tables.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { DbCred } from '../db-cred';
import { DataBaseTable } from '../db-table/DataBaseTable';
import { IdataBaseTableColumn } from '../db-column/IdataBaseTableColumn';

@Component({
  selector: 'db-tables',
  templateUrl: './db-tables.component.html',
  styleUrls: ['./db-tables.component.css']
})
export class DbTablesComponent implements OnInit {

  tableArray: DataBaseTable[];
  currentSelectedTable : DataBaseTable;
  addCssClass : boolean = true;


  constructor(private _dataTablesService: DataTablesService,private route: ActivatedRoute) {

  }

  ngOnInit() {
     var self = this;
     this.route.paramMap
      .switchMap((params: ParamMap) => {

        return this._dataTablesService.getTables();
      })
      .subscribe(
        response => {
          self.tableArray = response;
          console.log("response",self.tableArray)
        },
        error => {

        });;
  }

  onTableClicked(table : DataBaseTable ){
    var self = this;
    this.currentSelectedTable = table;
    this.checkForSelected();
    this._dataTablesService.getColumns(this.currentSelectedTable.TABLE_NAME)
      .subscribe(
        response => {
          self.currentSelectedTable.TABLE_COLUMNS = response;
          console.log("columns : ",self.currentSelectedTable.TABLE_COLUMNS);
        }
      )
  }

  checkForSelected(){
    this.tableArray.forEach((table) =>{
      if(table.TABLE_NAME == this.currentSelectedTable.TABLE_NAME){
        table.isSelected = true;
      }
      else{
        table.isSelected = false;
      }
    });
  }

  columnClicked(column:IdataBaseTableColumn){
    if(column.isChecked){
      column.isChecked = false;
    }
    else{
      column.isChecked = true;
    }
  }

}
