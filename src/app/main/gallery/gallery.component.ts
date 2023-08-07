import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/core/gallery.services';
import { Gallery } from 'src/app/core/models/gallery';
import { Image } from 'src/app/core/models/image';
import { interval } from 'rxjs';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {
  gallery: Gallery;
  imageSelected: Image;
  left = 0;
  isFullScreen = false;
  isPlay = true;
  private subscription;
  private secondsCounter = interval(3000);
  private displayIndexStart = 0;
  private displayIndexEnd = 9;


  constructor(private galleryService: GalleryService) {
    this.gallery = new Gallery();
    this.gallery.images = [];
    this.imageSelected = new Image();
    this.loadGalery();
  }

  ngOnInit() {
  }

  private loadGalery() {
    this.galleryService.getJSON().subscribe(data => {
      this.gallery.images = data.images;
      if (this.imageSelected.path != undefined || this.gallery.images == undefined || this.gallery.images.length == 0) {
        return;
      }
      this.imageSelected = this.gallery.images[0];
    });
  }

  public setSelected(img: Image) {
    this.imageSelected = img;
  }

  public isSetSelected(img: Image): boolean {
    return this.imageSelected == img;
  }

  public next() {
    let index = this.gallery.images.indexOf(this.imageSelected);
    if (index == -1) {
      return;
    }
    let nextIndex: number;
    let length = this.gallery.images.length;
    if (length == index + 1) {
      if (this.subscription != undefined) {
        this.subscription.unsubscribe();
      }
      return;
    }
    else {
      nextIndex = index + 1;
    }
    this.imageSelected = this.gallery.images[nextIndex];
    if (this.displayIndexEnd < nextIndex) {
      this.left = this.left - 10;
      this.displayIndexEnd = this.displayIndexEnd + 1;
      this.displayIndexStart = this.displayIndexStart + 1;
    }
  }

  public back() {
    let index = this.gallery.images.indexOf(this.imageSelected);
    if (index == -1) {
      return;
    }
    let nextIndex: number;
    let length = this.gallery.images.length;
    if (index == 0) {
      return;
    }
    else {
      nextIndex = index - 1;
    }
    this.imageSelected = this.gallery.images[nextIndex];
    if (this.displayIndexStart > nextIndex) {
      this.displayIndexEnd = this.displayIndexEnd - 1;
      this.displayIndexStart = this.displayIndexStart - 1;
      this.left = this.left + 10;
    }
  }

  public getLeft(): string {
    return this.left.toString() + "%"
  }

  public onPlay() {
    if (this.isPlay) {
      this.subscription = this.secondsCounter.subscribe(() => this.next());
    }
    else {
      this.subscription.unsubscribe();
    }
    this.isPlay = !this.isPlay;
  }

  public onFullScreen() {
    this.isFullScreen = !this.isFullScreen;
  }
}
