import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './home/search/search.component';
import { DisplayComponent } from './home/display/display.component';
import { ThumbnailAccommodationComponent } from './home/display/thumbnail-accommodation/thumbnail-accommodation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DisplayResolver } from './home/display/display-resolver.service';
import { DisplayService } from './home/display/display.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccommodationProfileComponent } from './home/accommodation-profile/accommodation-profile.component';
import { PaginationComponent } from './home/display/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { SearchService } from './home/search/search.service';
import { AccommodationProfileService } from './home/accommodation-profile/accommodation-profile.service';
import { AccommodationProfileResolver } from './home/accommodation-profile/accommodation-profile-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DisplayComponent,
    SearchComponent,
    AccommodationProfileComponent,
    ThumbnailAccommodationComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers: [DisplayResolver, DisplayService, SearchService, AccommodationProfileService, AccommodationProfileResolver],
  bootstrap: [AppComponent]
})

export class AppModule { }
