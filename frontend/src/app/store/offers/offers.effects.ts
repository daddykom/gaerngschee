import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { getDistance } from 'geolib';
import { OffersActions } from './offers.actions';
import { selectCurrentPosition } from './offers.feature';
import { OffersService } from '../../shared/services/offers.service';
import { Offer } from '../../shared/models/offer.model';
import { OfferJson } from './offers.state';

@Injectable()
export class OffersEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private offersService = inject(OffersService);

  loadOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OffersActions.loadOffers),
      withLatestFrom(this.store.select(selectCurrentPosition)),
      switchMap(([, currentPosition]) =>
        this.offersService.getOffers().pipe(
          map((offers: OfferJson[]) =>
            offers.map(
              (o: OfferJson): Offer => ({
                ...o,
                currentDistance:
                  getDistance(
                    { latitude: currentPosition.latitude, longitude: currentPosition.longitude },
                    { latitude: o.location.latitude, longitude: o.location.longitude },
                  ) / 1000,
                createdAt: new Date(o.createdAt),
                updatedAt: new Date(o.updatedAt),
              }),
            ),
          ),
          map((offers: Offer[]) => OffersActions.loadOffersSuccess({ offers })),
          catchError((error) => of(OffersActions.loadOffersFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
