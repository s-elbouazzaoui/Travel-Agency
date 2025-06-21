import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserslistComponent} from './UserManagement/userslist/userslist.component';
import {AdduserComponent} from './UserManagement/adduser/adduser.component';
import {UpdateUserComponent} from './UserManagement/update-user/update-user.component';
import {RoleslistComponent} from './RoleManagement/roleslist/roleslist.component';
import {AddroleComponent} from './RoleManagement/addrole/addrole.component';
import {UpdateroleComponent} from './RoleManagement/updaterole/updaterole.component';
import {LoginComponent} from './login/login.component';
import {AdddestinationComponent} from './DestinationManagement/adddestination/adddestination.component';
import {DestinationlistComponent} from './DestinationManagement/destinationlist/destinationlist.component';
import {
  DestinationlistAdminComponent
} from './DestinationManagement/destinationlist-admin/destinationlist-admin.component';
import {UpdatedestinationComponent} from './DestinationManagement/updatedestination/updatedestination.component';
import {AddoffreComponent} from './OffersManagement/addoffre/addoffre.component';
import {OffrelistComponent} from './OffersManagement/offrelist/offrelist.component';
import {AuthGuard} from './Services/AuthGuard/AuthGuard';
import {AddreservationComponent} from './ReservationManagement/addreservation/addreservation.component';
import {ReservationlistComponent} from './ReservationManagement/reservationlist/reservationlist.component';
import {UpdatereservationComponent} from './ReservationManagement/updatereservation/updatereservation.component';
import {ReservationAdminComponent} from './ReservationManagement/reservation-admin/reservation-admin.component';
import {RegistrationComponent} from './registration/registration.component';
import {UpdateoffreComponent} from './OffersManagement/updateoffre/updateoffre.component';
import {AccountComponent} from './UserManagement/account/account.component';

export const routes: Routes = [
  {
    path:'home',component:HomeComponent
  },
  {path:'',component:LoginComponent},
  {path:'adduser',component:AdduserComponent,canActivate: [AuthGuard]},
  {path:'users',component:UserslistComponent,canActivate: [AuthGuard]},
  {path:'update-user/:id',component:UpdateUserComponent,canActivate: [AuthGuard]},
  {path:'roles',component:RoleslistComponent,canActivate: [AuthGuard]},
  {path:'addrole',component:AddroleComponent,canActivate: [AuthGuard]},
  {path:'updaterole/:id',component:UpdateroleComponent,canActivate: [AuthGuard]},
  {path:'adddestination',component:AdddestinationComponent,canActivate: [AuthGuard]},
  {path:'destinations',component:DestinationlistComponent,canActivate: [AuthGuard]},
  {path:'destinations-admin',component:DestinationlistAdminComponent,canActivate: [AuthGuard]},
  {path:'update-destination/:id',component:UpdatedestinationComponent,canActivate: [AuthGuard]},
  {path:'addoffre/:id',component:AddoffreComponent,canActivate: [AuthGuard]},
  {path:'updateoffre/:id',component:UpdateoffreComponent},
  {path:'offres',component:OffrelistComponent,canActivate: [AuthGuard]},
  {path:'addreservation/:id',component:AddreservationComponent},
  {path:'mesreservations',component:ReservationlistComponent},
  {path:'update-reservation/:id',component:UpdatereservationComponent},
  {path:'reservations',component:ReservationAdminComponent,canActivate:[AuthGuard]},
  {path:'registration',component:RegistrationComponent},
  {path:'account',component:AccountComponent}

];
