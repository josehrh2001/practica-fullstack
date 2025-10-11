import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../../shared/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  displayedColumns: string[] = ['id', 'nombre', 'marca', 'categoria', 'precio', 'existencias', 'activo', 'acciones'];
  dataSource = new MatTableDataSource<ProductoElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProductos() {
    this.productoService.getProductos()
      .subscribe((data: any) => {
        console.log("respuesta de productos", data);
        this.proccesProductoResponse(data);
      }, (error: any) => {
        console.log("error en productos", error);
      })
  }

  proccesProductoResponse(resp: any) {
    const dataProducto: ProductoElement[] = [];
    if (resp.metadata[0].code == "00") {
      let listProducto = resp.productoResponse.producto;

      listProducto.forEach((element: ProductoElement) => {
        dataProducto.push(element);
      });

      //set  the datasource 
      this.dataSource = new MatTableDataSource<ProductoElement>(dataProducto);
      this.dataSource.paginator = this.paginator;

    }
  }


}

export interface ProductoElement {
  id: number;
  nombre: String;
  marca: String;
  categoria: String;
  precio: number;
  existencias: number;
  activo: boolean;
}
