import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-accord-panel',
  templateUrl: './accord-panel.component.html',
  styleUrls: ['./accord-panel.component.scss'],
  viewProviders: [MatExpansionPanel],
})
export class AccordPanelComponent implements OnInit {
  @Input() title;
  @Output() enterClick = new EventEmitter();
  @Output() openedGroup = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onEnterClick(event: any): void {
    this.enterClick.emit(event);
  }

  onOpenedGroup(event: any): void {
    this.openedGroup.emit(event);
  }
}
