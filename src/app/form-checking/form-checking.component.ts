import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-checking',
  templateUrl: './form-checking.component.html',
  styleUrls: ['./form-checking.component.css'],
})
export class FormCheckingComponent implements OnInit {
  @Input() item: any;
  @Input() idx: number;
  @Input() placeholder: string;
  type = FormElementType;
  constructor() {}

  ngOnInit(): void {}
}
enum FormElementType {
  Input = 'input',
  Button = 'button',
  Checkbox = 'checkbox',
  Select = 'select',
  Textarea = 'textarea',
}
