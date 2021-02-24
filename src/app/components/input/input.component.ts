import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  private _value: any;
  onTouched: any;

  @Input() placeholder: any;
  @Input() required: boolean;
  @Input() isPassword: boolean;
  @Output() enterClick = new EventEmitter();

  constructor() {}

  @Input()
  set value(value: any) {
    this._value = value;
    this.writeValue(this._value);
  }

  get value(): any {
    return this._value;
  }
  writeValue(value: any): void {
    this._value = value;
    this.onChange(this._value);
  }

  private onChange = (value: any) => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onEnterClick(event): void {
    this.enterClick.emit(event);
  }

  ngOnInit(): void {}
}
