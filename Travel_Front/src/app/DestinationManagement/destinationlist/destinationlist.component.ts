import {Component, OnInit} from '@angular/core';
import {Destination} from '../../Models/Destination.model';
import {ButtonBookingComponent} from '../../../lib/button-booking/button-booking.component';
import {NgForOf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DestinationService} from '../../Services/AdminServices/destination.service';
import {SidenavComponent} from '../../../lib/sidenav/sidenav.component';
import {FilterPipe} from '../../Filter/filter.pipe';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-destinationlist',
  imports: [
    NgForOf,
    ButtonBookingComponent,

    SidenavComponent,
    FilterPipe,
    FormsModule

  ],
  templateUrl: './destinationlist.component.html',
  styleUrl: './destinationlist.component.scss'
})
export class DestinationlistComponent implements OnInit{
  destinations :Destination[]=[];
  public contentMove:boolean=false  ;
  searchtext:any;
  filteredDestinations: any[] = [];

  constructor(private router:Router,private toast:ToastrService,private destinationService:DestinationService) {
  }

  loadDestination(){
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


    ngOnInit() {
    this.loadDestination()
  }

}
