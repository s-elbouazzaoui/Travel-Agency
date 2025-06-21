// auth.guard.ts
import { Injectable }     from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {UserserviceAdminService} from '../AdminServices/userservice-admin.service';
import {ToastrService} from 'ngx-toastr';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: UserserviceAdminService,
    private router: Router,
    private toast : ToastrService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {
    if (this.auth.userId !== null ) {
      return true;
    }
    this.router.navigate(['']);
    this.toast.info("Please log in with your credentials to proceed")
    return false;
  }
}
