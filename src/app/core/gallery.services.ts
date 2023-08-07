import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class GalleryService {
   constructor(private http: HttpClient) {
    }

    public getJSON(): Observable<any> {
        return this.http.get("./assets/gallery/gallery.json");
    }
}