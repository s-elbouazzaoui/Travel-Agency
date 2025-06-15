import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {User} from '../../Models/User.model';
import {Router} from '@angular/router';
import {Roles} from '../../Models/Roles.model';

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






  constructor(private router:Router){

  }




  addRole(form :NgForm){

  }







  close(){
  }



  ngOnInit(): void {
  }

}
