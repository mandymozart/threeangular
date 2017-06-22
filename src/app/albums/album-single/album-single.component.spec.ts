import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSingleComponent } from './album-single.component';

describe('AlbumSingleComponent', () => {
  let component: AlbumSingleComponent;
  let fixture: ComponentFixture<AlbumSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
