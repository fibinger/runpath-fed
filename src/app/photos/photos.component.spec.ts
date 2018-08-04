import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PhotosComponent} from './photos.component';
import {Photo, PhotoService} from '../photo.service';
import {PhotoServiceMock} from '../photo.service.mock';
import {FormsModule} from '@angular/forms';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  const samplePhotos: Photo[] = Array.from(Array(55).keys())
    .map(idx => ({albumId: 1, id: idx, title: 'photo' + idx, url: 'http://photo/' + idx, thumbnailUrl: 'http://thumbnail/' + idx}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosComponent],
      imports: [
        FormsModule
      ],
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
    expect(component.displayedPhotos[0].id).toEqual(0);
  });

  it('should switch page', () => {
    component.nextPage();
    component.nextPage();
    fixture.detectChanges();
    expect(component.displayedPhotos.length).toEqual(10);
    expect(component.displayedPhotos[0].id).toEqual(20);
  });

  it('should search', () => {
    component.searchText = 'photo3';
    component.searchChanged();
    fixture.detectChanges();
    expect(component.displayedPhotos.length).toEqual(10);
    expect(component.displayedPhotos[0].id).toEqual(3);
    expect(component.displayedPhotos[1].id).toEqual(30);
  });
});
