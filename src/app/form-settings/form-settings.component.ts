import { CdkPortal } from '@angular/cdk/portal';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { getFormElementList } from '../core/store';
import { PortalService } from '../services/portal.service';

@Component({
  selector: 'app-form-settings',
  templateUrl: './form-settings.component.html',
  styleUrls: ['./form-settings.component.css'],
})
export class FormSettingsComponent implements OnInit {
  @Input() item;
  @Input() idx;

  @ViewChild(CdkPortal, { static: true }) private portal: CdkPortal;

  formElementList$: any;

  constructor(private store: Store, private portalService: PortalService) {}

  ngOnInit(): void {
    this.formElementList$ = this.store
      .select(getFormElementList)
      .pipe(map((v) => v.map((val) => val.style)));

    console.log(this.portal);

    this.portalService.changePortal(this.portal);
  }
}
