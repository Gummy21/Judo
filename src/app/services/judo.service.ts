import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class JudoService {
  API_URL = environment.API_URL

  constructor(private http: HttpClient) { }

  getMoves(category:string,name:string ){
    return this.http.get(`${this.API_URL}?category=${category}&name=${name}`)
  }

  getSingle(id:number ){
    return this.http.get(`${this.API_URL}/${id}`)
  }

}
