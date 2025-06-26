import {Component, OnInit} from '@angular/core';
import {BsDatepickerConfig, BsDatepickerDirective, BsDatepickerInputDirective} from "ngx-bootstrap/datepicker";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink,Router} from "@angular/router";
import {Offre} from '../../Models/Offre.model';
import {ToastrService} from 'ngx-toastr';
import {OffreServiceService} from '../../Services/AdminServices/offre-service.service';
import {Destination} from '../../Models/Destination.model';

@Component({
  selector: 'app-updateoffre',
    imports: [
        BsDatepickerDirective,
        BsDatepickerInputDirective,
        FormsModule,
        RouterLink
    ],
  templateUrl: './updateoffre.component.html',
  styleUrl: './updateoffre.component.scss'
})
export class UpdateoffreComponent implements OnInit {


  offre: Offre = new Offre();
  desId!: number
  offreId!:number

  dateFormat: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'DD/MM/YYYY'
  };

  constructor(private toast: ToastrService, private offreService: OffreServiceService, private router: ActivatedRoute, private route : Router) {
  }

  loadOffre(id:number){
    this.offreService.getOffreById(id).subscribe({
      next:(data)=>{
        this.offre = data
        this.offre.dateDebut = new Date(data.dateDebut)
        this.offre.dateFin = new Date(data.dateFin)
      }
    })
  }


  updateOffre(form: any) {
    if (!form.valid) {
      this.toast.warning("Please fill all the required area to proceed")
    } else {
      this.offreService.updateOffre(this.offre,this.offreId).subscribe({
        next: () => {
          this.toast.success("Offer updated successfully")
          this.route.navigate(['/offres'])
        }
      })
      console.log("type of date:" + this.offre.dateDebut)

    }

  }

  ngOnInit() {
    this.offreId = this.router.snapshot.params['id']
    this.loadOffre(this.offreId);
  }
}
