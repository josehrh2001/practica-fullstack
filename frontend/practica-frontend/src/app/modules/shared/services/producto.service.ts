import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = "http://localhost:8080/api/v1"

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  getProductos(){
    const endpoint = `${base_url}/productos` 
    return this.http.get(endpoint);
  }
    
}
