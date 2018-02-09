import { Component, OnInit } from '@angular/core';
import { Router }                 from '@angular/router';
import { NgForm } from '@angular/forms';
import { DbCred } from '../db-cred';

@Component({
  selector: 'app-credential-form',
  templateUrl: './credential-form.component.html',
  styleUrls: ['./credential-form.component.css']
})
export class CredentialFormComponent implements OnInit {
  dbCred : DbCred;
  constructor(private router: Router, private _dbCred : DbCred) { }

  ngOnInit() {
      this._dbCred.user = "GRC_WORKFLOW_USER";
      this._dbCred._password = "GRC_WORKFLOW_USER";
      this._dbCred._connectionString ="(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=c471mfycpdbtx.int.westgroup.com)(PORT=1521))(LOAD_BALANCE=yes)(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=ord488a.int.westgroup.com)))";
  }



  onSubmit(form: NgForm) {
     console.log(form.value);
     let user = form.value.user;
     let password = form.value.password;
     let connectionString = form.value.connectionString;
     this.router.navigate(['database/'+user+'/'+password+'/'+connectionString])
  }

}
