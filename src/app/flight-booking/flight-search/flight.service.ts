import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../../model/flight';
import { DefaultFlightService } from './default-flight.service';

@Injectable({
  providedIn: 'root',
  useClass: DefaultFlightService,
})
export abstract class FlightService {
  abstract readonly flights$: Observable<Flight[]>;
  abstract flights: Flight[];

  abstract find(from: string, to: string): Observable<Flight[]>;
  abstract findById(id: string): Observable<Flight>;
  abstract delay(): void;
  abstract load(from: string, to: string): void;
}
