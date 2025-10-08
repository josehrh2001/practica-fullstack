package com.practica.fullstack.services;

import com.practica.fullstack.model.Producto;
import com.practica.fullstack.dao.IProductoDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.practica.fullstack.response.ProductoResponseRest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoServiceImpl implements IProductoService {
    //Inyeccion de dependencias
    @Autowired
    private IProductoDao productoDao;

    @Override
    @Transactional(readOnly = true)  //Si algo falla hace un Roll back
    public ResponseEntity<ProductoResponseRest> search() {

        ProductoResponseRest response = new ProductoResponseRest();

        try {

            List<Producto> producto = (List<Producto>) productoDao.findAll();

            response.getProductoResponse().setProducto(producto);
            response.setMetadata("Respuesta ok", "00", "Respuesta Exitosa");

        } catch (Exception e) {
            response.setMetadata("Respuesta no ok", "-1", "Error al consultar");
            e.getStackTrace();
            return new ResponseEntity<ProductoResponseRest> (response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<ProductoResponseRest> (response, HttpStatus.OK);
    }

    @Override
    @Transactional(readOnly = true)  //Si algo falla hace un Roll back
    public ResponseEntity<ProductoResponseRest> searchById(Long id) {


        ProductoResponseRest response = new ProductoResponseRest();
        List<Producto> list = new ArrayList<>();

        try {

            Optional<Producto> producto = productoDao.findById(id);
            if (producto.isPresent()) {
                list.add(producto.get());
                response.getProductoResponse().setProducto(list);
                response.setMetadata("Respuesta ok", "00", "Categoria encontrada");

            } else {
                response.setMetadata("Respuesta no ok", "-1", "Categoria no encontrada");
                return new ResponseEntity<ProductoResponseRest> (response, HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            response.setMetadata("Respuesta no ok", "-1", "Error al consultar por id");
            e.getStackTrace();
            return new ResponseEntity<ProductoResponseRest> (response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<ProductoResponseRest> (response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<ProductoResponseRest> save(Producto producto) {

        ProductoResponseRest response = new ProductoResponseRest();
        List<Producto> list = new ArrayList<>();

        try {

            Producto productoSaved = productoDao.save(producto);

            if (productoSaved != null) {
                list.add(productoSaved);
                response.getProductoResponse().setProducto(list);
                response.setMetadata("Respuesta ok", "00", "Producto guardado");
            } else {
                response.setMetadata("Respuesta no ok", "-1", "Producto no guardada");
                return new ResponseEntity<ProductoResponseRest> (response, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            response.setMetadata("Respuesta no ok", "-1", "Error al guardar Producto");
            e.getStackTrace();
            return new ResponseEntity<ProductoResponseRest> (response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<ProductoResponseRest> (response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ProductoResponseRest> update(Producto producto, Long id) {
        ProductoResponseRest response = new ProductoResponseRest();
        List<Producto> list = new ArrayList<>();

        try {

            Optional<Producto> productoSearch = productoDao.findById(id);

            if (productoSearch.isPresent()) {
                //Se procedera actulizar el registro
                productoSearch.get().setNombre(producto.getNombre());
                productoSearch.get().setMarca(producto.getMarca());
                productoSearch.get().setCategoria(producto.getCategoria());
                productoSearch.get().setPrecio(producto.getPrecio());
                productoSearch.get().setExistencias(producto.getExistencias());
                productoSearch.get().setActivo(producto.getActivo());

                Producto productoToUpdate = productoDao.save(productoSearch.get());

                if (productoToUpdate != null) {
                    list.add(productoToUpdate);
                    response.getProductoResponse().setProducto(list);
                    response.setMetadata("Respuesta ok", "00", "Producto actualizado");
                } else {
                    response.setMetadata("Respuesta no ok", "-1", "Producto no actulizado");
                    return new ResponseEntity<ProductoResponseRest> (response, HttpStatus.BAD_REQUEST);
                }


            } else {
                response.setMetadata("Respuesta no ok", "-1", "Producto no encontrado");
                return new ResponseEntity<ProductoResponseRest> (response, HttpStatus.NOT_FOUND);
            }


        } catch (Exception e) {
            response.setMetadata("Respuesta no ok", "-1", "Error al actulizar producto");
            e.getStackTrace();
            return new ResponseEntity<ProductoResponseRest> (response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<ProductoResponseRest> (response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<ProductoResponseRest> deleteById(Long id) {

        ProductoResponseRest response = new ProductoResponseRest();

        try {

            productoDao.deleteById(id);
            response.setMetadata("Respuesta pk", "00", "Producto Eliminado");

        } catch (Exception e) {
            response.setMetadata("Respuesta no ok", "-1", "Error al eliminar");
            e.getStackTrace();
            return new ResponseEntity<ProductoResponseRest> (response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<ProductoResponseRest> (response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<ProductoResponseRest> activarDesactivar(Long id, boolean activo) {
        ProductoResponseRest response = new ProductoResponseRest();
        List<Producto> list = new ArrayList<>();

        try {
            Optional<Producto> productoSearch = productoDao.findById(id);
            if (productoSearch.isPresent()) {
                productoSearch.get().setActivo(activo);
                Producto updated = productoDao.save(productoSearch.get());
                list.add(updated);
                response.getProductoResponse().setProducto(list);
                response.setMetadata("Respuesta ok", "00", "Producto " + (activo ? "activado" : "desactivado"));
            } else {
                response.setMetadata("Respuesta no ok", "-1", "Producto no encontrado");
                return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            response.setMetadata("Respuesta no ok", "-1", "Error al actualizar estado");
            return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<ProductoResponseRest> ajustar(Long id, int cantidad) {
        ProductoResponseRest response = new ProductoResponseRest();
        List<Producto> list = new ArrayList<>();

        try {
            Optional<Producto> productoSearch = productoDao.findById(id);
            if (productoSearch.isPresent()) {
                Producto producto = productoSearch.get();
                producto.setExistencias(producto.getExistencias() + cantidad);
                Producto updated = productoDao.save(producto);
                list.add(updated);
                response.getProductoResponse().setProducto(list);
                response.setMetadata("Respuesta ok", "00", "Inventario ajustado");
            } else {
                response.setMetadata("Respuesta no ok", "-1", "No se pudo hacer el ajuste");
                return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            response.setMetadata("Respuesta no ok", "-1", "Error al ajustar inventario");
            return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<ProductoResponseRest>(response, HttpStatus.OK);
    }
}
