import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-checking',
  templateUrl: './form-checking.component.html',
  styleUrls: ['./form-checking.component.css'],
})
export class FormCheckingComponent implements OnInit {
  @Input('type') type;
  @Input('style') style;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
