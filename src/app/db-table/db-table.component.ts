import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IdataBaseTable } from './IdataBaseTable';
import { DbColumnComponent } from '../db-column/db-column.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'db-table',
  templateUrl: './db-table.component.html',
  styleUrls: ['./db-table.component.css']
})
export class DbTableComponent implements OnInit {

  @Input() table: IdataBaseTable;
  @Input() currentSelectedTable: IdataBaseTable;
  @Output() onTableClicked = new EventEmitter<IdataBaseTable>();

  selected : boolean;
  constructor() {

   }




  ngOnInit() {
  }

  tableClicked(){
    console.log(this.table);
    this.onTableClicked.emit(this.table);
    this.selected = true;
  }

  ngOnChanges(){
    if(this.currentSelectedTable){
      if(this.currentSelectedTable != this.table){
        this.selected = false;
      }
    }
  }

}
