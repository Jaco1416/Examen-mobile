import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL: string = "https://api.sampleapis.com/jokes/goodJokes";

  constructor(private http: HttpClient) { 
  }
  
  
  getDatos(){
    return this.http.get(this.URL);
  }

  getDato(id: number){
    return this.http.get(this.URL + '/' + id)
  }

}
