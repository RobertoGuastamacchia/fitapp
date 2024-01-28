import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaySchedeComponent } from './play-schede.component';

describe('PlaySchedeComponent', () => {
  let component: PlaySchedeComponent;
  let fixture: ComponentFixture<PlaySchedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaySchedeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaySchedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
