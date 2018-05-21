import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class UploadFileService {
 
  constructor(private httpClient: HttpClient) { }
 
  postFile(fileToUpload: File): Observable<any> {
    const endpoint = 'http://localhost:8080/api/image/new';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData)
      .map(res => res );
}
}