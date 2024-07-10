import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTeseComponent } from './criar-tese.component';

describe('CriarTeseComponent', () => {
  let component: CriarTeseComponent;
  let fixture: ComponentFixture<CriarTeseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarTeseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarTeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
