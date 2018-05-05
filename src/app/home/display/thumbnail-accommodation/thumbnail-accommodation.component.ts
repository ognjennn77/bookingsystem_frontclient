import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from '../../../model/accommodation.model';

@Component({
  selector: 'app-thumbnail-accommodation',
  templateUrl: './thumbnail-accommodation.component.html',
  styleUrls: ['./thumbnail-accommodation.component.css']
})
export class ThumbnailAccommodationComponent implements OnInit {

  @Input() accommodation: Accommodation;

  previewImage: string;

  constructor() { }

  ngOnInit() {
    this.showPic();
  }

  private showPic(): void {

    if (this.accommodation.images[0] && this.accommodation.images[0].image) {
      this.previewImage = `data:image/jpeg;base64,${this.accommodation.images[0].image}`
      return
    }

    this.previewImage = 'assets/img/empty-profile.png'
  }
}
