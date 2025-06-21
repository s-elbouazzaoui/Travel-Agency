import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserserviceAdminService} from '../../app/Services/AdminServices/userservice-admin.service';

@Component({
  selector: 'app-sidenav',
  imports: [
    RouterLink
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  public sidebarShow: boolean = false;

  constructor(private userService : UserserviceAdminService) {
  }


  logout(){
    this.userService.logout();
  }

}
