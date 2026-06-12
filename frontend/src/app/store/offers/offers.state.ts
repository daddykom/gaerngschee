import { Offer } from '../../shared/models/offer.model';

export interface OffersState {
  offers: Offer[];
  selectedOffer: Offer | null;
  loading: boolean;
  error: string | null;
}