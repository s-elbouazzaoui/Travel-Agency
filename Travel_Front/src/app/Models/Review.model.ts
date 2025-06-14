import "./EntityRef"
import {EntityRef} from './EntityRef';

export class Review{
  id!:number;
  score!:number;
  description!:string;
  user!:EntityRef;
  destination!:EntityRef;

}
