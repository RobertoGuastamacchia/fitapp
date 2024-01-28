import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneSchedeComponent } from './gestione-schede.component';

describe('GestioneSchedeComponent', () => {
  let component: GestioneSchedeComponent;
  let fixture: ComponentFixture<GestioneSchedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestioneSchedeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestioneSchedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
