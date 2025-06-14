import { Component } from '@angular/core';
import {ButtonBookingComponent} from '../../lib/button-booking/button-booking.component';

@Component({
  selector: 'app-login',
  imports: [
    ButtonBookingComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
