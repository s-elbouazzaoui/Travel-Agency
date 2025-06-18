import {Component, OnInit} from '@angular/core';
import {BsDatepickerConfig, BsDatepickerDirective, BsDatepickerInputDirective} from "ngx-bootstrap/datepicker";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Destination} from '../../Models/Destination.model';
import {ToastrService} from 'ngx-toastr';
import {DestinationService} from '../../Services/AdminServices/destination.service';

@Component({
  selector: 'app-updatedestination',
  imports: [
    BsDatepickerDirective,
    BsDatepickerInputDirective,
    FormsModule,
    RouterLink
  ],
  templateUrl: './updatedestination.component.html',
  styleUrl: './updatedestination.component.scss'
})
export class UpdatedestinationComponent implements OnInit {
  destination: Destination = new Destination();
  selectedFile: File | null = null;
  img: File | null = null;
  desId!:number;
  dateFormat: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'DD/MM/YYYY'
  };





  constructor(private router: Router,private toast:ToastrService,private destinationService:DestinationService,
              private route:ActivatedRoute
  ) {

  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];
    } else {
      this.selectedFile = null;
    }
  }


  validateFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/JPG'];
      if (!validTypes.includes(file.type)) {
        this.toast.warning('Please upload a valid image file (PNG, JPG, or JPEG)');
        event.target.value = ''; // Clear the input if the file is invalid
      } else {
        this.img = file;
        console.log('File selected:', this.img); // Debugging line
      }
    }
  }


  updateDestination(form: any) {
    if(!form.valid){
      this.toast.warning("Please fill all the required fiels","",{toastClass:'fields-warning'})
    }
    else if (form.valid ) {

      if (!this.img) {

            this.destinationService.updateDestinationNoImg( this.desId,this.destination).subscribe(
              response => {
                this.toast.success("destination updated successfully");
                this.router.navigate(['/destinations-admin']);
              },
              error => {
                this.toast.error('Error updating destination', error);
              }
            );
      }
      else {
        this.destinationService.updateDestination(this.desId,this.destination, this.img).subscribe(
          response => {
            this.toast.success("Destination updated successfully");
            this.router.navigate(['/destinations-admin']);
          },
          error => {
            this.toast.error('Error updating destination', error);
          }
        );
      }
    } else {
      console.error('Please ensure all fields are valid');
      this.toast.warning("Please fill all the required fields");
    }
  }

  loadDestination(id:number){
    this.destinationService.getDestinationById(id).subscribe({
      next:(data)=>{
        this.destination=data
        this.destination.dateDebut=new Date(data.dateDebut);
        this.destination.dateFin= new Date(data.dateFin);
      },
      error:(err)=>{
        this.toast.error("error while fetching data")
    }
    })
  }


  ngOnInit(): void {

    this.desId=this.route.snapshot.params['id'];
    this.loadDestination(this.desId)

  }
}
