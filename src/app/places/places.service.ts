import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

import { Place } from './place.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('/places', 'Could not fetch available places');
  }

  loadUserPlaces() {
    return this.fetchPlaces('/user-places', 'Could not fetch user places');
  }

  addPlaceToUserPlaces(placeId: string) {
    return this.httpClient.put(`${environment.apiUrl}/user-places`, {
      placeId,
    });
  }

  removeUserPlace(place: Place) {}

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient
      .get<{ places: Place[] }>(`${environment.apiUrl}${url}`)
      .pipe(
        map((response) => response.places),
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
