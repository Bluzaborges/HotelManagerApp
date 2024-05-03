import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnOverdueDialogComponent } from './warn-overdue-dialog.component';

describe('WarnOverdueDialogComponent', () => {
  let component: WarnOverdueDialogComponent;
  let fixture: ComponentFixture<WarnOverdueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarnOverdueDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarnOverdueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
