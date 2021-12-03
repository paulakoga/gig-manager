import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetlistAddComponent } from './setlist-add.component';

describe('SetlistAddComponent', () => {
  let component: SetlistAddComponent;
  let fixture: ComponentFixture<SetlistAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetlistAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetlistAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
