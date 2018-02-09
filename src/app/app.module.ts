import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';



import { AppComponent } from './app.component';
import { DbTablesComponent } from './db-tables/db-tables.component';
import { DbTableComponent } from './db-table/db-table.component';
import { DataTablesService } from './db-tables/db-tables.service';
import { CredentialFormComponent } from './credential-form/credential-form.component';
import { DbColumnComponent } from './db-column/db-column.component';
import { DbCred } from './db-cred';

const appRoutes: Routes = [
  { path: 'database/:user/:password/:string', component: DbTablesComponent },
  { path: '**', component: CredentialFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DbTablesComponent,
    DbTableComponent,
    CredentialFormComponent,
    DbColumnComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    DataTablesService,
    DbCred,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
