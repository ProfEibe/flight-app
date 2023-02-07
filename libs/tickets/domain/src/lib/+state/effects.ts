import { inject, Injectable } from '@angular/core';
import { ticketsActions, ticketsApiActions } from './actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs';
import { FlightService } from '../infrastructure/flight.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class TicketsEffects {
  snackbar = inject(MatSnackBar);
  flightService = inject(FlightService);
  actions$ = inject(Actions);

  loadFlights = createEffect(() =>
    this.actions$.pipe(
      ofType(ticketsActions.loadFlights),
      switchMap((action) => this.flightService.find(action.from, action.to)),
      map((flights) => ticketsApiActions.flightsLoaded({ flights }))
    )
  );

  loadFlightById = createEffect(() =>
    this.actions$.pipe(
      ofType(ticketsActions.loadFlightById),
      switchMap((action) => this.flightService.findById(action.id)),
      map((flight) => ticketsApiActions.flightLoaded({ flight }))
    )
  );

  saveFlight = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ticketsActions.saveFlight),
        switchMap((action) => this.flightService.save(action.flight)),
        tap(() => this.snackbar.open('Flight saved', 'OK', { duration: 3000 })),
        catchError((err) => {
          this.snackbar.open(err.message, 'OK', { duration: 3000 });
          return [];
        })
      ),
    { dispatch: false }
  );
}
