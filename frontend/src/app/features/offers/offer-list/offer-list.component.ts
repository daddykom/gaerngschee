import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OffersActions } from '../../../store/offers/offers.actions';
import { selectOffers, selectOffersState } from '../../../store/offers/offers.feature';

@Component({
  imports: [MatCardModule, MatProgressSpinnerModule],
  template: `
    @if (loading()) {
      <mat-spinner></mat-spinner>
    } @else {
      <div class="offer-grid">
        @for (offer of offers(); track offer.id) {
          <mat-card class="offer-card">
            <mat-card-header>
              <mat-card-title>{{ offer.title }}</mat-card-title>
              <mat-card-subtitle>{{ offer.category }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>{{ offer.description }}</p>
              <span class="location">{{ offer.location }}</span>
            </mat-card-content>
          </mat-card>
        }
      </div>
    }
  `,
  styles: [
    `
      .offer-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
        padding: 1rem 0;
      }
      .offer-card {
        margin-bottom: 0;
      }
      .location {
        color: #666;
        font-size: 0.875rem;
      }
      mat-spinner {
        margin: 2rem auto;
      }
    `,
  ],
})
export class OfferListComponent {
  private store = inject(Store);

  offers = this.store.selectSignal(selectOffers);
  state = this.store.selectSignal(selectOffersState);
  loading = computed(() => this.state().loading);

  constructor() {
    this.store.dispatch(OffersActions.loadOffers());
  }
}
