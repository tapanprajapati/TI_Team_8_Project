import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminOrderService } from './../services/admin-order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalErrorService } from '@app/@core/services/global-error.service';
import { OrderModel } from '@app/@core/model/order.model';
import { untilDestroyed } from '@app/@core';
import { ApiResponseModel } from '@app/@core/model/api-response.model';
import { MatDialog } from '@angular/material/dialog';
import { AdminOrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['orderId', 'BannerId', 'OrderDate', 'PickUpSlot', 'Status', 'view'];
  dataSource: MatTableDataSource<OrderModel>;
  orders: OrderModel[] = [];
  isLoading: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private _adminOrderService: AdminOrderService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _globalErrorService: GlobalErrorService,
    public dialog: MatDialog
  ) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this._adminOrderService
      .getAllOrders()
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: ApiResponseModel) => {
          this.orders = res.items as OrderModel[];
          this.setUpDataSource();
          this._showLoader(false);
        },
        (err) => {
          this._globalErrorService.reactToAppError(err);
          this._showLoader(false);
        }
      );
  }

  openOrder(orderId: number) {
    const dialogRef = this.dialog.open(AdminOrderDetailsDialogComponent, {
      width: '90vw',
      height: '90vh',
      data: orderId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getOrders();
    });
  }

  setUpDataSource() {
    this.dataSource = new MatTableDataSource<OrderModel>(this.orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private _showLoader(val: boolean) {
    this.isLoading = val;
  }
}
