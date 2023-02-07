import { inject, Injectable } from '@angular/core';
import { ticketsActions, ticketsApiActions } from './actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { FlightService } from '../infrastructure/flight.service';

@Injectable({ providedIn: 'root' })
export class TicketsEffects {
  flightService = inject(FlightService);
  actions$ = inject(Actions);

  loadFlights = createEffect(() =>
    this.actions$.pipe(
      ofType(ticketsActions.loadFlights),
      switchMap((action) => this.flightService.find(action.from, action.to)),
      map((flights) => ticketsApiActions.flightsLoaded({ flights }))
    )
  );
}
