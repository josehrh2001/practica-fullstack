import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoComponent } from './producto/producto.component';
import { NewProductoComponent } from './components/new-producto/new-producto.component';



@NgModule({
  declarations: [ProductoComponent, NewProductoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductoModule { }
