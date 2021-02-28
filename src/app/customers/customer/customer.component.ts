import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../shared/customer.service'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  custIdUpdate = null; 
  constructor(public custservice: CustomerService, private toastr: ToastrService) { 
    
  }

  ngOnInit():void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    debugger;
    if (form != null)
      form.reset();
    this.custservice.selectedCustomer = {
      CustId: 0,
      Name: '',
      Address: '',
      Mobile: '',
      Email: ''
    }
  }

  onSubmit(form: NgForm) {
    debugger;
    console.log(form.value.CustId);
    if(form.value.CustId==null)
    {
      form.value.CustId=0;
    }
    this.custservice.selectedCustomer.CustId=form.value.CustId
    if (this.custservice.selectedCustomer.CustId == 0) {
      this.custservice.addCustomer(form.value)
        .subscribe(data => {
          form.value.CustId=0;
          this.resetForm(form);
          this.custservice.getCustomerList();
          this.toastr.success('New Record Added Succcessfully', 'Customer Registration');
        })
    }
    else {
      console.log("hello");
      this.custservice.updateCustomer(form.value.CustId, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.custservice.getCustomerList();
        this.toastr.info('Record Updated Successfully!', 'Customer Registration');
      });
    }
  }
    

}
