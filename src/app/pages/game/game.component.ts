import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
import { Ship } from '../../shared/ship';
import { ShipService } from '../../shared/ship.service';
import { Ammo } from 'src/app/shared/ammo';
import { GameService } from 'src/app/shared/game.service';
import { Enemy } from 'src/app/shared/enemy';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {
  ammo : Ammo 
  ammos : Set<Ammo> = this.gameService.ammos;
  ship : Ship = this.gameService.ship;
  enemies : Set<Enemy> = this.gameService.enemies;

  
//game frame  
  @ViewChild('gameContainerElt', {static: false}) gameContainerElt: ElementRef;
  sizeGameContainer : number;
  widthTotal : number;
  heightTotal : number;
  

  // Ammo position
  ammoPosX = this.ship.posX + 18;
  ammoPosY = this.ship.posY - 10;
  currentPosition = this.ammoPosY;
  


  constructor(
    public shipService: ShipService,
    public gameService: GameService
    ) { 
     
    }
    
  ngOnInit() {
    
    
  }
//Get the game mensurations
  ngAfterViewInit() {
    this.sizeGameContainer = this.gameContainerElt.nativeElement.clientWidth;
    this.widthTotal = window.innerWidth;
    this.heightTotal = window.innerHeight;
    this.gameService.maxShipX = this.gameContainerElt.nativeElement.clientWidth;

    // ennemy creation
   setInterval(()=>{
      this.gameService.addEnemy(this.getMinContainerLimitX(), this.getMaxContainerLimitX())},1000)
    
  }
  
  getMaxContainerLimitX(){
    return this.gameService.setMaxShipX(this.widthTotal, this.sizeGameContainer);
  }
  getMinContainerLimitX(){
    return this.gameService.setMinShipX(this.widthTotal);
  }
  getMinContainerLimitY(){
    return this.gameService.setMaxShipY(this.heightTotal);
  }


//Get the keyborad key
  @HostListener('document:keydown', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
      //space (shoot)
    if (event.code === 'Space') {
      this.gameService.addAmmo();
    }  
    
     // arrows (direction)
    if (event.code === 'ArrowRight' && this.ship.posX < this.gameService.setMaxShipX(this.widthTotal, this.sizeGameContainer) ) {
      this.ship.posX = this.ship.posX + 10;    
    }
    if (event.code === 'ArrowLeft' && this.ship.posX > this.gameService.setMinShipX(this.widthTotal)) {
      this.ship.posX = this.ship.posX - 10;
    }
    if (event.code === 'ArrowDown' && this.ship.posY < this.gameService.setMaxShipY(this.heightTotal)) {
      this.ship.posY = this.ship.posY + 10;    
    }
    if (event.code === 'ArrowUp' && this.ship.posY > this.gameService.setMinShipY()) {
      this.ship.posY = this.ship.posY - 10;
    }
      

     // C (change type)
    if (event.code === 'KeyC' && this.ship.backgroundColor === "red"){
      this.ship.backgroundColor = "white";
      return;
    }
    if (event.code === 'KeyC' && this.ship.backgroundColor === "white"){
      this.ship.backgroundColor = "brown";
      return;
    }
    if (event.code === 'KeyC'&& this.ship.backgroundColor === "brown"){
      this.ship.backgroundColor = "blue";
      return;
    }
    if (event.code === 'KeyC'&& this.ship.backgroundColor === "blue"){
      this.ship.backgroundColor = "red";
      return;
    }      
  } 


}
