import { Component, input, output } from '@angular/core';

import { Place } from './place.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css',
})
export class PlacesComponent {
  places = input.required<Place[]>();
  selectPlace = output<Place>();
  apiUrl = environment.apiUrl;

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }
}
