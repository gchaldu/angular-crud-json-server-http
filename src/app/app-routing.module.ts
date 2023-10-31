import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClientesComponent } from './components/cliente/lista-clientes/lista-clientes.component';
import { NuevoClienteComponent } from './components/cliente/nuevo-cliente/nuevo-cliente.component';
import { EditarClienteComponent } from './components/cliente/editar-cliente/editar-cliente.component';

const routes: Routes = [
  {
    path:'',
    component:ListaClientesComponent
  },
  {
    path:'listar',
    component:ListaClientesComponent
  },
  {path:'nuevo', component: NuevoClienteComponent},
  {path:'editar/:id', component: EditarClienteComponent},
  {path:'**', component: ListaClientesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
