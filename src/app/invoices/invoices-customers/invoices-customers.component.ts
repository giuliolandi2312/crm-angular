import { Component, OnInit, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

const FILTER_PAG_REGEX = /[^0-9]/g; 

interface invoicesCustomerList {
  id: number;
  numero: any;
  anno: any;
  importo:any;
  data:any;
}

export type SortColumn = keyof invoicesCustomerList | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-invoices-customers',
  templateUrl: './invoices-customers.component.html',
  styleUrls: ['./invoices-customers.component.css']
})
export class FattureClientiComponent implements OnInit {

  invoices: any[]
  message: string;
  errors = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  id:any;
  sort:any = 'id';
  order:any = 'ASC';

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  getAllInvoices() {
    return this.api.getInvoiceCustomerList(this.page,this.pageSize,this.id, this.sort +','+this.order).subscribe(
      (response:any) => {
        console.log(response)
        this.invoices = response.content;
        this.collectionSize = response.totalElements
   
      },
      (error: any) => {
        console.log('Errore dal component', error.message);
        this.errors = true;
        this.message = 'Ooops, qualcosa è andato storto!'
        setTimeout(()=> this.router.navigate(['/']), 5000)
      });
  } 

  selectPage(page: string) {
    this.page = parseInt(page, this.page || 1);
    this.getAllInvoices();
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
    this.getAllInvoices();
  }

  goInvoiceDetail(id):any {
    this.router.navigate(['invoice/'+id])
    console.log(id)
  }

  goToCreate(){
    this.router.navigate(['invoice/create/'+ this.id])
  }

  deleteThisCustomerInvoice(id:any){
    if(confirm('Sei sicuro di voler cancellare?')){
      this.api.deleteCustomerInvoice(id).subscribe(
        data=> {
          console.log(data)
          let index = this.invoices.findIndex( (value)=> {
            return value.id === id
          })
          if(index != -1){
            this.invoices.splice(index,1)
          }
        }
      )
    }
  }
  onSort({column, direction}: SortEvent) {
    console.log('CIAO')

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });


    if (direction === '' || column === '') {
      console.log(column, direction)
      this.order = 'ASC';
      this.sort = 'id';

    } else {
      console.log(direction)
      this.order = direction.toUpperCase();
      this.sort = column
      console.log(this.order,this.sort)

    }
    this.getAllInvoices()
  }




  
}
