import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductoModule } from '../producto/producto.module';




@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ProductoModule
  ]
})
export class DashboardModule { }
