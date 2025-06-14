import "./EntityRef"
import {EntityRef} from './EntityRef';


export class Offre{
   id!:number;
   libelle!:string;
   description!:string;
   dateDebut!:Date;
   dateFin!:Date;
   pourcentage!:number;
   nombrePlace!:number;
   destination!:EntityRef;

}
