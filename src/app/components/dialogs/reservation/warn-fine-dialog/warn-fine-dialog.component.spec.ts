import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnFineDialogComponent } from './warn-fine-dialog.component';

describe('WarnFineDialogComponent', () => {
  let component: WarnFineDialogComponent;
  let fixture: ComponentFixture<WarnFineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarnFineDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarnFineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
