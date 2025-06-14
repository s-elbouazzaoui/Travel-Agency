import { Component } from '@angular/core';
import {ButtonBookingComponent} from '../../lib/button-booking/button-booking.component';


@Component({
  selector: 'app-home',
  imports: [
    ButtonBookingComponent

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
