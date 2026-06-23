import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  ElementRef,
  viewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Offer } from '../../../shared/models/offer.model';
import { OfferLocation } from '../../../store/offers/offers.state';

@Component({
  selector: 'app-offer-map-view',
  standalone: true,
  imports: [],
  templateUrl: './offer-map.view.component.html',
  styleUrl: './offer-map.view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferMapViewComponent implements AfterViewInit, OnDestroy {
  offers = input<Offer[]>([]);
  currentPosition = input<OfferLocation>({
    latitude: 47.556431,
    longitude: 7.591641,
    address: 'Münsterplatz, Basel',
  });
  offerSelected = output<string>();

  mapContainer = viewChild.required<ElementRef<HTMLElement>>('mapContainer');

  private map: maplibregl.Map | undefined;
  private markers: maplibregl.Marker[] = [];

  async ngAfterViewInit(): Promise<void> {
    const maplibregl = await import('maplibre-gl');

    this.map = new maplibregl.Map({
      container: this.mapContainer().nativeElement,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [this.currentPosition().longitude, this.currentPosition().latitude],
      zoom: 14,
    });

    this.addMarkers(maplibregl);
  }

  ngOnDestroy(): void {
    this.markers.forEach((marker) => marker.remove());
    this.map?.remove();
  }

  onMarkerClick(offerId: string): void {
    this.offerSelected.emit(offerId);
  }

  private addMarkers(maplibregl: typeof import('maplibre-gl')): void {
    const mapInstance = this.map;
    if (!mapInstance) return;

    this.offers().forEach((offer) => {
      if (!offer.location?.latitude || !offer.location?.longitude) return;

      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
        this.createPopupContent(offer),
      );

      const marker = new maplibregl.Marker()
        .setLngLat([offer.location.longitude, offer.location.latitude])
        .setPopup(popup);

      marker.getElement().addEventListener('click', () => {
        this.onMarkerClick(offer.id);
      });

      marker.addTo(mapInstance);
      this.markers.push(marker);
    });
  }

  private createPopupContent(offer: Offer): string {
    const truncatedDescription =
      offer.description.length > 100
        ? offer.description.substring(0, 100) + '...'
        : offer.description;
    return `
      <div class="offer-popup">
        <h4>${offer.title}</h4>
        <span class="category-badge">${offer.category}</span>
        <p>${truncatedDescription}</p>
      </div>
    `;
  }
}
