import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {SidenavComponent} from '../../../lib/sidenav/sidenav.component';
import {User} from '../../Models/User.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {UserserviceAdminService} from '../../Services/AdminServices/userservice-admin.service';
import {DestinationService} from '../../Services/AdminServices/destination.service';
import {Destination} from '../../Models/Destination.model';
import {FilterPipe} from '../../Filter/filter.pipe';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-destinationlist-admin',
  imports: [
    RouterLink,
    SidenavComponent,
    FilterPipe,
    NgForOf,
    FormsModule
  ],
  templateUrl: './destinationlist-admin.component.html',
  styleUrl: './destinationlist-admin.component.scss'
})
export class DestinationlistAdminComponent implements OnInit {
  destinations: Destination[] = [];
  destinationId!: number;
  searchtext : any;
  filteredDestinations: any[] = [];

  modalRef?: BsModalRef
  contentMove=false;

  roleId:any

  constructor(private router: Router, private modalService: BsModalService,private toast:ToastrService,private destinationService: DestinationService) {
  }

  loadDestinations() {
    this.destinationService.getAllDestinations().subscribe({
      next :(data)=>{
        if(data){
          console.log("data is here")
        }
        this.destinations = data
      },
      error :(err)=>{
        console.log("errror while fetching data")
      }
    })

  }


  onSearchChange(): void {
    if (this.searchtext.trim() === '') {
      this.filteredDestinations = this.destinations;
    } else {
      this.filteredDestinations = this.destinations.filter((destination) =>
        destination.lieu.toLowerCase().includes(this.searchtext.toLowerCase())
      );
    }
  }


  // Method to open the modal
  openModal(template: any, id: number) {
    this.modalRef = this.modalService.show(template);
    this.destinationId = id;// Show the modal
  }


  // Method for the action after confirmation
  confirmAction() {
    this.destinationService.deleteDestination(this.destinationId).subscribe({
      next:()=>{
        this.destinations = this.destinations.filter(des=>des.id!=this.destinationId);
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
    this.router.navigate(['/update-destination', id])
  }

  addOffre(id:number){

    this.router.navigate(['/addoffre', id])
  }
  ngOnInit(): void {
    this.roleId = sessionStorage.getItem('userRole')
    if (this.roleId==='1'){
      this.loadDestinations();
    }
    else{
      this.router.navigate(['/home'])
      this.toast.warning("Normal users are not allowed to visit the admin section")
    }

  }
}

