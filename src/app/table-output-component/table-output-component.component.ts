import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataBaseTable } from '../db-table/DataBaseTable';
import { DataTablesService} from "../db-tables/db-tables.service";
import { Subject }    from 'rxjs/Subject';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-table-output-component',
  templateUrl: './table-output-component.component.html',
  styleUrls: ['./table-output-component.component.css']
})
export class TableOutputComponentComponent implements OnInit {
  @Input()
  getDataClickedEvent:Subject<DataBaseTable>;
  table : DataBaseTable;
  tableCols: string[];
  tableRows:string[][];
  tableData= new Map()// colName, colData
  constructor(private cdr:ChangeDetectorRef,private _dataTablesService: DataTablesService) {
      this.tableData= new Map()// colName, colData
      this.tableRows=[];
  }

  ngOnInit() {
    this.getDataClickedEvent.subscribe(currentSelectedTable => {
      this.getData(currentSelectedTable);
    })
  }

  ngOnChanges() {

  }

  getData(currentSelectedTable:DataBaseTable){
    console.log("Selected Table ",currentSelectedTable);
    this.table = currentSelectedTable;
    this.tableCols = Array.from(currentSelectedTable.selectedColumnNames.values());

    var self = this;

    //Reset  Data
    for (var col of this.tableCols) {
      currentSelectedTable.TABLE_COLUMNS.get(col).DATA = [];
      this.tableData.set(col,[]);
    }


    this._dataTablesService.getData(currentSelectedTable.TABLE_NAME,this.tableCols)
      .subscribe(
        response => {
          let i = 0;
          console.log("Response", response);
          for(let obj of response){
            console.log("Object: ",obj);
            let j = 0;
            this.tableRows[i] = [];
            for(let key in obj){
              console.log("Key: ",key);
              //currentSelectedTable.TABLE_COLUMNS.get(key).DATA.push(obj[key]);
              //this.tableData.get(key).push(obj[key]);
              this.tableRows[i][j] = obj[key];

              j++;
            }
            i++;
          }

          console.log("Final table object:",this.tableRows);
        }
      )
  }

}
