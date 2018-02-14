import { Component, OnInit, ViewChild } from '@angular/core';
import { IdataBaseTable } from '../db-table/IdataBaseTable';
import { DataTablesService} from "./db-tables.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { DbCred } from '../db-cred';
import { DataBaseTable } from '../db-table/DataBaseTable';
import { IdataBaseTableColumn } from '../db-column/IdataBaseTableColumn';
import * as $ from 'jquery';
import { TableOutputComponentComponent } from "../table-output-component/table-output-component.component";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'db-tables',
  templateUrl: './db-tables.component.html',
  styleUrls: ['./db-tables.component.css']
})
export class DbTablesComponent implements OnInit {

  tableArray: DataBaseTable[] = [];
  currentSelectedTable : DataBaseTable;
  addCssClass : boolean = true;
  private getDataClickedEvent = new Subject<DataBaseTable>();
  selectedTableCols:string[];

  constructor(private cdr:ChangeDetectorRef,private _dataTablesService: DataTablesService,private route: ActivatedRoute) {

  }
/*ngAfterViewChecked()
{
  console.log( "! changement de la date du composant !" );
  if(this.currentSelectedTable){
    // this.currentSelectedTable.TABLE_COLUMNS = new Map()
    this.cdRef.detectChanges();
  }

}*/
  ngOnInit() {
     var self = this;
     this.route.paramMap
      .switchMap((params: ParamMap) => {

        return this._dataTablesService.getTables();
      })
      .subscribe(
        response => {
          for(let table of response){
            table.TABLE_COLUMNS = new Map();
            self.tableArray.push(table);
          }
          //self.tableArray = response;
          console.log("response",self.tableArray)
        },
        error => {

        });;

      //to unselected a table on background click
      $(document).bind('click', function(e) {
        if($(e.target).closest('.tableSelectionKeep').length === 0) {
          // do something
          console.log("clicked");
          self.currentSelectedTable.isSelected = false;
          self.currentSelectedTable = null;
        }
      });
  }

  onTableClicked(table : DataBaseTable ){
    var self = this;
    this.currentSelectedTable = table;
    this.checkForSelected();
    this._dataTablesService.getColumns(this.currentSelectedTable.TABLE_NAME)
      .subscribe(
        response => {
           for(let column of response){
             self.currentSelectedTable.TABLE_COLUMNS.set(column.COLUMN_NAME,column);

           }
          self.selectedTableCols = Array.from(self.currentSelectedTable.TABLE_COLUMNS.keys());
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

  columnClicked(column:string){
    if(!this.currentSelectedTable.selectedColumnNames){
      this.currentSelectedTable.selectedColumnNames = new Set([]);
    }
    let col = this.currentSelectedTable.TABLE_COLUMNS.get(column);
    if(col.isChecked){
      this.currentSelectedTable.TABLE_COLUMNS.get(column).isChecked = false;
      this.currentSelectedTable.selectedColumnNames.delete(column);
    }
    else{
      this.currentSelectedTable.TABLE_COLUMNS.get(column).isChecked = true;
      this.currentSelectedTable.selectedColumnNames.add(column);
    }
  }

  getData(){
    this.getDataClickedEvent.next(this.currentSelectedTable);
  }




}


