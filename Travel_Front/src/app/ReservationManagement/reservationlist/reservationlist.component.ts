import {Component, OnInit} from '@angular/core';
import {FilterPipe} from '../../Filter/filter.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {SidenavComponent} from '../../../lib/sidenav/sidenav.component';
import {Reservation} from '../../Models/Reservation.model';
import {ReservationService} from '../../Services/AdminServices/reservation.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {Router, RouterLink} from '@angular/router';
import {UserSideBarComponent} from '../../../lib/user-side-bar/user-side-bar.component';

@Component({
  selector: 'app-reservationlist',
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    NgStyle,
    UserSideBarComponent,
    RouterLink
  ],
  templateUrl: './reservationlist.component.html',
  styleUrl: './reservationlist.component.scss'
})
export class ReservationlistComponent implements OnInit{
  reservations:Reservation[]=[]
  resId:any;
  contentMove=false
  modalRef?: BsModalRef
  userId:any;

  constructor(private router:Router,private resService : ReservationService, private modalService: BsModalService,private toast:ToastrService) {
  }


  loadRes(id:number){
    this.resService.getResByUserId(id).subscribe({
      next:(data)=>{
        this.reservations = data
      }
    })

  }


  // Method to open the modal
  openModal(template: any, id: number) {
    this.modalRef = this.modalService.show(template);
    this.resId = id;// Show the modal
  }


  // Method for the action after confirmation
  confirmAction() {
    this.resService.deleteRes(this.resId).subscribe({
      next:()=>{
        this.reservations = this.reservations.filter(res=>res.id!=this.resId);
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
    this.router.navigate(['/update-reservation', id])
  }

  cancel(id:number){
    this.resService.cancelRes(id).subscribe({
      next:()=>{
        this.toast.warning("Reservation canceled")
        this.loadRes(this.userId)
      }
    })
  }


  ngOnInit() {
    this.userId = sessionStorage.getItem('userId')
    this.loadRes(this.userId)
  }

}
