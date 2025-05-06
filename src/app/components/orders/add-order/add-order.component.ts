import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent {

  orderForm!: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({

      orderId: ['',],
      orderFullName: ['',],
      orderFullOrder: ['',],
      orderContactNumber: ['',],
      orderAlternateContactNumber: ['',],
      orderStatus:['',],
      orderAmount:['',],
      address:['',],
      product: ['',],
      user:['',],
    });
  }

  Save() {
    this.orderService
      .postOrder(this.orderForm.value)
      .subscribe((res) => {
        this.toastr.success('Order Added Successfully');
        this.router.navigate(['/orders']);
        this.orderForm.reset();
      });
  }


}
