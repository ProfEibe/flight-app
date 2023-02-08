import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ConfigService } from '@flight-demo/shared/util-config';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },

  //
  // Module Federation commented out to simplify further labs.
  // Feel free to uncomment this again.
  //

  // {
  //   path: 'checkin',
  //   loadComponent: () => loadRemoteModule('checkin', './Component'),
  // },

  // {
  //   path: 'luggage',
  //   loadChildren: () => loadRemoteModule('luggage', './routes'),
  // },

  // {
  //   path: 'angular2',
  //   component: WebComponentWrapper,
  //   data: {
  //     type: 'script',
  //     remoteEntry:
  //       'https://gray-pond-030798810.azurestaticapps.net/remoteEntry.js',
  //     remoteName: 'angular2',
  //     exposedModule: './web-components',
  //     elementName: 'angular2-element',
  //   } as WebComponentWrapperOptions,
  // },

  // {
  //   path: 'react',
  //   component: WebComponentWrapper,
  //   data: {
  //     type: 'script',
  //     remoteEntry:
  //       'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js',
  //     remoteName: 'react',
  //     exposedModule: './web-components',
  //     elementName: 'react-element',
  //   } as WebComponentWrapperOptions,
  // },

  // {
  //   matcher: startsWith('angular3'),
  //   component: WebComponentWrapper,
  //   data: {
  //     type: 'script',
  //     remoteEntry:
  //       'https://gray-river-0b8c23a10.azurestaticapps.net/remoteEntry.js',
  //     remoteName: 'angular3',
  //     exposedModule: './web-components',
  //     elementName: 'angular3-element',
  //   } as WebComponentWrapperOptions,
  // },

  {
    path: '',
    resolve: {
      config: () => inject(ConfigService).loaded$,
    },
    children: [
      {
        path: 'flight-booking',
        loadChildren: () =>
          import('@flight-demo/tickets/feature-booking').then(
            (m) => m.FLIGHT_BOOKING_ROUTES
          ),
        data: {
          preload: true,
        },
      },
      {
        path: 'next-flights',
        loadChildren: () =>
          import('@flight-demo/tickets/feature-next-flights').then(
            (m) => m.NextFlightsModule
          ),
      },
      {
        path: 'about',
        loadComponent: () => import('./about/about.component'),
      },

      // This _needs_ to be the last route!!
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];
