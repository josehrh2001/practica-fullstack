import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/modules/shared/services/producto.service';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.css']
})
export class NewProductoComponent implements OnInit {

 productoForm!: FormGroup;

  constructor(private fb: FormBuilder, private productoService: ProductoService,
              private dialogRef: MatDialogRef<NewProductoComponent>
  ) { 
      this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(1)]],
      existencias: ['', [Validators.required, Validators.min(0)]]
    });

  }

  
  ngOnInit(): void {
    
  }

  onSave(){
    let data = {
      nombre: this.productoForm.get('nombre')?.value,
      marca: this.productoForm.get('marca')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      precio: this.productoForm.get('precio')?.value,
      existencias: this.productoForm.get('existencias')?.value
    }

    this.productoService.saveProducto(data)
            .subscribe( (data:any) => {
              console.log(data);
              this.dialogRef.close(1);
            }, (error:any) => {
              this.dialogRef.close(2);
            })


  }

  onCancel(){
    this.dialogRef.close(3);
  }

}
