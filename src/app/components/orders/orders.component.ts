import { Component } from '@angular/core';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { OrderDetails } from './models/order.model';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  dataSource!: MatTableDataSource<any>;
  statusList: any[] = [
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];
  displayedColumns: string[] = [
    'orderId',
    'ProductName',
    'Name',
    'Address',
    'Contact No',
    'Amount',
    'Order Status',
    'Action',
  ];
  orderId: any;
  // Id: any;

  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }
  addOrder() {
    this.router.navigate(['/orders/add-order']);
  }
  getOrderDetails() {
    this.orderService.getOrders().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  markAsDelivered(orderId: any) {
    console.log(orderId);
    this.orderService.getOrderById(orderId).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
