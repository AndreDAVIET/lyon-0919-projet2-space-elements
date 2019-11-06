import { Injectable } from '@angular/core';
import { Ammo } from './ammo';
import { Ship } from './ship';
import { Enemy} from 'src/app/shared/enemy';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
 
  enemies : Set<Enemy> = new Set<Enemy>();
  ammos : Set<Ammo> = new Set<Ammo>();
  types : string[] = ['fire','water','air','earth'];
  isShoot: boolean = false;
  mvLeft: boolean = false;
  mvRight: boolean = false;
  mvUp: boolean = false;
  mvDown: boolean = false;
  mvUpRight: boolean = false;
  mvUpLeft: boolean = false;
  mvDownRight: boolean = false;
  mvDownLeft: boolean = false;

  shipTypes : Object[] = [
    {'name' : 'fire', 'url' : '../../../assets/img/ship_fire.png'},
    {'name': 'air', 'url' : '../../../assets/img/ship_air.png'},
    {'name': 'earth', 'url' : '../../../assets/img/ship_earth.png'},
    {'name' : 'water', 'url' : '../../../assets/img/ship_water.png'},
    ];
  enemyTypes : Object[] = [
    {'name' : 'fire', 'url' :[ '../../../assets/img/enemy_fire.png']},
    {'name': 'air', 'url' : '../../../assets/img/enemy_air.png'},
    {'name': 'earth', 'url' : '../../../assets/img/enemy_earth.png'},
    {'name' : 'water', 'url' : '../../../assets/img/enemy_water.png'},
    ];
  ammoTypes : Object[] = [
    {'name' : 'fire', 'url' : '../../../assets/img/ammo_fire.png'},
    {'name': 'air', 'url' : '../../../assets/img/ammo_air.png'},
    {'name': 'earth', 'url' : '../../../assets/img/ammo_earth.png'},
    {'name' : 'water', 'url' : '../../../assets/img/ammo_water.png'},
    ];
  
  enemyHP : Object [] = [
    {'HP' : 3, 'url' : '../../../assets/img/ammo_fire.png'},
  ]  

  ship : Ship = {
    id : 0,
    url : '',
    posX: 0,
    posY: 880,
    height : 60,
    width : 40,
    size : 0,
    HP: 100,
    type: this.shipTypes[0],
  };
  game : Game = new Game;
  enemykill = 0;

  
  constructor() {
    // multi actions
    setInterval(() => {
      if (this.isShoot) {
        this.addAmmo();
      }
    }, 120);

    // mouvement
    setInterval(() => {
      if (this.mvRight && this.ship.posX < this.game.maxX - this.ship.width/2 - 10 ) {
        this.ship.posX = this.ship.posX + 10;
      }
      if (this.mvLeft && this.ship.posX > this.game.minX + 10) {
        this.ship.posX = this.ship.posX - 10;
      }
      if (this.mvUp && this.ship.posY > 0) {
        this.ship.posY = this.ship.posY - 10;
      }
      if (this.mvDown && this.ship.posY < this.game.maxY - this.ship.height) {
        this.ship.posY = this.ship.posY + 10;
      }
    }, 50);

     //function dead
    

    // Ammo moving and killing enemy
    setInterval(() => {
      for (let ammo of this.ammos) {
            this.moveAmmo(ammo);
        for (let enemy of this.enemies){
          if((ammo.posX > enemy.posX) && (ammo.posX < enemy.posX + enemy.width)){
            if(ammo.posY < enemy.posY + enemy.height){
              //
              if(ammo.type = this.enemyTypes[0]){
                switch(enemy.type){
                  case this.enemyTypes[1]:
                    enemy.HP -= 3;
                    break;
                  case this.enemyTypes[2]:
                    enemy.HP -= 2;
                    break;
                  case this.enemyTypes[3]:
                    enemy.HP -= 1;
                    break;
                }
                if(enemy.HP<=0){
                  this.enemies.delete(enemy);
                }
              }

              this.enemykill = this.enemykill + 1;
              this.ammos.delete(ammo);
              return;
            }
          }
          if(ammo.posX + ammo.width > enemy.posX && ammo.posX + ammo.width < enemy.posX + enemy.width){
            if(ammo.posY < enemy.posY + enemy.height){
              this.enemies.delete(enemy);
              this.enemykill = this.enemykill + 1;
              this.ammos.delete(ammo);
            }
          }
        }
      }
    }, 100);

 
    // Enemy moving down and colision of the ship with enemy
    setInterval(() => {
      for (let enemy of this.enemies) {
        this.moveEnemy(enemy);
          if ( this.ship.posX < enemy.posX + enemy.width && this.ship.posX > enemy.posX){
            if ( this.ship.posY < enemy.posY + enemy.height && this.ship.posY > enemy.posY){
              this.enemies.delete(enemy);
              this.enemykill = this.enemykill + 1;
            }  
          }
          if ( this.ship.posX + this.ship.width < enemy.posX + enemy.width && this.ship.posX + this.ship.width> enemy.posX){
            if ( this.ship.posY < enemy.posY + enemy.height && this.ship.posY > enemy.posY){
              this.enemies.delete(enemy);
              this.enemykill = this.enemykill + 1;
            }  
          }
          if ( this.ship.posY + this.ship.height < enemy.posY + enemy.height && this.ship.posY + this.ship.height > enemy.posY ){
            if ( this.ship.posX < enemy.posX + enemy.width && this.ship.posX > enemy.posX){
              this.enemies.delete(enemy);
              this.enemykill = this.enemykill + 1;
            }
          }
          if ( this.ship.posY + this.ship.height < enemy.posY + enemy.height && this.ship.posY + this.ship.height > enemy.posY ){
            if ( this.ship.posX + this.ship.width < enemy.posX + enemy.width && this.ship.posX  + this.ship.width > enemy.posX){
              this.enemies.delete(enemy);
              this.enemykill = this.enemykill + 1;
            }
          }    
      }
    }, 200);

  }

  //Function random
  randomNumber(min : number, max : number) {  
    return Math.floor(Math.random() * (max - min)+min);
  }

  
  //Functions to define the container size
  setMaxX(widthTotal, sizeGameContainer){
    this.game.maxX = (widthTotal*0.1) + sizeGameContainer;
    return this.game.maxX;
  }
  setMinX(widthTotal){
    this.game.minX = (widthTotal*0.1);
    return this.game.minX;
  }
  setMaxY(heightTotal){
    this.game.maxY = (heightTotal);
    return this.game.maxY;
  }
  setMinY(){
    this.game.minY = 0;
    return this.game.minY;
  }

  //Position of the ship
  setShipX(widthTotal){
    this.ship.posX = widthTotal/2;
  }
  setShipY(heightTotal){
    this.ship.posY = heightTotal - this.ship.height;
  }

  //Ammo addition and move
  addAmmo() {
    let ammo : Ammo;
    switch(this.ship.type){
      case this.shipTypes[0] :
          ammo = new Ammo(this.ammoTypes[0], this.ship.posX + 18, this.ship.posY - 10);
          break;
      case this.shipTypes[1] :
          ammo = new Ammo(this.ammoTypes[1], this.ship.posX + 18, this.ship.posY - 10);
          break;
     case this.shipTypes[2] :
          ammo = new Ammo(this.ammoTypes[2], this.ship.posX + 18, this.ship.posY - 10);
          break;
     case this.shipTypes[3] :
          ammo = new Ammo(this.ammoTypes[3], this.ship.posX + 18, this.ship.posY - 10);
          break;
    }
      return this.ammos.add(ammo);
    
  }
  
  moveAmmo(ammo: Ammo) : void {
    ammo.posY = ammo.posY - 15;
    if (ammo) {
      if (ammo.posY < 0) {
        this.ammos.delete(ammo);
      }
      else {
        ammo.posY = ammo.posY - 5;
      }
    }
  }

  
  //Enemy addition and move
  addEnemy(){
   
    let enemyX = this.randomNumber(this.game.minX+60, this.game.maxX);
  
    let enemy = new Enemy(this.enemyTypes[this.randomNumber(0,4)], enemyX-60 , -20);
    this.enemies.add(enemy);
    
    
  }

  moveEnemy(enemy:Enemy){
    if (enemy) {
      if (enemy.posY>this.game.maxY - enemy.height*2) {
        this.enemies.delete(enemy);
      }
      else {
        enemy.posY = enemy.posY + 5;
      }
    }
  }
}


