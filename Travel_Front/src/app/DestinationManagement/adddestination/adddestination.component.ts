import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Destination} from '../../Models/Destination.model';
import {Router, RouterLink} from '@angular/router';
import {BsDatepickerConfig, BsDatepickerDirective, BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ToastrService} from 'ngx-toastr';
import {DestinationService} from '../../Services/AdminServices/destination.service';



@Component({
  selector: 'app-adddestination',
  imports: [
    FormsModule,
    BsDatepickerDirective,
    BsDatepickerModule,
    RouterLink


  ],
  templateUrl: './adddestination.component.html',
  styleUrl: './adddestination.component.scss'
})
export class AdddestinationComponent implements OnInit {
  destination: Destination = new Destination();
  selectedFile: File | null = null;
  img: File | null = null;

  dateFormat: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'DD/MM/YYYY'
  };





  constructor(private router: Router,private toast:ToastrService,private destinationService:DestinationService
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


  addDestination(form: any) {
    if(!form.valid){
      this.toast.warning("Please fill all the required fiels","",{toastClass:'fields-warning'})
    }
    else if (form.valid ) {
      const defaultImgPath = 'assets/default.png'; // Path to the default image
      let imgFile: File | null = this.img;

      if (!this.img) {
        // Fetch the default image file
        fetch(defaultImgPath)
          .then(response => response.blob())
          .then(blob => {
            imgFile = new File([blob], 'default.png', { type: blob.type });
            this.destinationService.addDestination(this.destination, imgFile).subscribe(
              response => {
                this.toast.success("destination added successfully");
                this.router.navigate(['/destinations']);
              },
              error => {
                this.toast.error('Error adding destination', error);
              }
            );
          })
          .catch(error => {
            this.toast.error('Error loading default image', error);
          });
      } else {
        this.destinationService.addDestination(this.destination, this.img).subscribe(
          response => {
            this.toast.success("Product added successfully");
            this.router.navigate(['/destinations']);
          },
          error => {
            this.toast.error('Error adding destination', error);
          }
        );
      }
    } else {
      console.error('Please ensure all fields are valid');
      this.toast.warning("Please fill all the required fields");
    }
  }



  ngOnInit(): void {

  }
}
