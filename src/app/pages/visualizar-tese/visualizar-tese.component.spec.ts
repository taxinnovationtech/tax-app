import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarTeseComponent } from './visualizar-tese.component';

describe('VisualizarTeseComponent', () => {
  let component: VisualizarTeseComponent;
  let fixture: ComponentFixture<VisualizarTeseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarTeseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarTeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
