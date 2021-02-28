import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/shared/customer.model';
import { CustomerService} from '../../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  allCustomers: Observable<Customer[]>;  
  constructor(public custservice: CustomerService,
                       private toastr : ToastrService) { }
  ngOnInit() {
    this.loadAllCustomers();  
  }
  loadAllCustomers() {  
    this.allCustomers = this.custservice.getCustomerList();  
  }  
  getCustomerList() {  
   this.custservice.getCustomerList();  
  }  
  showForEdit(cust: Customer) {
    debugger;;
    this.custservice.selectedCustomer = Object.assign({}, cust);;
  }
  onDelete(id: number) {
    debugger;
    if (confirm('Are you sure to delete this record ?') == true) {
      this.custservice.deleteCustomer(id)
      .subscribe(x => {
        this.custservice.getCustomerList();
        this.toastr.warning("Deleted Successfully","Employee Register");
      })
    }
  }
}
