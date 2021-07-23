import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-invoices-detail',
  templateUrl: './invoices-detail.component.html',
  styleUrls: ['./invoices-detail.component.css']
})
export class InvoicesDetailComponent implements OnInit {
  invoice:any;
  id:number;
  form: FormGroup;
  showForm: boolean = false;


  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  inizializzaForm() {
    console.log('Simone er numero Uno')
    this.form = this.fb.group({
        data: [''],
        numero:[''],
        anno: [''],
        importo: [''],
        stato: this.fb.group({
          id: [''],
          nome: ['']
        }),
        cliente: this.fb.group({
          id: ['']
        })

    })
  }
  carica() {
    if(this.id !==0){
        console.log(this.invoice)
          let newInvoice = {
            'data': this.invoice.data,
            'numero': this.invoice.numero,
            'anno': this.invoice.anno,
            'importo': this.invoice.importo,
            'stato': {
              'id': this.invoice.stato.id,
              'nome': this.invoice.stato.nome,
            },
            'cliente': {
              'id': this.invoice.cliente.id
            },
          }
          this.form.setValue(newInvoice)
          this.showForm = true
        
        }
    }
  cSalva(DatiForm) {
    console.log(DatiForm.value)
    this.api.updateInvoice(this.id,DatiForm.value).subscribe(data=>{
      console.log(data)
    })
    this.router.navigate(['/invoice'])

  }

  ngOnInit(): void {
    
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
    this.api.getInvoiceDetail(this.id).subscribe(
      (response:any) => {
        console.log(response);
        if(response){
              this.invoice = response;
              this.invoice.data = this.invoice.data.substring(0,10)
              this.inizializzaForm();
              this.carica();
              console.log(response);
        } else {
              setTimeout(()=> this.router.navigate(['/']),5000);
       }
      })
    }
  }


