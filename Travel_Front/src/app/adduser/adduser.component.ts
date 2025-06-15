import {Component, OnInit} from '@angular/core';
import {User} from '../Models/User.model';
import {Router} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';

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





  constructor(private router:Router,){

  }




  addUser(form :NgForm){




  }


  confirmPassword(){

  }




  close(){

  }



  ngOnInit(): void {


  }




}
