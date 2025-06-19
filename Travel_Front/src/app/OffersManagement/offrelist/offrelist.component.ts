import {Component, OnInit} from '@angular/core';
import {FilterPipe} from "../../Filter/filter.pipe";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {SidenavComponent} from "../../../lib/sidenav/sidenav.component";
import {Offre} from '../../Models/Offre.model';
import {ToastrService} from 'ngx-toastr';
import {OffreServiceService} from '../../Services/AdminServices/offre-service.service';
import {Destination} from '../../Models/Destination.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-offrelist',
    imports: [
        FilterPipe,
        FormsModule,
        NgForOf,
        RouterLink,
        SidenavComponent
    ],
  templateUrl: './offrelist.component.html',
  styleUrl: './offrelist.component.scss'
})
export class OffrelistComponent implements OnInit{

  offres:Offre[]=[]
  searchtext:any;
  contentMove=false;
  modalRef?: BsModalRef
  offreId!:number

  constructor(private route:Router,private modalService: BsModalService,private toast:ToastrService,private offreService:OffreServiceService) {
  }


  loadOffres(){

    this.offreService.getAllOffres().subscribe({
      next:(data)=>{
        this.offres=data;
      },
      error:(err)=>{
        this.toast.error("Error while fetching data")
      }
    })

  }




  // Method to open the modal
  openModal(template: any, id: number) {
    this.modalRef = this.modalService.show(template);
    this.offreId = id;// Show the modal
  }


  // Method for the action after confirmation
  confirmAction() {
    this.offreService.deleteOffre(this.offreId).subscribe({
      next: () => {
        this.offres = this.offres.filter(offre => offre.id != this.offreId);
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
    this.route.navigate(['/updaterole', id])
  }
  addOffre(){
    this.route.navigate(['/destinations-admin'])
    this.toast.info("Click on the create offer button linked to the destination desired")
  }

  ngOnInit() {
    this.loadOffres();
  }

}
