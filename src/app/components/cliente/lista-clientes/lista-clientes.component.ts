
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { clientesI } from 'src/app/interfaces/clientei';
import { ClienteService } from 'src/app/services/cliente.service';




@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  /* listaClientes:clientesI[] | undefined=[]; */
  listaClientes: clientesI[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.onMostrarClientes()
  }

  onMostrarClientes() {
    this.clienteService.getClientesHttp()
      .subscribe(
        {
          next: (cli) => {
            this.listaClientes = cli
          },
          error: (error) => {
            console.error(error)
          }
        }
      )

  }

  /* async mostrarClientes(){
    this.listaClientes = await this.clienteService.getClientes()
  } */

  async eliminarCliente(id: number) {
    if (confirm(`Desea eliminar el cliente con id ${id} ?`)) {
      this.clienteService.deleteCliente(id)
    }
  }

  onEliminarCliente(id: number) {
    const ok = confirm(`Desea eliminar el id: ${id}`)
    if (ok) {
      this.clienteService.deleteClienteHttp(id)
        .subscribe(
          {
            next: () => {
              alert(`Cliente eliminado con éxito`);
            },
            error: (err) => {
              alert(`Error al intentar eliminar
              el cliente con el id: ${id}\nDescripción: ${err}`);
            }
          }
        );
    }
  }


}
