import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfferJson, OfferLocation } from '../../store/offers/offers.state';

@Injectable({ providedIn: 'root' })
export class OffersService {
  private http = inject(HttpClient);

  getOffers(): Observable<OfferJson[]> {
    return this.http.get<OfferJson[]>('http://localhost:8080/api/offers');
  }
}
