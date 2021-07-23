import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  
  id:number
  form: FormGroup
  customer:any
  showForm:boolean = false
  listaComuni:any[]
  tipiCliente:any[]


  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private fb: FormBuilder) { }

  cSalva(DatiForm) {
    console.log(DatiForm.value)
    this.listaComuni.forEach(item=>{
      if(item.id === DatiForm.value.indirizzoSedeOperativa.comune.id){
        DatiForm.value.indirizzoSedeOperativa.comune = item
      }
      if(item.id === DatiForm.value.indirizzoSedeLegale.comune.id){
        DatiForm.value.indirizzoSedeLegale.comune = item
      }
    })
    this.api.updateCustomer(this.id,DatiForm.value).subscribe(data=>{
      console.log(data)
    })
    this.router.navigate(['/'])

  }
  inizializzaForm() {
    console.log('ciao')
    this.form = this.fb.group({
      ragioneSociale : ['', Validators.required],
      partitaIva: ['', Validators.required],
      email: ['', Validators.required],
      fatturatoAnnuale: [''],
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
      dataUltimoContatto: ['']

  })
  }

  carica(){
    if(this.id !==0){
      this.api.getCustomerDetail(this.id).subscribe(
        data => {
          console.log(data)
          this.customer = data
          delete this.customer.id
          console.log(this.customer)
          this.form.setValue(this.customer)
          this.showForm = true
        }
      )
    }
  }

  ngOnInit(): void {
    this.inizializzaForm();
    this.api.getListaComuni().subscribe(
      data => {this.listaComuni = data.content
      console.log(this.listaComuni)
      })
      this.api.getTipiCliente().subscribe(
        data=>{
          this.tipiCliente = data
          console.log(this.tipiCliente)
        }
      )
    console.log('ngOnInit is working');
    this.route.params.subscribe(params =>{
      this.id = +params['id']
      console.log(this.id)
      this.carica()
    });
  }

}
