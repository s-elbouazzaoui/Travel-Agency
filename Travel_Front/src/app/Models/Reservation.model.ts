import "./EntityRef"
import {EntityRef} from './EntityRef';

export class Reservation{
   id!:number;
   dateReservation!:string;
   status!:string;
   montant!:number;
   nombrePlace!:number;
   dateModification!:string;
   user!:EntityRef;
   destination!:EntityRef;
   offre!:EntityRef;

}
