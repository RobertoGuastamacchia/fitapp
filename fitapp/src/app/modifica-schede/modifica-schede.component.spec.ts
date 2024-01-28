import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaSchedeComponent } from './modifica-schede.component';

describe('ModificaSchedeComponent', () => {
  let component: ModificaSchedeComponent;
  let fixture: ComponentFixture<ModificaSchedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaSchedeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificaSchedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
