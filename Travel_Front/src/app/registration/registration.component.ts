import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {User} from '../Models/User.model';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserserviceAdminService} from '../Services/AdminServices/userservice-admin.service';

@Component({
  selector: 'app-registration',
  imports: [
    FormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {


  user:User = new User();


  constructor(private router:Router,private toast : ToastrService,private userService : UserserviceAdminService) {
  }


  click(form:any){
    if(!form.valid){
      this.toast.warning("Please fill the the fields before submitting the form")
    }
    else {
      this.userService.register(this.user).subscribe({
        next: () => {
          this.router.navigate([''])
          this.toast.success("User registred successfully", "Please login with your credentials")
        },
        error: (err) => {
          this.toast.error("Error while registering the user", "Please try again")
        }
      })
    }

  }

}
