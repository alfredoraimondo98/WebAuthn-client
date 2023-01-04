import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  urlServer : string = 'http://localhost:3000'
  urlLocalServer : string = 'http://localhost:9990'
  
  user : User = {}

}