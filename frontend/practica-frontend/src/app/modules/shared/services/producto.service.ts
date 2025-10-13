import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = "http://localhost:8080/api/v1"

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  /**
   * get all productos
   */
  getProductos(){
    const endpoint = `${base_url}/productos` 
    return this.http.get(endpoint);
  }

  /**
   * guardar el producto
   */
  saveProducto(body: any){
    const endpoint = `${base_url}/productos`;
    return this.http.post(endpoint, body);
  }

  /**
   * actualizar producto 
   */
  updateProducto(body:any, id:any){
    const endpoint = `${base_url}/productos/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * eliminar producto 
   */
  eliminarProducto(id:any){
    const endpoint = `${base_url}/productos/${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * get producto por id
   */
  getProductoById(id:any){
    const endpoint = `${base_url}/productos/${id}` ;
    return this.http.get(endpoint);
  }
    

   /**
   * put activar/desactivar producto
   */
  activarProducto(id: number, activo: boolean) {
  const endpoint = `${base_url}/productos/${id}/activar`;
  return this.http.patch(endpoint, { activo });
  }

}
