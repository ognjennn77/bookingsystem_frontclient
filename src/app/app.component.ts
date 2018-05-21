import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from './core/auth.service';
import {TokenStorage} from './core/token.storage';
import {Router} from '@angular/router';
import { UploadFileService } from './upload-file.service';
import {UserRegistrationService} from './user-registration.service'


import { Login} from './model/login.model'

declare var require: any;

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

  

  constructor(private modalService: BsModalService, private router: Router, private token: TokenStorage,private authService: AuthService, private fileUploadService: UploadFileService, private registrationService :UserRegistrationService) {}

  @ViewChild("imageCanvas") imageCanvas;

  username: string = "";
  password: string = "";
  usernameR: string = "";
  passwordR: string = "";
  emailR: string = "";
  firstnameR: string = "";
  secondameR: string = "";
  cityR: string = "";
  phoneR: string = "";
  sin : boolean = false;
  sup : boolean = false;
  lout : boolean = true;
  prof : boolean = true;
  fileToUpload: File = null;
  files: FileList;
  imgId : number = -1;

  

  


  login(): void {
    
    this.authService.attemptAuth(new Login(this.username, this.password)).subscribe(
      data => localStorage.setItem("loggedUser", JSON.stringify(data)),
      error => this.badInput(),
      () => {
        this.callEmitter();
      }
    );
  }

  logout(): void{
    this.sin = false;
    this.sup = false;
    this.lout = true;
    this.prof  = true;
    this.router.navigate(['/home'])
    localStorage.clear();
  }

  badInput()
  {
    document.getElementById("login").innerHTML = "<div align=\"center\" class=\"alert alert-danger \"> Wrong email/password! </div>";
  }

  callEmitter()
  {
    this.modalRef.hide()
    this.sin = true;
    this.sup = true;
    this.lout = false;
    this.prof = false;
    this.router.navigate(['/profile'])
    this.authService.emitRole(this.username);
  }
  

  register(): void{
    
    console.log(this.imgId.toString());
    let userR ={};
    userR['username'] = this.usernameR;
    userR['password'] = this.passwordR;
    userR['email'] = this.emailR;
    userR['firstname'] = this.firstnameR;
    userR['lastname'] = this.secondameR;
    userR['city'] = this.cityR;
    userR['phonenumber'] = this.phoneR;
    userR['role'] = "USER";
    
    var js2xmlparser = require("js2xmlparser");
    let xmlFile = js2xmlparser.parse("abstractuser", userR);
    if(this.fileToUpload != null)
      this.uploadFileToActivity(xmlFile);
    else
    this.registrationService.newUser(xmlFile, Number(1).toString()).subscribe(
      (response) => {   },
      error => {document.getElementById("reg").innerHTML = "<div class=\"alert alert-danger \"> User whit that username/email already exists! </div>";}
    
    )

    
  }
  

  preview(event: any): void{
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
       this.files = event.target.files;
      this.fileToUpload = this.files.item(0);
      
    }
  }

  uploadFileToActivity(xmlFile: any) {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      this.imgId = data;
      this.registrationService.newUser(xmlFile, this.imgId.toString()).subscribe(
       (response) => {   },
       error => {document.getElementById("reg").innerHTML = "<div class=\"alert alert-danger \"> Wrong email/password! </div>";}
       
     )
      
      }, error => {
        console.log(error);
      });
  }
  
  openModal(template: TemplateRef<any>) {
      this.username = "";
      this.password =  "";
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

