import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { OffersActions } from '../../../store/offers/offers.actions';
import { selectSelectedOffer } from '../../../store/offers/offers.selectors';

@Component({
  imports: [AsyncPipe, MatCardModule],
  template: `
    @if (offer$ | async; as offer) {
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ offer.title }}</mat-card-title>
          <mat-card-subtitle>{{ offer.category }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>{{ offer.description }}</p>
          <p><strong>Standort:</strong> {{ offer.location }}</p>
          <p><strong>Status:</strong> {{ offer.status }}</p>
        </mat-card-content>
      </mat-card>
    }
  `,
})
export class OfferDetailComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  offer$ = this.store.select(selectSelectedOffer);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(OffersActions.selectOffer({ offerId: id }));
    }
  }
}