import {EntityRef} from './EntityRef';
export class User{
  id!:number;
  name!:string;
  email!:string;
  password!:string
  role!:EntityRef;
  created!:Date;


}
