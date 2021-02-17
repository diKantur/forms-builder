import { CdkPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  constructor() {}
  private _portal$ = new BehaviorSubject<CdkPortal>(null);
  public portal$ = this._portal$.asObservable();

  changePortal(portal: CdkPortal): void {
    this._portal$.next(portal);
  }
}
