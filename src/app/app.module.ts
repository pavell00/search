import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { Ng2SmartTableModule } from 'ng2-smart-table';
//import { Ng2CompleterModule } from "ng2-completer";

import { FormsModule } from '@angular/forms';

import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, Ng2SearchPipeModule, FormsModule, HttpClientModule, Ng2SmartTableModule//, Ng2CompleterModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
