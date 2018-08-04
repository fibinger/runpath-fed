import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PhotosComponent} from './photos.component';
import {Photo, PhotoService} from '../photo.service';
import {PhotoServiceMock} from '../photo.service.mock';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  const samplePhotos: Photo[] = Array.from(Array(10).keys())
    .map(idx => ({albumId: 1, id: idx, title: 'photo' + idx, url: 'http://photo/' + idx, thumbnailUrl: 'http://thumbnail/' + idx}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosComponent],
      providers: [
        {provide: PhotoService, useValue: new PhotoServiceMock().setPhotos(samplePhotos)}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display up to 10 photos', () => {
    expect(component.displayedPhotos.length).toEqual(10);
  });
});
