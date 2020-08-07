import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.usermanager';
import { MongoService } from './mongo.service';
import {ModalComponent} from './dialog';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
   
  ],
  providers: [MongoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
