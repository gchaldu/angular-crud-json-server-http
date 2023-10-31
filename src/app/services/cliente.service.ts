import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, filter, map, throwError } from 'rxjs';
import { clientesI } from '../interfaces/clientei';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: string = 'http://localhost:4000/clientes';

  constructor(private http: HttpClient) { }

  async getClientes(): Promise<clientesI[] | undefined> {
    try {
      const resultado = await fetch(this.url);
      const clientes: clientesI[] = await resultado.json();
      return clientes;
    } catch (error) {
      console.log(error);
    }
    return undefined
  }

  getClientesHttp(): Observable<clientesI[]> {
    return this.http.get<clientesI[]>(this.url)
  }

  getClientes2(): Observable<clientesI[]> {
    return this.http.get<clientesI[]>(this.url).pipe(
      // Operador 1: map
      map(data => {
        // Realiza una transformación en los datos
        return data.map(item => {
          return {
            apellido: item.apellido,
            nombre: item.nombre.toUpperCase(),
            dni: item.dni,
            fechaInicio: item.fechaInicio,
            id: item.id,
          };
        });
      }),
      // Operador 2: catchError
      catchError(error => {
        // Manejo de errores
        console.error('Error en la solicitud HTTP:', error);
        // Puedes retornar un valor por defecto o lanzar otro observable de error
        return [];
      })
    );
  }

  async deleteCliente(id: number) {
    try {
      await fetch(`${this.url}/${id}`,
        { method: 'DELETE' }
      )
      window.location.href = 'index.html'
    } catch (error) {
      alert(error)
    }
  }

  deleteClienteHttp(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  async postCliente(cliente: clientesI) {
    try {
      await fetch(this.url,
        { method: 'POST', body: JSON.stringify(cliente), headers: { 'Content-type': 'application/json' } }
      )
      window.location.href = 'index.html'
    } catch (error) {
      console.log(error)
    }
  }

  postClienteHttp(cliente: clientesI): Observable<clientesI>{
    return this.http.post<clientesI>(
        this.url,
        cliente,
        {
          headers: {'Content-type': 'application/json'}
        })
  }

  async getCliente(id: number) {
    try {
      const resultado = await fetch(`${this.url}/${id}`);
      const cliente = await resultado.json()
      return cliente;
    } catch (error) {
      console.log(error)
    }
  }

  async putCliente(cliente: clientesI | null) {
    try {
      await fetch(`${this.url}/${cliente?.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(cliente),
          headers: { 'Content-type': 'application/json' }
        }
      )
    } catch (error) {
      console.log(error)
    }


  }
  /* getCliente(id: number): Observable<any> {
    const apiUrl = `${this.url}/${id}`;

    return this.http.get(apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener el cliente:', error);
        return throwError(error);
      })
    );
  } */
}
