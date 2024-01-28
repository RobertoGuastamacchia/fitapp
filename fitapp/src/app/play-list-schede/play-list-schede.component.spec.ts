import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayListSchedeComponent } from './play-list-schede.component';

describe('PlayListSchedeComponent', () => {
  let component: PlayListSchedeComponent;
  let fixture: ComponentFixture<PlayListSchedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayListSchedeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayListSchedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
