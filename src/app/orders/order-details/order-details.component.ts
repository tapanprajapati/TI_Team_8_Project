/**
 * @author Malav Jani <ml805403@dal.ca>
 *
 */
import { ProductService } from './../../products/product.service';
import { OrderDetailModel, OrderModel, item } from './../../@core/model/order.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { OrderService } from './../order.service';
import { untilDestroyed } from '@app/@core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  orderId: number;
  order: OrderDetailModel;
  orderStatus = ['PLACED', 'APPROVED', 'PROCESSING', 'RECEIVED'];

  constructor(
    private _route: ActivatedRoute,
    private _orderService: OrderService,
    private _productService: ProductService
  ) {}

  ngOnInit() {
    this._observeOrderId();
    this._getOrderDetails(this.orderId);
  }
  ngOnDestroy() {}

  private _observeOrderId() {
    this._route.params.pipe(untilDestroyed(this)).subscribe((params) => {
      this.orderId = +params.id;
    });
  }
  private _getOrderDetails(orderId: number) {
    this._orderService.getOrderDetails(orderId).subscribe((res) => {
      this.order = res['items'] as OrderDetailModel;
      this._fetchProductImages(this.order.item);
    });
  }
  private _fetchProductImages(products: item[]) {
    products.forEach((product) => {
      product.imagePath = this._productService.fetchProductImage(product.ItemId);
    });
  }
}
