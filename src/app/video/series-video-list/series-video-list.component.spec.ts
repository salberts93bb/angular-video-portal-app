import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesVideoListComponent } from './series-video-list.component';

describe('SeriesVideoListComponent', () => {
  let component: SeriesVideoListComponent;
  let fixture: ComponentFixture<SeriesVideoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesVideoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesVideoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
