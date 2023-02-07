import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Flight } from '../entities/flight';

export const ticketsActions = createActionGroup({
  source: 'tickets',
  events: {
    'load flights': props<{ from: string; to: string }>(),
    'update flight': props<{ flight: Flight }>(),
    'clear flights': emptyProps(),
    'load flight by id': props<{ id: string }>(),
    'save flight': props<{ flight: Flight }>(),
  },
});

export const ticketsApiActions = createActionGroup({
  source: 'tickets API',
  events: {
    'flights loaded': props<{ flights: Flight[] }>(),
    'flight loaded': props<{ flight: Flight }>(),
  },
});
