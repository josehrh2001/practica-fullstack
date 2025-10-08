package com.practica.fullstack.controller;

import com.practica.fullstack.model.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.practica.fullstack.response.ProductoResponseRest;
import com.practica.fullstack.services.IProductoService;

import java.util.Map;


@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/v1")
public class ProductoRestController {

        @Autowired
        private IProductoService service;


        /**
         * get all categories
         * @return
         */

        @GetMapping("/productos")
        public ResponseEntity<ProductoResponseRest> searchProductos(){

            ResponseEntity<ProductoResponseRest> response =  service.search();
            return response;
        }

        /**
         * Get categories by id
         * @param id
         * @return
         */
        @GetMapping("/productos/{id}")
        public ResponseEntity<ProductoResponseRest> searchProductosByID(@PathVariable Long id){

            ResponseEntity<ProductoResponseRest> response =  service.searchById(id);
            return response;
        }

        /**
         * POST guardar categories by id
         * @param producto
         * @return
         */
        @PostMapping("/productos")
        public ResponseEntity<ProductoResponseRest> save(@RequestBody Producto producto){

            ResponseEntity<ProductoResponseRest> response =  service.save(producto);
            return response;
        }

        /**
         * PUT actualizar categorias
         * @param producto
         * @param id
         * @return
         */
        @PutMapping("/productos/{id}")
        public ResponseEntity<ProductoResponseRest> update(@RequestBody Producto producto, @PathVariable Long id	){

            ResponseEntity<ProductoResponseRest> response =  service.update(producto, id);
            return response;
        }

        /**
         * Delete eliminar categoria
         * @param id
         * @return
         */
        @DeleteMapping("/productos/{id}")
        public ResponseEntity<ProductoResponseRest> delete(@PathVariable Long id	){

            ResponseEntity<ProductoResponseRest> response =  service.deleteById(id);
            return response;
        }

        /**
         * PATCH /productos/{id}/activar – activar/desactivar
         */
        @PatchMapping("/productos/{id}/activar")
        public ResponseEntity<ProductoResponseRest> activarDesactivar(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
            boolean activo = body.getOrDefault("activo", true);
            return service.activarDesactivar(id, activo);
        }

        /**
         * POST /productos/{id}/ajustar – ajuste de inventario
         */
        @PostMapping("/productos/{id}/ajustar")
        public ResponseEntity<ProductoResponseRest> ajustarInventario(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
            int cantidad = body.getOrDefault("cantidad", 0);
            return service.ajustar(id, cantidad);
        }
}
