import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from './core/auth.service';
import {TokenStorage} from './core/token.storage';
import {Router} from '@angular/router';

import { Login} from './model/login.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: any = 'https://en.opensuse.org/images/0/0b/Icon-user.png';
  title = 'app';
  modalRef: BsModalRef;
  context: CanvasRenderingContext2D;

  loginForm: FormGroup;
  registerForm: FormGroup;

  

  constructor(private modalService: BsModalService, private router: Router, private token: TokenStorage,private authService: AuthService) {}

  @ViewChild("imageCanvas") imageCanvas;

  username: string;
  password: string;

  login(): void {
    
    this.authService.attemptAuth(new Login(this.username, this.password)).subscribe(
      data => console.log(data),
      data => localStorage.setItem("loggedUser", JSON.stringify(data)),
      
      () => {
        this.callEmitter();
      }
    );
  }

  callEmitter()
  {
    console.log(this.username);
    console.log(this.password);
    this.authService.emitRole(this.username);
  }

  

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
      this.initLogIn();
      this.initRegister();
  }

  initLogIn() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
    })
  }

  initRegister() {
    this.registerForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'fname': new FormControl(null, [Validators.required]),
      'sname': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [Validators.required]),
    })
  }
  
}

