import { Component } from '@angular/core';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  person1: any;
  person2: any;
  starship1: any;
  starship2: any;
  winner: string = '';

  leftScore: number = 0; 
  rightScore: number = 0; 

  selectedResource: string = 'people'; 

  constructor(private swapiService: SwapiService) {}

  playGame() {
    if (this.selectedResource === 'people') {
      this.playPeopleGame();
    } else if (this.selectedResource === 'starships') {
      this.playStarshipGame();
    }
  }

  playPeopleGame() {
    this.swapiService.getRandomPerson().subscribe((data1) => {
      this.person1 = data1.result.properties;
      this.swapiService.getRandomPerson().subscribe((data2) => {
        this.person2 = data2.result.properties;
        this.determineWinnerPeople();
      });
    });
  }

  playStarshipGame() {
    this.swapiService.getRandomStarship().subscribe((data1) => {
      this.starship1 = data1.result.properties;
      this.swapiService.getRandomStarship().subscribe((data2) => {
        this.starship2 = data2.result.properties;
        this.determineWinnerStarships();
      });
    });
  }

  determineWinnerPeople() {
    const mass1 = parseInt(this.person1.mass, 10);
    const mass2 = parseInt(this.person2.mass, 10);

    if (mass1 > mass2) {
      this.winner = `Winner: Left - ${this.person1.name} with mass ${mass1}`;
      this.leftScore++; 
    } else if (mass2 > mass1) {
      this.winner = `Winner: Right - ${this.person2.name} with mass ${mass2}`;
      this.rightScore++; 
    } else {
      this.winner = "It's a tie!";
    }
  }

  determineWinnerStarships() {
    const crew1 = parseInt(this.starship1.crew, 10);
    const crew2 = parseInt(this.starship2.crew, 10);

    if (crew1 > crew2) {
      this.winner = `Winner: Left - ${this.starship1.name} with crew size ${crew1}`;
      this.leftScore++;
    } else if (crew2 > crew1) {
      this.winner = `Winner: Right - ${this.starship2.name} with crew size ${crew2}`;
      this.rightScore++;
    } else {
      this.winner = "It's a tie!";
    }
  }
}
