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
  {
    path: 'offers/:id',
    loadComponent: () =>
      import('./features/offers/offer-detail/offer-detail.component').then(
        (m) => m.OfferDetailComponent
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/category-list/category-list.component').then(
        (m) => m.CategoryListComponent
      ),
  },
];