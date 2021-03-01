import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractCVAComponent } from './abstract.cva.component';
import { InputType } from './enums';
@Component({
  selector: 'app-abstract-input',
  template: '',
})
export class AbstractInputComponent
  extends AbstractCVAComponent<string>
  implements OnInit {
  @Input() placeholder: any;
  @Input() required: boolean;
  @Input() type: string;
  @Input() errorValue: string;
  @Output() enterClick = new EventEmitter();
  @Output() submitClick = new EventEmitter();
  hide = true;

  ngOnInit() {
    if (this.placeholder === InputType.password) {
      this.type = InputType.password;
    }
  }

  isPassword() {
    return this.type === InputType.password ? true : false;
  }

  onEnterClick(event: any): void {
    this.enterClick.emit(event);
  }
}
