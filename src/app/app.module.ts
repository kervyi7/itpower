import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './core/custom-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './main/about/about.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ServicesComponent } from './main/services/services.component';
import { AdvantagesComponent } from './main/advantages/advantages.component';
import { CustomersComponent } from './main/customers/customers.component';
import { PriceComponent } from './main/price/price.component';
import { ContactComponent } from './main/contact/contact.component';
import { GalleryComponent } from './main/gallery/gallery.component';
import { GalleryService } from './core/gallery.services';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NewGalleryComponent } from './main/new-gallery/new-gallery.component';
import { GalleryModule } from  '@ngx-gallery/core';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    ServicesComponent,
    AdvantagesComponent,
    CustomersComponent,
    PriceComponent,
    ContactComponent,
    GalleryComponent,
    NewGalleryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    HttpClientModule,
    GalleryModule,
    ScrollToModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [GalleryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
