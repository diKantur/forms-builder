import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss'],
})
export class ButtonLinkComponent implements OnInit {
  @Input() title: string;
  @Input() link: string;
  @Input() active: string;
  @Input() color: string;
  @Input() isDisabled: boolean;

  constructor() {}

  ngOnInit(): void {}
}
