import { Component, OnInit } from '@angular/core';
import {cellEnum} from '../cell/cellEnum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  private currentplayer:cellEnum;
  public board:cellEnum[][];
  private isGameOver:boolean;
  public statusMessage;


  constructor() { }

  ngOnInit() {
    this.newGame();
  }
  get gameover():boolean{
    return this.isGameOver;
  }
newGame(){
this.board=[];
for(let row=0;row<3;row++){
  this.board[row]=[];
  for(let col=0;col<3;col++){
    this.board[row][col]=cellEnum.EMPTY;

  }
}
this.currentplayer=cellEnum.X;
this.isGameOver=false;
this.statusMessage = `It's ${this.currentplayer}'s player turn`;

}
move(row:number,col:number):void{
  if(!this.isGameOver && this.board[row][col] === cellEnum.EMPTY){
    this.board[row][col]=this.currentplayer;
    if(this.isDraw()){
      this.statusMessage = "It's a Draw";
      this.isGameOver=true;

    }
    else if(this.isWin()){
      this.statusMessage=`player ${this.currentplayer} has won the game`;
      this.isGameOver=true;

    }
    else{
      this.currentplayer=this.currentplayer === cellEnum.X ? cellEnum.O :cellEnum.X;

    }
  }
}
isDraw(): boolean{
  for(const column of this.board){
    for(const col of column){
      if(col === cellEnum.EMPTY){
        return false;
      }
    }
  }
  return !this.isWin();
}
isWin():boolean{
  //horizon
  for(const column of this.board){
    if(column[0] === column[1] && column[0]===column[2] && column[0]!== cellEnum.EMPTY){
      return true;
    }
  }
  //vertical
  for(let col=0;col<this.board[0].length;col++){
    if(
      this.board[0][col] === this.board[1][col] &&
      this.board[0][col] === this.board[2][col] &&
      this.board[0][col] !== cellEnum.EMPTY
    ){
      return true;
    }
  }
  //diagnol
  if(
    this.board[0][0] === this.board[1][2] &&
    this.board[0][0] === this.board[2][2] &&
    this.board[0][0] !== cellEnum.EMPTY
  ){
    return true;
  }
  if(
    this.board[0][2] === this.board[1][1] &&
    this.board[0][2] === this.board[2][2] &&
    this.board[0][2] !== cellEnum.EMPTY
  ){
    return true;
  }
  return false;

}
}
