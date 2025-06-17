import { Component } from '@angular/core';
import {ButtonBookingComponent} from '../../lib/button-booking/button-booking.component';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [
    ButtonBookingComponent,
    RouterModule

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
