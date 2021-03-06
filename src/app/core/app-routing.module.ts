import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '.././home/home.component';
import { DisplayResolver } from '.././home/display/display-resolver.service';
import { DisplayComponent } from '.././home/display/display.component';
import { AccommodationProfileComponent } from '.././home/accommodation-profile/accommodation-profile.component';
import { AccommodationProfileResolver } from '.././home/accommodation-profile/accommodation-profile-resolver.service';
import { ImagesResolver } from '../home/accommodation-profile/images-resolver.services';
import { ProfileComponent } from '../profile/profile.component'
import { ProfileResolver } from '../profile/profile-resolver.service';
import { RatingResolver } from '../home/accommodation-profile/comment-resolver';

const appRoutes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', component: DisplayComponent, runGuardsAndResolvers: 'paramsOrQueryParamsChange', resolve: { displayResolver: DisplayResolver } },
      { path: ':id', component: AccommodationProfileComponent, resolve: { accommodationProfileResolver: AccommodationProfileResolver, imageResolver: ImagesResolver, ratingResolver: RatingResolver } },
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, resolve: { profileResolver: ProfileResolver } }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }