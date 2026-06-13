import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Offer } from '../../../shared/models/offer.model';

@Component({
  selector: 'app-offer-list-view',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule],
  template: `
    @if (loading) {
      <mat-spinner></mat-spinner>
    } @else {
      <div class="offer-grid">
        @for (offer of offers; track offer.id) {
          <mat-card class="offer-card" (click)="cardClick.emit(offer)">
            <mat-card-header>
              <mat-card-title>{{ offer.title }}</mat-card-title>
              <mat-card-subtitle>{{ offer.category }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>{{ offer.description }}</p>
              <span class="location">{{ offer.location.address }}</span>
            </mat-card-content>
          </mat-card>
        }
      </div>
    }
  `,
  styles: [`
    .offer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      padding: 1rem 0;
    }
    .offer-card {
      margin-bottom: 0;
      cursor: pointer;
    }
    .location {
      color: #666;
      font-size: 0.875rem;
    }
    mat-spinner {
      margin: 2rem auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferListViewComponent {
  @Input() offers: Offer[] = [];
  @Input() loading = false;
  @Output() cardClick = new EventEmitter<Offer>();
}