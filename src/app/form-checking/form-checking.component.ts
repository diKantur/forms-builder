import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-form-checking',
  templateUrl: './form-checking.component.html',
  styleUrls: ['./form-checking.component.css'],
})
export class FormCheckingComponent implements OnInit {
  @Input() item;
  @Input() idx;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
