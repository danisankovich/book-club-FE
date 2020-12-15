import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
  get(url: string, queryField?: string) {
    let urlString = `http://localhost:3000/${url}`;
    let query = '';
    if (queryField) {
      urlString = `${urlString}?queryField=${queryField}`
    }
    return this.http.get(`${urlString}`)
  }

  post(url: string, body: object) {
    return this.http.post(`http://localhost:3000/${url}`, body)
  }
}
