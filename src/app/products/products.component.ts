/**
 
 *
 */

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { untilDestroyed } from '@core';
import { slideToBottom } from '@core/animations/animation';

import { ProductModel } from '@core/model/product.model';
import { CategoryModel } from '@core/model/category.model';
import { ApiResponseModel } from '@core/model/api-response.model';

import { GlobalErrorService } from '@app/@core/services/global-error.service';
import { ProductService } from './product.service';
import { CartService } from '@app/cart/cart.service';

import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '@app/@shared';
import { AuthenticationService } from '@app/auth';
import { UserModel } from '@core/model/user.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [slideToBottom],
})
export class ProductsComponent implements OnInit, OnDestroy {
  filteredProducts: ProductModel[];
  categories: CategoryModel[];
  searchedProduct: string;
  categoryControl = new FormControl();
  faFilter = faFilter;
  faSearch = faSearch;
  isLoading: boolean;
  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _matDialog: MatDialog,
    private _cartService: CartService,
    private _globalErrorService: GlobalErrorService
  ) {}

  ngOnInit() {
    this._showLoader(true);
    this.resetProducts();
    this._observeQueryParams();
    this.getAllCategories();
  }

  ngOnDestroy() {}

  getProducts(queryParams: any) {
    this._productService
      .getAllProducts(queryParams)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: ApiResponseModel) => {
          this.filteredProducts = res.items as ProductModel[];
          this._fetchProductImages(this.filteredProducts);
          this._showLoader(false);
        },
        (err) => {
          this._globalErrorService.reactToAppError(err);
          this._showLoader(false);
        }
      );
  }

  getAllCategories() {
    this._productService
      .getAllCategories()
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: ApiResponseModel) => {
          this.categories = res.items as CategoryModel[];
        },
        (err) => {
          this._globalErrorService.reactToAppError(err);
        }
      );
  }

  goToProductDetails(productId: string) {
    this._router.navigate([`/products/${productId}`]);
  }

  addToCart(product: ProductModel, event: Event) {
    event.stopPropagation();
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
              // TODO: Product already exist in the cart
              // Show an appropriate message
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
                      // TODO: Show message that product has been added successfully
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

  filterProductsByName(productName: string) {
    this._router.navigate(['/products'], {
      queryParams: { search: productName },
      queryParamsHandling: 'merge',
    });
  }

  categorySelectionToggled(isOpened: boolean) {
    const selectedCategories = this.categoryControl.value;
    if (!isOpened && this.categoryControl.value?.length > 0) {
      this._router.navigate(['/products'], {
        queryParams: {
          filter:
            selectedCategories?.length > 1
              ? encodeURIComponent(selectedCategories.join(','))
              : selectedCategories.toString(),
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  resetProducts() {
    this._router.navigate(['/products']);
    this.searchedProduct = '';
    this.categoryControl.reset();
  }

  private _observeQueryParams() {
    this._activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      this.getProducts(params);
    });
  }

  private _fetchProductImages(products: ProductModel[]) {
    products.forEach((product) => {
      product.imagePath = this._productService.fetchProductImage(product.id);
    });
  }

  private _showLoader(val: boolean) {
    this.isLoading = val;
  }
}
