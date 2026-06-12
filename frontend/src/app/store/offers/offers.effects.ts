import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OffersActions } from './offers.actions';

@Injectable()
export class OffersEffects {
  private actions$ = inject(Actions);

  loadOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OffersActions.loadOffers),
      switchMap(() =>
        of([]).pipe(
          map((offers) => OffersActions.loadOffersSuccess({ offers })),
          catchError((error) => of(OffersActions.loadOffersFailure({ error: error.message })))
        )
      )
    )
  );
}