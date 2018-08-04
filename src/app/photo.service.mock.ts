import {Injectable} from '@angular/core';
import {Photo, PhotoService} from './photo.service';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoServiceMock extends PhotoService {

  private photos: Photo[];

  constructor() {
    super(null);
  }

  getPhotos() {
    return of(this.photos);
  }

  setPhotos(photos: Photo[]) {
    this.photos = photos;
    return this;
  }
}
