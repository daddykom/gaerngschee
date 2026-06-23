import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { OfferMapViewComponent } from './offer-map.view.component';
import { OffersActions } from '../../../store/offers/offers.actions';
import { selectOffers, selectCurrentPosition } from '../../../store/offers/offers.feature';

@Component({
  standalone: true,
  imports: [OfferMapViewComponent],
  templateUrl: './offer-map.container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferMapContainerComponent {
  protected store = inject(Store);

  offers = this.store.selectSignal(selectOffers);
  currentPosition = this.store.selectSignal(selectCurrentPosition);

  constructor() {
    this.store.dispatch(OffersActions.loadOffers());
  }

  onOfferSelected(offerId: string): void {
    console.log('Selected offer:', offerId);
  }
}
