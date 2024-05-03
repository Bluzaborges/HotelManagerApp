import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditValueComponent } from './edit-value.component';

describe('EditValueComponent', () => {
  let component: EditValueComponent;
  let fixture: ComponentFixture<EditValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
