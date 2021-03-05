import { Component, Input, OnInit } from '@angular/core';
import { FormElementType } from '../shared/enums';
@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss'],
})
export class FormFieldsComponent implements OnInit {
  @Input() item: any;
  @Input() idx: number;
  @Input() placeholder: string;
  type = FormElementType;
  constructor() {}

  ngOnInit(): void {}

  isPlaceholder(item): string {
    return item.style.placeholder ? item.style.placeholder : item.value;
  }
}
