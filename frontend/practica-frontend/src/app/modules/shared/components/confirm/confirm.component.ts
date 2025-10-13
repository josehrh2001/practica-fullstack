import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from '../../services/producto.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any, private productoService : ProductoService) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close(3);
  }

  delete(){
    if(this.data != null){
      this.productoService.eliminarProducto(this.data.id).
                subscribe( (data:any) => {
                  this.dialogRef.close(1);
                },(error:any) => {
                  this.dialogRef.close(2);
                })
    } else {
      this.dialogRef.close(2);
    }
  }
}
