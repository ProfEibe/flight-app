import { Flight } from '../entities/flight';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ticketsActions } from './actions';

export interface TicketsState {
  flights: Flight[];
  basket: unknown;
  tickets: unknown;
}

export const initialState: TicketsState = {
  flights: [],
  basket: {},
  tickets: {},
};

export const ticketsFeature = createFeature({
  name: 'tickets',
  reducer: createReducer(
    initialState,
    on(ticketsActions.flightsLoaded, (state, { flights }) => {
      return {
        ...state,
        flights,
      };
    }),
    on(ticketsActions.updateFlight, (state, { flight }) => {
      const updated = flight;
      const flights = state.flights.map((f) =>
        f.id === updated.id ? updated : f
      );

      return {
        ...state,
        flights,
      };
    }),
    on(ticketsActions.clearFlights, (state) => {
      return {
        ...state,
        flights: [],
      };
    })
  ),
});
