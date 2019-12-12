import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentVideoListComponent } from './content-video-list.component';

describe('ContentVideoListComponent', () => {
  let component: ContentVideoListComponent;
  let fixture: ComponentFixture<ContentVideoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentVideoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentVideoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
