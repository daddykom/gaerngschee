import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/offers',
    pathMatch: 'full',
  },
  {
    path: 'offers',
    loadComponent: () =>
      import('./features/offers/offer-list/offer-list.container.component').then(
        (m) => m.OfferListContainerComponent
      ),
  },
];