import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, copyArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  accordionList = [
  ];
  formProp = {
    style:{},
    changeStyle(val){
      val = val.split(';').map(v => v?.split(':'));
      val.forEach(v => {
      v[0] = v[0].trim();
      v[1] = v[1].trim();
      this.style[v[0]] = v[1];
    });
    }
  }

  displayStyle(val){
    return JSON.stringify(val)
  }
  changeStyle(val, idx) {
    val = val.split(';').map(v => v?.split(':'));
    val.forEach(v => {
      v[0] = v[0].trim();
      v[1] = v[1].trim();
      this.accordionList[idx].style[v[0]] = v[1];
    });
  }
  formElements = [
    {title:'input', style: {}, value: 'input', type: 'text'},
    {title:'button', style: {}, value: 'button', type: 'button'},
    {title:'input2', style: {}, value: 'input2', type: 'text'},
    {title:'input3', style: {}, value: 'input3', type: 'text'},
    {title:'input4', style: {}, value: 'input4', type: 'text'},
    {title:'input5', style: {}, value: 'input5', type: 'text'}
  ];

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
