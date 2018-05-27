import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from '../../../model/accommodation.model';
import { ThumbnailAccommodationService } from './thumbnail-accommodation.service';
import { Image } from '../../../model/image.model';

@Component({
  selector: 'app-thumbnail-accommodation',
  templateUrl: './thumbnail-accommodation.component.html',
  styleUrls: ['./thumbnail-accommodation.component.css']
})
export class ThumbnailAccommodationComponent implements OnInit {

  @Input() accommodation: Accommodation;

  previewImage: string;

  constructor(private thuAccommodation: ThumbnailAccommodationService) { }

  ngOnInit() {
    this.showPic();
  }

  private showPic(): void {
    this.thuAccommodation.getImage(this.accommodation.id).subscribe(
      (response) => {
        let i: Image[] = response.json()
        try{
        this.previewImage = `data:image/jpeg;base64,${i[0].image}`;
        }
        catch(e)
        {
          e.message;
        }
        return;
      }
    )

    this.previewImage = 'assets/img/empty-profile.png'
  }
}
