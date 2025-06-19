import {Component, OnInit} from '@angular/core';
import {BsDatepickerConfig, BsDatepickerDirective, BsDatepickerInputDirective} from "ngx-bootstrap/datepicker";
import {Form, FormsModule} from "@angular/forms";
import {Offre} from '../../Models/Offre.model';
import {ActivatedRoute, Route} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {OffreServiceService} from '../../Services/AdminServices/offre-service.service';
import {Destination} from '../../Models/Destination.model';

@Component({
  selector: 'app-addoffre',
    imports: [
        BsDatepickerDirective,
        BsDatepickerInputDirective,
        FormsModule
    ],
  templateUrl: './addoffre.component.html',
  styleUrl: './addoffre.component.scss'
})
export class AddoffreComponent implements OnInit{


  offre:Offre =new Offre();
  desId!:number

  dateFormat: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'DD/MM/YYYY'
  };
  constructor(private toast:ToastrService,private offreService:OffreServiceService,private router:ActivatedRoute) {
  }


  addOffre(form:any){
    if(!form.valid){
      this.toast.warning("Please fill all the required area to proceed")
    }
    else{
      this.offre.destination = new Destination()
      this.offre.destination.id = this.desId;
      this.offreService.addOffre(this.offre).subscribe({
        next:()=>{
          this.toast.success("Offer added successfully")
        }
      })
      console.log("type of date:" + this.offre.dateDebut)

    }

  }

  ngOnInit() {
    this.desId=this.router.snapshot.params['id'];
  }


}
