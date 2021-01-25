import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  accordionList = [
    { title: 'General styles', style: {} },
    { title: 'input', style: {} },
  ];
  displayStyle(idx){
    return JSON.stringify(this.accordionList[idx].style)
  }
  changeStyle(val, idx) {
    val = val.split(';').map(v => v?.split(':'));
    val.forEach(v => {
      v[0] = v[0].trim();
      v[1] = v[1].trim();
      this.accordionList[idx].style[v[0]] = v[1];
    });
  }
}
