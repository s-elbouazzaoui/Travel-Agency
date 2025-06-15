import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {User} from '../../Models/User.model';
// import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-userslist',
  imports: [
    RouterLink
  ],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.scss'
})
export class UserslistComponent implements OnInit {
  users: User[] = [];
  userId!: number;

  // modalRef?: BsModalRef

  constructor(private router: Router, /**private modalService: BsModalService*/) {
  }

  loadUsers() {

  }


  // Method to open the modal
  openModal(template: any, id: number) {
    /**this.modalRef = this.modalService.show(template);*/
    this.userId = id;// Show the modal
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
