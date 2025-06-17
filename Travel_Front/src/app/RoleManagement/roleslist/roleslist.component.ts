import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";

import {Roles} from '../../Models/Roles.model';
import {NgForOf} from '@angular/common';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {RoleServiceService} from '../../Services/AdminServices/role-service.service';

@Component({
  selector: 'app-roleslist',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './roleslist.component.html',
  styleUrl: './roleslist.component.scss'
})
export class RoleslistComponent implements OnInit {
  roles: Roles[] = [];
  roleId!: number;

  modalRef?: BsModalRef

  constructor(private router: Router,private modalService: BsModalService,private toast:ToastrService,private roleService:RoleServiceService) {
  }

  loadRoles() {
    this.roleService.getAllRole().subscribe({
      next :(data)=>{
        if(data){
          console.log("data is here")
        }
        this.roles = data
      },
      error :(err)=>{
        console.log("errror while fetching data")
      }
    })


  }


  // Method to open the modal
  openModal(template: any, id: number) {
    this.modalRef = this.modalService.show(template);
    this.roleId = id;// Show the modal
  }


  // Method for the action after confirmation
  confirmAction() {
    this.roleService.deleteRole(this.roleId).subscribe({
      next: () => {
        this.roles = this.roles.filter(role => role.id != this.roleId);
        this.toast.success("Deleted successfully");
      }
    })
    this.modalRef?.hide();
  }

  // Method to handle cancel
  cancelAction() {
    console.log('Action cancelled');
    this.modalRef?.hide(); // Close the modal
  }


  navigateToUpdate(id: number) {
    this.router.navigate(['/updaterole', id])
  }

  ngOnInit(): void {
    this.loadRoles()
  }
}
