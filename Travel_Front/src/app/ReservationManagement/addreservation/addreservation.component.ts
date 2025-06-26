import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BsDatepickerConfig, BsDatepickerDirective, BsDatepickerInputDirective} from "ngx-bootstrap/datepicker";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink,Router} from "@angular/router";
import {Reservation} from '../../Models/Reservation.model';
import {Offre} from '../../Models/Offre.model';
import {OffreServiceService} from '../../Services/AdminServices/offre-service.service';
import {NgForOf} from '@angular/common';
import {DestinationService} from '../../Services/AdminServices/destination.service';
import {Destination} from '../../Models/Destination.model';
import {ToastrService} from 'ngx-toastr';
import {ReservationService} from '../../Services/AdminServices/reservation.service';
import {EntityRef} from '../../Models/EntityRef';

@Component({
  selector: 'app-addreservation',
  imports: [

    FormsModule,
    RouterLink,
    NgForOf
  ],
  templateUrl: './addreservation.component.html',
  styleUrl: './addreservation.component.scss'
})
export class AddreservationComponent implements OnInit,OnChanges{

  reservation:Reservation = new Reservation()
  offres:Offre[]=[];
  destinationId!:number
  userId:any;
  destination:Destination = new Destination()
  //selectedOffer: Offre = new Offre()
  selectedOffre!:number |null ;

  constructor(private offreService : OffreServiceService,private route:ActivatedRoute,private destinationService : DestinationService,
              private toast:ToastrService,private resService:ReservationService,
              private route2 :Router) {
  }


  loadOffers(id:number){
    this.offreService.getOffresByDestinationId(id).subscribe({
      next:(data)=>{
        this.offres=data
      }
    })
  }

  // getOffre(id:number){
  //   this.offreService.getOffreById(id).subscribe({
  //     next:(data)=>{
  //       this.selectedOffer = data
  //     }
  //   })
  // }

  loadDestination(id:number){
    this.destinationService.getDestinationById(id).subscribe({
      next:(data)=>{
        this.destination = data
        this.reservation.montant = data.prix
      }
    })
  }



  addReservation(form:any){
    const offre = this.getSelectedOffreObject()
    if(!form.valid){
      this.toast.error("Please fill all the required fields")
    }
    else if(!offre){
      this.reservation.user.id=this.userId
      this.reservation.destination.id = this.destinationId
      this.reservation.offre=null;
      console.log("the res dest id : " +this.reservation.destination.id)
      console.log("the res user id : " +this.reservation.user.id)
      console.log("the res date : " +this.reservation.dateReservation)

      this.resService.addRes(this.reservation).subscribe({
        next:()=>{
          this.toast.success("reservation added")
          this.route2.navigate(['/mesreservations'])
        },
        error:(err)=>{
          this.toast.error("error while bookin")
        }
      })

    }
    else if(offre) {
      if (offre?.nombrePlace < this.reservation.nombrePlace) {
        this.toast.error("Please check the places number")
        console.log(this.reservation.dateReservation);
      }
      else{
        this.reservation.user.id=this.userId
        this.reservation.offre = new EntityRef();
        this.reservation.offre.id=offre.id
        this.reservation.destination.id = this.destinationId
        console.log("the res sent : " +this.reservation)
        this.resService.addRes(this.reservation).subscribe({
          next:()=>{
            this.toast.success("reservation added")
            this.route2.navigate(['/mesreservations'])
          },
          error:(err)=>{
            this.toast.error("error while booking")
          }
        })
      }
    }


  }

    ngOnInit(){
      this.destinationId = this.route.snapshot.params['id'];
      this.userId = sessionStorage.getItem('userId')
      console.log("dest "+this.destinationId)
      console.log("user "+this.userId)
      this.loadOffers(this.destinationId)
      this.loadDestination(this.destinationId)

      // Initialize reservation.user, reservation.offre, and reservation.destination as EntityRef
      this.reservation.user = new EntityRef();  // Initialize user as an EntityRef
      this.reservation.offre = new EntityRef();  // Initialize offer as an EntityRef
      this.reservation.destination = new EntityRef();


  }


  // onOfferSelect() {
  //   const actualOffre = this.getSelectedOffreObject();
  //
  //    // Get the selected offer id
  //
  //   console.log('Selected offer ID:', actualOffre?.id);
  //
  //
  //
  //
  //
  //   if (actualOffre) {
  //     // Perform the calculation based on the selected offer
  //     const discount = actualOffre.pourcentage / 100;
  //     this.reservation.montant = this.destination.prix * (1 - discount);
  //     console.log('Updated Montant: ', this.reservation.montant);
  //   } else {
  //     console.log('No offer selected or invalid offer');
  //   }
  // }

  onOfferSelect() {
    const selectedOffer = this.getSelectedOffreObject();  // Get the full offer object

    if (selectedOffer) {
      // If an offer is selected, apply the discount to the montant
      const discount = selectedOffer.pourcentage / 100;
      this.reservation.montant = (this.destination.prix *this.reservation.nombrePlace ) * (1 - discount);
      console.log('Updated Montant with offer:', this.reservation.montant);
    } else {
      // If no offer is selected, use the base destination price
      this.reservation.montant = this.destination.prix *this.reservation.nombrePlace;
      console.log('Updated Montant without offer:', this.reservation.montant);
    }
  }

  getSelectedOffreObject() {
    return this.offres.find(o => o.id == this.selectedOffre);

  }

  test(){
    const test = this.getSelectedOffreObject();
    if(test){
      console.log(test.id);
      console.log(test.pourcentage)
    }
  }



  calcul(){
    this.reservation.montant = this.destination.prix * this.reservation.nombrePlace;
    console.log('Updated Montant without offer:', this.reservation.montant);
  }


  ngOnChanges(changes: SimpleChanges) {
  }

}
