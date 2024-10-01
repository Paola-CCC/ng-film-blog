import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';


const API: string = environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) {}

  //OK
  uploadImage(data:any ){

    return this.http.post(API + 'images-upload', data, {
      responseType: 'json',
    });
  };

  showImages(){
    return this.http.get(API + 'images-all', httpOptions);
  };

  deleteImage(id:any){

    const headers = {
      headers: new HttpHeaders({ 
        responseType: 'json'
      }),
    };

    return this.http.delete(API + `image-remove/${id}`, {
      responseType: 'json',
    });
  };

}
