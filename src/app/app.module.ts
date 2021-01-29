import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { valueReducer } from './core/reducers/core.reducers';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    DragDropModule,
    StoreModule.forRoot({ value: valueReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
