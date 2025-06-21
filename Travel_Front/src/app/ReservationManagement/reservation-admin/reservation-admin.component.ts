import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {SidenavComponent} from "../../../lib/sidenav/sidenav.component";
import {Reservation} from '../../Models/Reservation.model';
import {ReservationService} from '../../Services/AdminServices/reservation.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-reservation-admin',
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule,
        SidenavComponent
    ],
  templateUrl: './reservation-admin.component.html',
  styleUrl: './reservation-admin.component.scss'
})
export class ReservationAdminComponent implements OnInit{

  contentMove=false
  reservations : Reservation[]=[]


  constructor(private resService:ReservationService,private toast:ToastrService) {
  }

  loadReservation(){
    this.resService.getAllRes().subscribe({
      next:(data)=>{
        this.reservations = data
      }
    })

  }

  reject(id:number){
    this.resService.rejectRes(id).subscribe({
      next:()=>{
        this.toast.warning("reservation rejected")
        this.loadReservation();
      }
    })
  }

  approve(id:number){
    this.resService.validateRes(id).subscribe({
      next:()=>{
        this.toast.success("reservation validated")
        this.loadReservation()
      }
    })
  }

  ngOnInit() {
    this.loadReservation();
  }

}
