import { Injectable } from '@angular/core';
import { Ship } from './ship';
import { SHIPS } from './mock-ships';

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  ships: Ship[] = SHIPS;
  choosenShip : Ship;

  constructor() { }

  setChoosenShip(ship: Ship)
  {
    if (this.choosenShip) {
      this.choosenShip.size = '100px';
    }
    this.choosenShip = ship;
    this.choosenShip.size = '150px';
    return this.choosenShip;
  }
}