import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckinFacade } from '@flight-demo/luggage/domain';
import { LuggageUiCardComponent } from '@flight-demo/luggage/ui-card';

// import { FlightService } from '@flight-demo/tickets/domain';

@Component({
  standalone: true,
  imports: [CommonModule, LuggageUiCardComponent],
  selector: 'luggage-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss'],
})
export class CheckinComponent implements OnInit {
  luggageList$ = this.checkinFacade.luggageList$;

  constructor(private checkinFacade: CheckinFacade) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.checkinFacade.load();
  }
}
