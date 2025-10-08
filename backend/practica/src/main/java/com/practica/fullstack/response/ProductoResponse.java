package com.practica.fullstack.response;

import com.practica.fullstack.model.Producto;
import lombok.Data;

import java.util.List;

@Data
public class ProductoResponse {
    private List<Producto> producto;
}
