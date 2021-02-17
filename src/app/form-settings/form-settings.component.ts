import { CdkPortal } from '@angular/cdk/portal';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PortalService } from '../services/portal.service';

@Component({
  selector: 'app-form-settings',
  templateUrl: './form-settings.component.html',
  styleUrls: ['./form-settings.component.css'],
})
export class FormSettingsComponent implements OnInit {
  @Input() item;
  @ViewChild(CdkPortal, { static: true }) private portal: CdkPortal;

  constructor(private portalService: PortalService) {}

  ngOnInit(): void {
    this.portalService.changePortal(this.portal);
  }
}
