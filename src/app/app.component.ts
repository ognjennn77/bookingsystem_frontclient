import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: any;
  title = 'app';
  modalRef: BsModalRef;
  context: CanvasRenderingContext2D;
  constructor(private modalService: BsModalService) {}

  @ViewChild("imageCanvas") imageCanvas;

  preview(event: any): void{
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    
    }
  }
  
  openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
  }
}