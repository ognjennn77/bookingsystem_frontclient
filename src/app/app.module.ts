import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './core/app-routing.module';
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
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { HomeService } from './home/home.service';
<<<<<<< HEAD
import {UserService} from "./app.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./core/auth.service";
import {Interceptor} from "./core/inteceptor";
import {TokenStorage} from "./core/token.storage";
import {ErrorDialogComponent} from './core/error-dialog.component';
import { ProfileComponent } from './profile/profile.component';
=======
import { UserService } from "./app.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthService } from "./core/auth.service";
import { Interceptor } from "./core/inteceptor";
import { TokenStorage } from "./core/token.storage";
import { ErrorDialogComponent } from './core/error-dialog.component';
>>>>>>> d595c3c2946b6209c590ff25a597f120b6d894d4

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DisplayComponent,
    SearchComponent,
    AccommodationProfileComponent,
    ThumbnailAccommodationComponent,
    PaginationComponent,
    ErrorDialogComponent,
    ProfileComponent
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
    MyDatePickerModule,
    HttpClientModule,
    MyDateRangePickerModule
  ],
  entryComponents: [ErrorDialogComponent],
  providers: [ErrorDialogComponent, DisplayResolver, DisplayService, SearchService,
    AccommodationProfileService, AccommodationProfileResolver,
    HomeService, TokenStorage, AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
