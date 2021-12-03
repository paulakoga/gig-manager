import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetlistListDialogComponent } from './setlist-list-dialog.component';

describe('SetlistListDialogComponent', () => {
  let component: SetlistListDialogComponent;
  let fixture: ComponentFixture<SetlistListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetlistListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetlistListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
