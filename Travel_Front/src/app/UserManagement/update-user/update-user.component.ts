import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {User} from '../../Models/User.model';
import {ActivatedRoute, Router} from '@angular/router';

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
              private router : Router
  ){}

  loadUserInfo(id:number):void{

  }



  updateUser(form :NgForm){

  }


  confirmPassword(){
    const pass = (document.getElementById("passwordId") as HTMLInputElement).value;
    const confirm = (document.getElementById("confirmId") as HTMLInputElement).value
    if(pass!=confirm){
      //this.toast.warning("The passwords are not matching","",{toastClass:'ngx-toastr shake-toast login-warning'})
      return false;
    }
    return true;
  }







  ngOnInit(): void {


  }


}
