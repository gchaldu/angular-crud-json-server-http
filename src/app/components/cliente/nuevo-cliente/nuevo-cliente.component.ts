import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit{

  forms!:FormGroup

  constructor(
              private clienteService: ClienteService,
              private formsBuildes: FormBuilder,
              private router: Router
              ){}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.forms = this.formsBuildes.group({
        apellido:'',
        nombre:'',
        dni:0,
        fechaInicio:'',
    })
  }

  altaCliente(){
    this.clienteService.postCliente(this.forms.value)
  }

  onAltaCliente(){
    if(this.forms.invalid) return
    this.clienteService.postClienteHttp(this.forms.value)
      .subscribe(
        {
          next:(cli) => {
            alert(`Cliente: ${cli.apellido}`);
            this.router.navigate(['home'])
          },
          error: (err)=>{
            console.log(err)
          }
        }
      )
  }

}
