import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/modules/shared/services/producto.service';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.css']
})
export class NewProductoComponent implements OnInit {

  productoForm!: FormGroup;
  estadoFormulario: string ;

  constructor(private fb: FormBuilder, private productoService: ProductoService,
    private dialogRef: MatDialogRef<NewProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    console.log(data);
    this.estadoFormulario = "Agregar nuevo";

    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(1)]],
      existencias: ['', [Validators.required, Validators.min(0)]]
    });

    if (data != null) {
      this.updateForm(data);
      this.estadoFormulario = "Actualizar"
    }

  }


  ngOnInit(): void {

  }

  onSave() {

    let data = {
      nombre: this.productoForm.get('nombre')?.value,
      marca: this.productoForm.get('marca')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      precio: this.productoForm.get('precio')?.value,
      existencias: this.productoForm.get('existencias')?.value
    }

    if (this.data != null) {
      //Actualizar
      this.productoService.updateProducto(data, this.data.id)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) => {
          this.dialogRef.close(2);
        })
    } else {
      this.productoService.saveProducto(data)
        .subscribe((data: any) => {
          console.log(data);
          this.dialogRef.close(1);
        }, (error: any) => {
          this.dialogRef.close(2);
        })
    }

  }

  onCancel() {
    this.dialogRef.close(3);
  }

  updateForm(data: any) {
    this.productoForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      marca: [data.marca, Validators.required],
      categoria: [data.categoria, Validators.required],
      precio: [data.precio, [Validators.required, Validators.min(1)]],
      existencias: [data.existencias, [Validators.required, Validators.min(0)]]
    });
  }

}
