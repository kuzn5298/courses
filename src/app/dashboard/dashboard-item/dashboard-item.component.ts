import { Component, input } from '@angular/core';
import { Image } from './dashboard-item.model';

@Component({
  selector: 'app-dashboard-item',
  imports: [],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css',
})
export class DashboardItemComponent {
  image = input.required<Image>();
  title = input.required<string>();
}
