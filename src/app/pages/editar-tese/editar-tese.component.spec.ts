import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTeseComponent } from './editar-tese.component';

describe('EditarTeseComponent', () => {
  let component: EditarTeseComponent;
  let fixture: ComponentFixture<EditarTeseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTeseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarTeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
