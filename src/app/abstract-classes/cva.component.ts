import { ControlValueAccessor } from '@angular/forms';
import {
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  Type,
} from '@angular/core';

@Component({
  selector: 'app-abstract-cva',
  template: '',
})
export class AbstractCVAComponent<T = any> implements ControlValueAccessor {
  private _value: T;

  @Input()
  set value(value: T) {
    this._value = value;
    this.writeValue(this._value);
  }

  get value(): T {
    return this._value;
  }

  protected cdRef: ChangeDetectorRef;

  constructor(public injector: Injector) {
    this.cdRef = injector.get<ChangeDetectorRef>(
      ChangeDetectorRef as Type<ChangeDetectorRef>
    );
  }

  private onChange = (value: T) => {};
  onTouched = () => {};

  writeValue(value: T): void {
    this._value = value;
    this.onChange(this._value);
    setTimeout(() => this.cdRef.detectChanges(), 0);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
