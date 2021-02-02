import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './core/store/effects';
import { reducers } from './core/store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    DragDropModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([Effects])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
