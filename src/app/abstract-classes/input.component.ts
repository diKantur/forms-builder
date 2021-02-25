// import { Component, OnInit } from '@angular/core';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractCVAComponent } from './cva.component';
@Component({
  selector: 'app-abstract-input',
  template: '',
})
export class AbstractInputComponent extends AbstractCVAComponent<string> {
  @Input() placeholder: any;
  @Input() required: boolean;
  @Input() isPassword: boolean;
  @Output() enterClick = new EventEmitter();

  onEnterClick(event): void {
    this.enterClick.emit(event);
  }
}
