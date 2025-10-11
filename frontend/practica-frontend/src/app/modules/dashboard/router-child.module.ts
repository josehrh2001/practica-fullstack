import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductoComponent } from '../producto/producto/producto.component';




const chilRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'producto', component: ProductoComponent }
]

@NgModule({
    imports: [RouterModule.forChild(chilRoutes)],
    exports: [RouterModule]
})
export class RouterChildModule { }
