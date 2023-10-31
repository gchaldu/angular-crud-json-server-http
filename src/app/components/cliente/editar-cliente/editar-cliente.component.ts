import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { validar } from 'src/app/helpers/funciones';
import { clientesI } from 'src/app/interfaces/clientei';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['../nuevo-cliente/nuevo-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: clientesI | null = {
    apellido:'',
    nombre:'',
    dni:0,
    fechaInicio:'',
    id:0
  };

  public myForm: FormGroup = new FormGroup({
    editApellido: new FormControl('', [],[]),
    editNombre: new FormControl('', [],[]),
    editDni: new FormControl(0, [],[])
  })

  public form:FormGroup = this.formBuilder.group({
    editApellido: [''],
    editNombre: [''],
    editDni: [0],
    editFechaInicio: [''],
    editId: [0]
  });

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.initForm();
  }


  async initForm() {
    this.route.params.subscribe(async params => {
      const clienteId = +params['id'];
      if (!isNaN(clienteId)) {
        this.cliente = await this.getCliente(clienteId);
        if (this.cliente) {
          this.form = this.formBuilder.group({
            editApellido: [this.cliente.apellido],
            editNombre: [this.cliente.nombre],
            editDni: [this.cliente.dni],
            editFechaInicio: [this.cliente.fechaInicio],
            editId: [this.cliente.id]
          });
        } else {
          console.log('error')
        }
      } else {
        console.log('ID de cliente no válido');
      }
    })
  }

  async getCliente(id: number): Promise<clientesI | null> {
    try {
      const cli: clientesI = await this.clienteService.getCliente(id);
      return cli;
    } catch (error) {
      console.error('Error al obtener el cliente:', error);
      return null;
    }
  }
  async editarCliente() {

    this.cliente!.apellido = this.form.get('editApellido')!.value;
    this.cliente!.nombre = this.form.get('editNombre')!.value;
    this.cliente!.dni = this.form.get('editDni')!.value;
    this.cliente!.fechaInicio = this.form.get('editFechaInicio')!.value;
    this.cliente!.id = this.form.get('editId')!.value;

    const valor = validar(this.cliente)

    if (!valor){
      alert('Todos los campos son obligatorios...')
      return;
    }
    await this.clienteService.putCliente(this.cliente);
    this.router.navigate(['/listar'])
  }

}
