import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {UserSideBarComponent} from '../../../lib/user-side-bar/user-side-bar.component';
import {User} from '../../Models/User.model';
import {ToastrService} from 'ngx-toastr';
import {UserserviceAdminService} from '../../Services/AdminServices/userservice-admin.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-account',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UserSideBarComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{


  userid:any;
  user:User = new User();
  isUser:boolean=false;
  passConfirm !:string;
  roleId:any
  showModal = false;
  modalRef?: BsModalRef
  contentMove=false

  constructor(private route:ActivatedRoute,
              private router : Router,
              private toast:ToastrService,
              private userService:UserserviceAdminService,
              private modalService: BsModalService,
  ){}

  loadUserInfo(id:number):void{
    this.userService.getSingleUser(id).subscribe({
      next :(data:User)=>{
        this.user = data;
        this.isUser = this.user.role.id != 2;
        this.passConfirm=this.user.password

      },
      error :(err)=>{
        console.log("ERROR WHILE FETCHING DATA")
      }
    })
  }



  updateUser(form :NgForm){
    if(!form.valid){
      this.toast.warning("Please fill all the Fields and try again","",{toastClass:'ngx-toastr shake-toast login-warning'});
    }
    else{
      if(!this.confirmPassword())
        return;
      else{

        this.userService.updateUser(this.user,this.userid).subscribe({
          next :()=>{
            this.toast.success("User Updated successfully");
            this.closeModal();
          },
          error:(err)=>{
            this.toast.error("Error while inserting the user");

          }
        })
      }
    }

  }


  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
    this.toast.info("the red * marks a required fields","",{
      toastClass:'fields-warning'
    })
  }

  openDeleteModal(template: any) {
    this.modalRef = this.modalService.show(template);
    this.toast.error("this action is irreversible","",{
      toastClass:'fields-warning'
    })
  }



  // Closes the modal without saving
  closeModal(): void {
    this.modalRef?.hide();
  }

  confirmAction() {
    this.userService.deleteUser(this.userid).subscribe({
      next:()=>{
        this.toast.success("Deleted successfully","Your account has been deleted with all your data");
        this.router.navigate([''])
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



  confirmPassword(){
    const pass = (document.getElementById("passwordId") as HTMLInputElement).value;
    const confirm = (document.getElementById("confirmId") as HTMLInputElement).value
    if(pass!=confirm){
      this.toast.warning("The passwords are not matching","",{toastClass:'ngx-toastr shake-toast login-warning'})
      return false;
    }
    return true;
  }







  ngOnInit(): void {

    this.userid = sessionStorage.getItem('userId')
    this.loadUserInfo(this.userid)
  }


}
