import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {User} from '../../Models/User.model';
import {Router} from '@angular/router';
import {Roles} from '../../Models/Roles.model';
import {ToastrService} from 'ngx-toastr';
import {RoleServiceService} from '../../Services/AdminServices/role-service.service';

@Component({
  selector: 'app-addrole',
    imports: [
        FormsModule
    ],
  templateUrl: './addrole.component.html',
  styleUrl: './addrole.component.scss'
})
export class AddroleComponent implements OnInit{


  role :Roles = new Roles();






  constructor(private router:Router,private toast:ToastrService,private roleService:RoleServiceService){

  }




  addRole(form :NgForm){
    if(form.valid){
      this.roleService.addRole(this.role).subscribe({
        next:()=> {
          this.toast.success("Role added successfully");
          this.router.navigate(['/roles'])
        },
        error:(err)=>{
          this.toast.error("An error occurred while inserting the role please try again ")
      }
      })
    }
    else {
      this.toast.warning("Please fill all the Fields and try again","",{toastClass:'ngx-toastr shake-toast login-warning'});
    }
  }







  close(){
    this.router.navigate(['/roles'])
  }



  ngOnInit(): void {
    this.toast.info("the red * marks a required fields","",)
  }

}
