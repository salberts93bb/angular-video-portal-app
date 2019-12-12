import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideoListComponent } from './admin-video-list.component';

describe('AdminVideoListComponent', () => {
  let component: AdminVideoListComponent;
  let fixture: ComponentFixture<AdminVideoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVideoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVideoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
