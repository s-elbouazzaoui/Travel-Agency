import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Roles} from '../../Models/Roles.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {RoleServiceService} from '../../Services/AdminServices/role-service.service';
import {User} from '../../Models/User.model';

@Component({
  selector: 'app-updaterole',
    imports: [
        FormsModule
    ],
  templateUrl: './updaterole.component.html',
  styleUrl: './updaterole.component.scss'
})
export class UpdateroleComponent implements OnInit {


  role: Roles = new Roles();
  roleId!:number


  constructor(private router: Router,private toast:ToastrService,private roleService:RoleServiceService,private route:ActivatedRoute) {

  }



loadRoleInfo(id:number):void{
  this.roleService.getRoleById(id).subscribe({
    next:(data:Roles)=>{
      this.role = data;
    },
    error :(err)=>{
      console.log("ERROR WHILE FETCHING DATA")
    }
  })
}

  updateRole(form: NgForm) {
  if(form.valid){
    this.roleService.updateRole(this.role,this.roleId).subscribe({
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


  close() {
    this.router.navigate(['/roles'])
  }


  ngOnInit(): void {
    this.roleId = this.route.snapshot.params['id']
    this.loadRoleInfo(this.roleId)
  }
}
