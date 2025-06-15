import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Roles} from '../../Models/Roles.model';
import {Router} from '@angular/router';

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


  constructor(private router: Router) {

  }


  updateRole(form: NgForm) {

  }


  close() {
  }


  ngOnInit(): void {
  }
}
