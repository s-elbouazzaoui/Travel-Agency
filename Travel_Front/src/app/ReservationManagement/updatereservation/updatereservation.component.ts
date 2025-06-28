import {AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import {Reservation} from '../../Models/Reservation.model';
import {Offre} from '../../Models/Offre.model';
import {Destination} from '../../Models/Destination.model';
import {OffreServiceService} from '../../Services/AdminServices/offre-service.service';
import {ActivatedRoute, RouterLink,Router} from '@angular/router';
import {DestinationService} from '../../Services/AdminServices/destination.service';
import {ToastrService} from 'ngx-toastr';
import {ReservationService} from '../../Services/AdminServices/reservation.service';
import {EntityRef} from '../../Models/EntityRef';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-updatereservation',
  imports: [
    FormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './updatereservation.component.html',
  styleUrl: './updatereservation.component.scss'
})
export class UpdatereservationComponent implements OnInit {

  reservation: Reservation = new Reservation()
  offres: Offre[] = [];
  destinationId!: number
  resID!:number;
  userId: any;
  destination: Destination = new Destination()
  selectedOffer: Offre = new Offre()
  selectedOffre: number | null = null;

  selectedOffreId: number | null = null;

  constructor(private offreService: OffreServiceService, private route: ActivatedRoute, private destinationService: DestinationService,
              private toast: ToastrService, private resService: ReservationService,private router :Router) {
  }


  loadOffers(id: number) {
    this.offreService.getOffresByDestinationId(id).subscribe({
      next: (data) => {
        this.offres = data
      }
    })
  }


  loadDestination(id: number) {
    this.destinationService.getDestinationById(id).subscribe({
      next: (data) => {
        this.destination = data
        // this.reservation.montant = data.prix
      }
    })
  }

  calcul(){
    this.reservation.montant = this.destination.prix * this.reservation.nombrePlace;
    console.log('Updated Montant without offer:', this.reservation.montant);
  }



  loadReservation(id: number) {
    this.resService.getResById(id).subscribe({
      next: data => {
        this.reservation = data;
        // stash the incoming offer ID for the <select>
        this.reservation.montant = data.montant
        this.selectedOffre = data.offre?.id ?? null;



        // now load the offers for that destination
        this.destinationId = data.destination.id;
        this.loadDestination(this.destinationId)
        this.loadOffers(this.destinationId);
      }
    });
  }

  // loadReservation(id: number) {
  //   this.resService.getResById(id).subscribe({
  //     next: (data) => {
  //       this.reservation = data;
  //       this.reservation.montant = data.montant
  //       this.destinationId = data.destination.id
  //       console.log("des id : " + this.destinationId)
  //       this.loadOffers(this.destinationId)
  //       this.loadDestination(this.destinationId)
  //       if (data.offre?.id) {
  //         this.reservation.montant = data.montant;
  //         console.log("montant is : "+ this.reservation.montant);
  //           console.log("we have the offre id here : "+data.offre?.id )
  //           console.log("Montant is  : "+data.montant )
  //
  //       this.selectedOffre = data.offre.id;
  //
  //           /** here i need to find a way in order to put the id of the
  //            * role in the reservation.role.id so it will be displayed in the select option*/
  //       this.reservation.montant = data.montant;
  //
  //       }
  //       else
  //         this.reservation.montant = data.montant
  //         this.selectedOffre = null
  //     }
  //
  //   })
  //
  // }


  updateReservation(form: any) {
    const offre = this.getSelectedOffreObject()
    if (!form.valid) {
      this.toast.error("Please fill all the required fields")
    } else if (!offre) {

      this.reservation.offre = null;
      console.log("the res dest id : " + this.reservation.destination.id)
      console.log("the res user id : " + this.reservation.user.id)
      console.log("the res date : " + this.reservation.dateReservation)

      this.resService.updateRes(this.reservation,this.resID).subscribe({
        next: () => {
          this.toast.success("reservation updated")
          this.router.navigate(['/mesreservations'])
        },
        error: (err) => {
          this.toast.error("error while bookin")
        }
      })

    } else if (offre) {
      if (offre?.nombrePlace < this.reservation.nombrePlace) {
        this.toast.error("Please check the places number")
        console.log(this.reservation.dateReservation);
      } else {

        this.reservation.offre = new EntityRef();
        this.reservation.offre.id = offre.id

        console.log("the res sent : " + this.reservation)
        this.resService.updateRes(this.reservation,this.resID).subscribe({
          next: () => {
            this.toast.success("reservation updated")
            this.router.navigate(['/mesreservations'])
          },
          error: (err) => {
            this.toast.error("error while booking")
          }
        })
      }
    }


  }

  ngOnInit() {
    this.resID = this.route.snapshot.params['id'];
    this.loadReservation(this.resID)
    // this.userId = sessionStorage.getItem('userId')
    console.log("des id ngoninit   : " + this.destinationId)


    // Initialize reservation.user, reservation.offre, and reservation.destination as EntityRef
    this.reservation.user = new EntityRef();  // Initialize user as an EntityRef
    this.reservation.offre = new EntityRef();  // Initialize offer as an EntityRef


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
      this.reservation.montant = (this.destination.prix * this.reservation.nombrePlace) * (1 - discount);
      console.log('Updated Montant with offer:', this.reservation.montant);
    } else {
      // If no offer is selected, use the base destination price
      this.reservation.montant = this.destination.prix * this.reservation.nombrePlace;
      console.log('Updated Montant without offer:', this.reservation.montant);
    }
  }

  getSelectedOffreObject() {
    return this.offres.find(o => o.id == this.selectedOffre);

  }

  test() {
    const test = this.getSelectedOffreObject();
    if (test) {
      console.log(test.id);
      console.log(test.pourcentage)
    }
  }

}
