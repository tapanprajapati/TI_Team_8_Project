/**
 
 *
 */
import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalErrorService } from '@app/@core/services/global-error.service';
import { NavigationService } from '@shared/navigation.service';
import { ApiResponseModel } from '@core/model/api-response.model';
import { untilDestroyed } from '@core';
import { APP_NAME } from '@core/const/app.const';
import { ProductModel } from '@core/model/product.model';
import { CartService } from '@app/cart/cart.service';
import { ProductService } from './../product.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '@app/@shared';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  product: ProductModel;
  private productId: string;
  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _globalErrorService: GlobalErrorService,
    private _navigationService: NavigationService,
    private _titleService: Title,
    private _matDialog: MatDialog,
    private _cartService: CartService
  ) {
    this._fetchProductId();
    this._setLoader(true);
  }

  ngOnInit() {
    this.getProductDetails(this.productId);
  }

  ngOnDestroy() {}

  getProductDetails(productId: string) {
    this._productService
      .getProductDetails(productId)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: ApiResponseModel) => {
          this._setLoader(false);
          if (res.items.length === 1) {
            this.product = res.items[0] as ProductModel;
            this._setProductTitle(this.product);
            this._fetchProductImage(this.product.id);
          } else {
            this._navigationService.navigateTo404();
          }
        },
        (err) => {
          this._setLoader(false);
          this._globalErrorService.reactToAppError(err);
        }
      );
  }

  addToCart(product: ProductModel) {
    const isCartAccessible = this._cartService.isCartAccessible(product);
    if (isCartAccessible) {
      this._cartService
        .isProductAvailableInCart(product.id)
        .pipe(untilDestroyed(this))
        .subscribe(
          (res: ApiResponseModel) => {
            if (res.result) {
              const dialogConfig = this._matDialogConfig;
              dialogConfig.data = { header: 'Failure!', content: 'Already exist in the cart.' };
              this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
            } else {
              this._cartService
                .addToCart(product)
                .pipe(untilDestroyed(this))
                .subscribe(
                  (cartRes: ApiResponseModel) => {
                    if (cartRes.success && cartRes.result.affectedRows === 1) {
                      const dialogConfig = this._matDialogConfig;
                      dialogConfig.data = { header: 'Success!', content: 'Added to cart.' };
                      this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
                    } // TODO: else block???
                  },
                  (cartErr) => {
                    this._globalErrorService.reactToAppError(cartErr);
                  }
                );
            }
          },
          (err) => {
            this._globalErrorService.reactToAppError(err);
          }
        );
    }
  }

  private _fetchProductId() {
    this._route.params.subscribe((params) => {
      this.productId = params.id;
    });
  }

  private _setProductTitle(product: ProductModel) {
    this._titleService.setTitle(`${product.name} - ${product.category.name} - ${APP_NAME}`);
  }

  private _setLoader(val: boolean) {
    this.isLoading = val;
  }

  private _fetchProductImage(productId: number) {
    this.product.imagePath = this._productService.fetchProductImage(productId);
  }
}
