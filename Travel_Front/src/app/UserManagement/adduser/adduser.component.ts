import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {User} from '../../Models/User.model';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserserviceAdminService} from '../../Services/AdminServices/userservice-admin.service';

@Component({
  selector: 'app-adduser',
  imports: [
    FormsModule
  ],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss'
})
export class AdduserComponent implements OnInit{


  user :User = new User();
  passwordConfirm !:string;
  isUser:boolean=false;





  constructor(private router:Router,private toast:ToastrService,private userService:UserserviceAdminService){

  }





  addUser(form :NgForm){
    if(!form.valid){
      this.toast.warning("Please fill all the Fields and try again","",{toastClass:'ngx-toastr shake-toast login-warning'});
    }
    else{
      if(!this.confirmPassword())
        return;
      else{
        if(this.isUser){
          this.user.role={id:1};
        }
        else{
          this.user.role={id:2};
        }
        console.log("user role "+this.user.role);
        this.user.created=new Date();
        this.userService.addUser(this.user).subscribe({
          next :()=>{
            this.toast.success("User added successfully");
            this.router.navigate(['/users']);
          },
          error:(err)=>{
            this.toast.error("Error while inserting the user");

          }
        })
      }
    }

  }


  confirmPassword(){
    const pass = (document.getElementById("passwordId") as HTMLInputElement).value;
    const confirm = (document.getElementById("confirmId") as HTMLInputElement).value
    if(pass!=confirm){
      this.toast.warning("The passwords are not matching","",{toastClass:'ngx-toastr shake-toast login-warning'})
      return false;
    }
    return true;

  }




  close(){
    this.router.navigate(['/users']);
  }



  ngOnInit(): void {
    this.toast.info("the red * marks a required fields","",)
  }

}
