import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {User} from '../../Models/User.model';
import {NgForOf, NgIf} from '@angular/common';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {UserserviceAdminService} from '../../Services/AdminServices/userservice-admin.service';
import {SidenavComponent} from '../../../lib/sidenav/sidenav.component';
// import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-userslist',
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    SidenavComponent
  ],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.scss'
})
export class UserslistComponent implements OnInit {
  users: User[] = [];
  userId!: number;

  modalRef?: BsModalRef
  contentMove=false;

  roleId:string|null='';

  initRoleId:any

  constructor(private router: Router, private modalService: BsModalService,private toast:ToastrService,private userService: UserserviceAdminService) {
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next :(data)=>{
        if(data){
          console.log("data is here")
        }
        this.users = data
      },
      error :(err)=>{
        console.log("errror while fetching data")
      }
    })

  }


  // Method to open the modal
  openModal(template: any, id: number) {
    this.modalRef = this.modalService.show(template);
    this.userId = id;// Show the modal
  }


  // Method for the action after confirmation
  confirmAction() {
    this.userService.deleteUser(this.userId).subscribe({
      next:()=>{
        this.users = this.users.filter(user=>user.id!=this.userId);
        this.toast.success("Deleted successfully");
      }
    })
    console.log('Action confirmed');
    this.modalRef?.hide(); // Close the modal
  }

  // Method to handle cancel
  cancelAction() {
    console.log('Action cancelled');
    this.modalRef?.hide(); // Close the modal
  }


  navigateToUpdate(id: number) {
    this.router.navigate(['/update-user', id])
  }

  ngOnInit(): void {
    this.initRoleId = sessionStorage.getItem('userRole')
    if (this.initRoleId==='1'){
      this.loadUsers();
    }
    else{
      this.router.navigate(['/home'])
      this.toast.warning("Normal users are not allowed to visit the admin section")
    }

  }
}
