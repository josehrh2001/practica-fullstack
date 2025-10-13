import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../../shared/services/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { NewProductoComponent } from '../components/new-producto/new-producto.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private productoService: ProductoService,
              public dialog: MatDialog, private snackBar : MatSnackBar) { }

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

  openProductoDialog(){
    const dialogRef = this.dialog.open(NewProductoComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if( result == 1){
        this.openSnackBar("Producto Agregado", "Exitosa");
        this.getProductos();
      }else if (result == 2){
        this.openSnackBar("Se produjo un error al guardar producto", "Error");
      }
    });
  }

  edit(id:number, nombre:string,marca:string,categoria:string,precio:number,existencias:number,activo:boolean){
    const dialogRef = this.dialog.open(NewProductoComponent, {
      width: '450px',
      data:{id: id,nombre: nombre, marca: marca, categoria: categoria, precio:precio, existencias: existencias, activo: activo}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if( result == 1){
        this.openSnackBar("Producto Actualizado", "Exitosa");
        this.getProductos();
      }else if (result == 2){
        this.openSnackBar("Se produjo un error al actualizar producto", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })
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
