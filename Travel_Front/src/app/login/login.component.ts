import { Component } from '@angular/core';
import {ButtonBookingComponent} from '../../lib/button-booking/button-booking.component';
import {FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserserviceAdminService} from '../Services/AdminServices/userservice-admin.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ButtonBookingComponent,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email!:string;
  password!:string


  constructor(private toast:ToastrService,private userService:UserserviceAdminService,private router:Router) {
  }



  login(eml:string,pswd:string){
    this.userService.login(eml,pswd).subscribe({
      next:(data)=>{
        if(data.role.id===1){
          this.router.navigate(['/users'])
        }
        else{
          this.router.navigate(['/home'])
        }

      },
      error:()=>{
        this.toast.error("Email or password is incorrect")
      }
    })
  }

}
