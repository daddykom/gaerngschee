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
      import('./features/offers/offer-list/offer-list.component').then(
        (m) => m.OfferListComponent
      ),
  },
];