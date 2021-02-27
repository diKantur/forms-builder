import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractCVAComponent } from './abstract.cva.component';
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
  isPassword: boolean;

  ngOnInit() {
    this.placeholder === 'password' ? (this.type = 'password') : '';
    this.isPassword = this.type === 'password' ? true : false;
  }

  onEnterClick(event: any): void {
    this.enterClick.emit(event);
  }
}
