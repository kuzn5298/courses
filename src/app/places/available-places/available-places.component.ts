import { Component, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { first, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);

  private httpClient = inject(HttpClient);

  ngOnInit() {
    this.httpClient
      .get<{ places: Place[] }>(`${environment.apiUrl}/places`)
      .pipe(
        map((response) => response.places),
        first()
      )
      .subscribe((places) => {
        this.places.set(places);
      });
  }
}
