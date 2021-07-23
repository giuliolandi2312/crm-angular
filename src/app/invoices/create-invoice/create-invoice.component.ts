import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  id:any;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private fb: FormBuilder) { }

  inizializzaForm() {
    console.log('Simone er numero Uno')
    this.form = this.fb.group({
        data: [''],
        numero:[''],
        anno: [''],
        importo: [''],
        stato: this.fb.group({
          //id: [''],
          nome: ['']
        }),
        cliente: this.fb.group({
          id: [this.id]
        })

    })
  }

  crea(form){
    form.value.stato.id = form.value.stato.nome === 'PAGATA' ? '1' : '2'
    this.api.createInvoice(form.value).subscribe(
      data=> {
        console.log(data)
        this.router.navigate(['invoice','customer',this.id])
      }
    )
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
    this.inizializzaForm()
  }

}
