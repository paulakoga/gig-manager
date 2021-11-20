import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertListDialogComponent } from './concert-list-dialog.component';

describe('ConcertListDialogComponent', () => {
  let component: ConcertListDialogComponent;
  let fixture: ComponentFixture<ConcertListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcertListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
