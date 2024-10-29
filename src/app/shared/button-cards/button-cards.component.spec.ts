import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCards } from './button-cards.component';

describe('ButtonCardsComponent', () => {
  let component: ButtonCards;
  let fixture: ComponentFixture<ButtonCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
