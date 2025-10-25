import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./modules/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },
  {
    path: 'drivers',
    loadChildren: () =>
      import('./modules/drivers/drivers.routes')
        .then(m => m.DRIVERS_ROUTES)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
