import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdschedaComponent } from './modaladdscheda.component';

describe('ModaladdschedaComponent', () => {
  let component: ModaladdschedaComponent;
  let fixture: ComponentFixture<ModaladdschedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaladdschedaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaladdschedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
