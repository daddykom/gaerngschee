import { createReducer, on } from '@ngrx/store';
import { OffersState } from './offers.state';
import { OffersActions } from './offers.actions';

const initialState: OffersState = {
  offers: [],
  selectedOffer: null,
  loading: false,
  error: null,
};

export const offersReducer = createReducer(
  initialState,
  on(OffersActions.loadOffers, (state) => ({ ...state, loading: true, error: null })),
  on(OffersActions.loadOffersSuccess, (state, { offers }) => ({
    ...state,
    offers,
    loading: false,
  })),
  on(OffersActions.loadOffersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);