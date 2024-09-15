import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { SwapiService } from '../swapi.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let mockSwapiService: jasmine.SpyObj<SwapiService>;

  beforeEach(async () => {
    mockSwapiService = jasmine.createSpyObj('SwapiService', [
      'getRandomPerson',
      'getRandomStarship',
    ]);

    await TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [{ provide: SwapiService, useValue: mockSwapiService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should play the people game and determine the winner', () => {
    const person1 = { name: 'Luke', mass: '80' };
    const person2 = { name: 'Vader', mass: '120' };

    mockSwapiService.getRandomPerson.and.returnValues(
      of({ result: { properties: person1 } }),
      of({ result: { properties: person2 } })
    );

    component.playPeopleGame();

    fixture.detectChanges();

    expect(component.person1.name).toEqual('Luke');
    expect(component.person2.name).toEqual('Vader');
    expect(component.winner).toContain('Winner: Right');
    expect(component.rightScore).toBe(1);
  });

  it('should play the starship game and determine the winner', () => {
    const starship1 = { name: 'X-Wing', crew: '1' };
    const starship2 = { name: 'Star Destroyer', crew: '1000' };

    mockSwapiService.getRandomStarship.and.returnValues(
      of({ result: { properties: starship1 } }),
      of({ result: { properties: starship2 } })
    );

    component.playStarshipGame();

    fixture.detectChanges();

    expect(component.starship1.name).toEqual('X-Wing');
    expect(component.starship2.name).toEqual('Star Destroyer');
    expect(component.winner).toContain('Winner: Right');
    expect(component.rightScore).toBe(1);
  });

  it('should update the score correctly when left player wins', () => {
    const person1 = { name: 'Luke', mass: '120' };
    const person2 = { name: 'Vader', mass: '80' };

    mockSwapiService.getRandomPerson.and.returnValues(
      of({ result: { properties: person1 } }),
      of({ result: { properties: person2 } })
    );

    component.playPeopleGame();

    fixture.detectChanges();

    expect(component.leftScore).toBe(1);
  });
});
