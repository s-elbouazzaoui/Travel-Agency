import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {User} from '../../Models/User.model';
import {Roles} from '../../Models/Roles.model';

@Component({
  selector: 'app-roleslist',
    imports: [
        RouterLink
    ],
  templateUrl: './roleslist.component.html',
  styleUrl: './roleslist.component.scss'
})
export class RoleslistComponent implements OnInit {
  roles: Roles[] = [];
  roleId!: number;

  // modalRef?: BsModalRef

  constructor(private router: Router, /**private modalService: BsModalService*/) {
  }

  loadUsers() {

  }


  // Method to open the modal
  openModal(template: any, id: number) {
    /**this.modalRef = this.modalService.show(template);*/
    this.roleId = id;// Show the modal
  }


  // Method for the action after confirmation
  confirmAction() {

  }

  // Method to handle cancel
  cancelAction() {
    console.log('Action cancelled');
    /**this.modalRef?.hide(); // Close the modal*/
  }


  navigateToUpdate(id: number) {
    this.router.navigate(['/update-user', id])
  }

  ngOnInit(): void {
  }
}
