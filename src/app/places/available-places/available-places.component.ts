import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first, map, throwError } from 'rxjs';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
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
  isFetching = signal(false);
  error = signal<string | undefined>(undefined);

  private httpClient = inject(HttpClient);

  ngOnInit() {
    this.isFetching.set(true);
    this.httpClient
      .get<{ places: Place[] }>(`${environment.apiUrl}/places`)
      .pipe(
        map((response) => response.places),
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error('something went wrong'));
        }),
        first()
      )
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        error: (error: Error) => {
          this.error.set(error.message);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });
  }
}
