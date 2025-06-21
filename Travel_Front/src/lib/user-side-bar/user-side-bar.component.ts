import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserserviceAdminService} from '../../app/Services/AdminServices/userservice-admin.service';

@Component({
  selector: 'app-user-side-bar',
    imports: [
        RouterLink
    ],
  templateUrl: './user-side-bar.component.html',
  styleUrl: './user-side-bar.component.scss'
})
export class UserSideBarComponent {

  public sidebarShow: boolean = false;
  constructor(private userService : UserserviceAdminService) {
  }


  logout(){
    this.userService.logout();
  }

}
