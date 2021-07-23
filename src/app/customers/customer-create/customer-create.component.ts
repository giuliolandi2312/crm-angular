import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customer:any
  id:any;
  form: FormGroup;
  showForm:boolean = false
  listaComuni:any[]
  tipiCliente:any[]


  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private fb: FormBuilder) { }

  inizializzaForm() {
    console.log('ciao')
    this.form = this.fb.group({
      ragioneSociale : ['', Validators.required],
      partitaIva: ['', Validators.required],
      email: ['', Validators.required],
      tipoCliente: [''],
      pec: [''],
      telefono: [''],
      nomeContatto: [''],
      cognomeContatto: [''],
      telefonoContatto: [''],
      emailContatto: [''],
      indirizzoSedeOperativa: this.fb.group({
        id: [''],
        via: [''],
        civico: [''],
        cap: [''],
        localita: [''],
        comune: this.fb.group({
          id:[''],
          nome:[''],
          provincia: this.fb.group({
            id: [''],
            nome:[''],
            sigla:['']
          })
        })
        
      }),
      indirizzoSedeLegale: this.fb.group({
        id: [''],
        via: [''],
        civico: [''],
        cap: [''],
        localita: [''],
        comune: this.fb.group({
          id: [''],
          nome: [''],
          provincia: this.fb.group({
            id: [''],
            nome: [''],
            sigla: ['']
          })
        })
      }),
      dataInserimento: [''],
      dataUltimoContatto: [''],
      fatturatoAnnuale: ['']
      

  })
  }

  /*crea(form){
    this.api.createCustomer(form.value).subscribe(
      data=> {
        console.log(data)
        this.router.navigate(['customer', this.id])
      }
    )
  }*/
  create(form) {
    console.log(form.value)
    this.listaComuni.forEach(item=>{
      if(item.id == form.value.indirizzoSedeOperativa.comune.id){
        form.value.indirizzoSedeOperativa.comune = item
      }
      if(item.id == form.value.indirizzoSedeLegale.comune.id){
        form.value.indirizzoSedeLegale.comune = item
      }
    })
    this.api.createCustomer(form.value).subscribe(data=>{
      console.log(data)
    })
    this.router.navigate(['/customer'])

  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
    this.api.getListaComuni().subscribe( data =>{
      this.listaComuni = data.content
    })
    this.api.getTipiCliente().subscribe(
      data=>{
        this.tipiCliente = data
      }
    )
    this.inizializzaForm();
    this.showForm = true;



  }

}
