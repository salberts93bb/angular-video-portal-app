import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentThumbnailEditorComponent } from './content-thumbnail-editor.component';

describe('ContentThumbnailEditorComponent', () => {
  let component: ContentThumbnailEditorComponent;
  let fixture: ComponentFixture<ContentThumbnailEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentThumbnailEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentThumbnailEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
