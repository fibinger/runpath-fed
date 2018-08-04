import {Component, OnInit} from '@angular/core';
import {Photo, PhotoService} from '../photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  photos: Photo[];
  displayedPhotos: Photo[];

  constructor(private photoService: PhotoService) {
  }

  ngOnInit() {
    this.photoService.getPhotos()
      .subscribe(photos => {
        this.photos = photos;
        this.displayedPhotos = photos.slice(0, 10);
      });
  }

}
