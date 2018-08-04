import {Component, OnInit} from '@angular/core';
import {Photo, PhotoService} from '../photo.service';

const ITEMS_PER_PAGE = 10;

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  photos: Photo[];
  displayedPhotos: Photo[];
  searchText: string;
  pages: number;
  page = 0;

  constructor(private photoService: PhotoService) {
  }

  ngOnInit() {
    this.photoService.getPhotos()
      .subscribe(photos => {
        this.photos = photos;
        this.pages = this.photos.length / ITEMS_PER_PAGE;
        this.refreshDisplayPhotos();
      });
  }

  refreshDisplayPhotos() {
    this.displayedPhotos = this.photos
      .filter(photo => {
        const searchText = this.searchText && this.searchText.trim();
        return searchText ? photo.title.includes(searchText) : true;
      })
      .slice(ITEMS_PER_PAGE * this.page, ITEMS_PER_PAGE * this.page + ITEMS_PER_PAGE);
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.refreshDisplayPhotos();
    }
  }

  nextPage() {
    if (this.page < this.pages - 1) {
      this.page++;
      this.refreshDisplayPhotos();
    }
  }

  searchChanged() {
    this.page = 0;
    this.refreshDisplayPhotos();
  }
}
