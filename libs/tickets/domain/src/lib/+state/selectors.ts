import { createSelector } from '@ngrx/store';
import { ticketsFeature } from './reducer';

export const selectFilteredFlights = createSelector(
  ticketsFeature.selectFlights,
  ticketsFeature.selectHide,
  (flights, hide) => flights.filter((f) => !hide.includes(f.id))
);

export const selectFilteredFlightsWithParams = (hide: number[]) =>
  createSelector(ticketsFeature.selectFlights, (flights) =>
    flights.filter((f) => !hide.includes(f.id))
  );
