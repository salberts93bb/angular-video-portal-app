import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSearchResultListComponent } from './content-search-result-list.component';

describe('ContentSearchResultListComponent', () => {
  let component: ContentSearchResultListComponent;
  let fixture: ComponentFixture<ContentSearchResultListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentSearchResultListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSearchResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
