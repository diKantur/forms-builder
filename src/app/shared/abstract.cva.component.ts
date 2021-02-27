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
  private currentValue: T;

  @Input()
  set value(value: T) {
    this.currentValue = value;
    this.writeValue(this.currentValue);
  }

  get value(): T {
    return this.currentValue;
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
    this.currentValue = value;
    this.onChange(this.currentValue);
    setTimeout(() => this.cdRef.detectChanges(), 0);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
