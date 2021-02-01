import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { valueReducer } from './core/store/core.reducer';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './core/store/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    DragDropModule,
    StoreModule.forRoot({ value: valueReducer }),
    EffectsModule.forRoot([Effects])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
