package com.practica.fullstack.services;

import com.practica.fullstack.model.Producto;
import org.springframework.http.ResponseEntity;
import com.practica.fullstack.response.ProductoResponseRest;

public interface IProductoService {

    public ResponseEntity<ProductoResponseRest> search();
    public ResponseEntity<ProductoResponseRest> save(Producto producto);
    public ResponseEntity<ProductoResponseRest> searchById(Long id);
    public ResponseEntity<ProductoResponseRest> update(Producto producto, Long id);
    public ResponseEntity<ProductoResponseRest> deleteById(Long id);
    ResponseEntity<ProductoResponseRest> activarDesactivar(Long id, boolean activo);
    ResponseEntity<ProductoResponseRest> ajustar(Long id, int cantidad);

}
