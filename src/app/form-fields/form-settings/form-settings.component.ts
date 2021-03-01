import { CdkPortal } from '@angular/cdk/portal';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { getFormElementList } from '../../core/store';
import { PortalService } from '../../services/portal.service';

@Component({
  selector: 'app-form-settings',
  template: `<pre *cdkPortal>{{ formElementList$ | ngrxPush | text }}</pre>`,
  styles: [''],
})
export class FormSettingsComponent implements OnInit {
  @Input() item: any;
  @Input() idx: number;

  @ViewChild(CdkPortal, { static: true }) private portal: CdkPortal;

  formElementList$: any;

  constructor(private store: Store, private portalService: PortalService) {}
  ngOnInit(): void {
    this.formElementList$ = this.store
      .select(getFormElementList)
      .pipe(
        map((v) => v.filter((val: any, i: number) => i === this.idx)[0].style)
      );
    this.portalService.changePortal([this.idx, this.portal]);
  }
}
