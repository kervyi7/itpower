import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem } from '@ngx-gallery/core';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-new-gallery',
  templateUrl: './new-gallery.component.html',
  styleUrls: ['./new-gallery.component.css']
})
export class NewGalleryComponent {

  items: GalleryItem[];

  constructor(public gallery: Gallery) {
  }

  ngOnInit() {
    // Creat gallery items
    this.items = data.map(item => new ImageItem({ src: item.srcUrl}));
  }
}

const data = [
  {
    srcUrl: '../assets/gallery/IMG_5165.JPG',
    // previewUrl: '../assets/gallery/img.jpg'
  },
  {
    srcUrl: '../assets/gallery/image.jpg',
    // previewUrl: '../assets/gallery/img.jpg'
  },
  {
    srcUrl: '../assets/gallery/DSC_0005.jpg',
    // previewUrl: '../assets/gallery/DSC_0005.jpg'
  },
  {
    srcUrl: '../assets/gallery/IMG_0824.jpg',
    // previewUrl: '../assets/gallery/IMG_0824.jpg'
  },
  {
    srcUrl: '../assets/gallery/IMG_16632.png',
    // previewUrl: '../assets/gallery/IMG_16632.png'
  },
  {
    srcUrl: '../assets/gallery/screen_site.png',
    // previewUrl: '../assets/gallery/screen_site.png'
  },
  {
    srcUrl: '../assets/gallery/screen_site2.jpg',
    // previewUrl: '../assets/gallery/screen_site2.jpg'
  }
];

