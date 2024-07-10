import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasetesesComponent } from './baseteses.component';

describe('BasetesesComponent', () => {
  let component: BasetesesComponent;
  let fixture: ComponentFixture<BasetesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasetesesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasetesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
