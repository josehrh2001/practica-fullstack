import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';




const chilRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent }
]

@NgModule({
    imports: [RouterModule.forChild(chilRoutes)],
    exports: [RouterModule]
})
export class RouterChildModule { }
