import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {User} from '../../Models/User.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserserviceAdminService} from '../../Services/AdminServices/userservice-admin.service';

@Component({
  selector: 'app-update-user',
  imports: [
    FormsModule
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit{


  userid!:number;
  user:User = new User();
  isUser:boolean=false;
  passConfirm !:string;

  constructor(private route:ActivatedRoute,
              private router : Router,
              private toast:ToastrService,
              private userService:UserserviceAdminService
  ){}

  loadUserInfo(id:number):void{
    this.userService.getSingleUser(id).subscribe({
      next :(data:User)=>{
        this.user = data;
        this.isUser = this.user.role.id != 2;
        this.passConfirm=this.user.password

      },
      error :(err)=>{
        console.log("ERROR WHILE FETCHING DATA")
      }
    })
  }



  updateUser(form :NgForm){
    if(!form.valid){
      this.toast.warning("Please fill all the Fields and try again","",{toastClass:'ngx-toastr shake-toast login-warning'});
    }
    else{
      if(!this.confirmPassword())
        return;
      else{
        if(this.isUser){
          this.user.role.id=1;
        }
        else{
          this.user.role.id=2
        }
        console.log("user role "+this.user.role);
        this.userService.updateUser(this.user,this.userid).subscribe({
          next :()=>{
            this.toast.success("User Updated successfully");
            this.router.navigate(['/users']);
          },
          error:(err)=>{
            this.toast.error("Error while inserting the user");

          }
        })
      }
    }

  }
  cancel(){
    this.router.navigate(['/users'])
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







  ngOnInit(): void {
    this.userid = this.route.snapshot.params['id']
    this.loadUserInfo(this.userid);

  }


}
