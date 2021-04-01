/**
 * @author Samkit Shah <samkit@dal.ca>
 */
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../products/product.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductModel } from '@core/model/product.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '@shared/mat-dialog-wrapper/mat-dialog-wrapper.component';
import { CheckoutService } from './checkout.service';
import { CartService } from '@app/cart/cart.service';
import { GlobalErrorService } from '@app/@core/services/global-error.service';
import { faLongArrowAltLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { untilDestroyed } from '@app/@core';
import { ApiResponseModel } from '@app/@core/model/api-response.model';
import { AuthenticationService } from '@app/auth';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cartItems: ProductModel[];
  isLoading: boolean;
  faLongArrowAltLeft = faLongArrowAltLeft;
  faTimes = faTimes;
  filteredProducts: ProductModel[];
  checkoutForm: FormGroup;
  currentDate = new Date();
  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private _matDialog: MatDialog,
    private _checkoutService: CheckoutService,
    private _productService: ProductService,
    private _cartService: CartService,
    private _globalErrorService: GlobalErrorService
  ) {}

  ngOnInit(): void {
    this._createCheckoutForm();
    this._loadShoppingCart();
  }
  ngOnDestroy() {}

  // This function will be called when the user click on the checkout button.
  checkout() {
    try {
      if (this.checkoutForm.valid) {
        this._checkoutService.createOrder(this.checkoutForm.value).subscribe(
          (res) => {
            const dialogConfig = this._matDialogConfig;
            dialogConfig.data = { header: 'Success!', content: 'Order Placed successfully.' };
            this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
            this._router.navigate(['/products']);
          },
          (error) => {
            if (error.status === 500) {
              const dialogConfig = this._matDialogConfig;
              dialogConfig.data = { header: 'Failure!', content: 'Order failed.' };
              this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
              this._router.navigate(['/products']);
            }
          }
        );
      }
    } catch (e) {
      const dialogConfig = this._matDialogConfig;
      dialogConfig.data = { header: 'Failure!', content: 'Error Occured.' };
      this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
    }
  }

  deleteProductFromCart(cartProduct: ProductModel) {
    this._cartService
      .deleteProductFromCart(cartProduct.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: ApiResponseModel) => {
          if (res.success && res.result.affectedRows === 1) {
            const dialogConfig = this._matDialogConfig;
            dialogConfig.data = { header: 'Success!', content: 'Product Deleted.' };
            this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
            this._loadShoppingCart();
          } // TODO: handle else block
        },
        (err) => {
          this._globalErrorService.reactToAppError(err);
        }
      );
  }

  get firstName() {
    return this.checkoutForm.controls.firstName;
  }
  get lastName() {
    return this.checkoutForm.controls.lastName;
  }
  get email() {
    return this.checkoutForm.controls.email;
  }
  get contactNumber() {
    return this.checkoutForm.controls.contactNumber;
  }
  get pickupDate() {
    return this.checkoutForm.controls.pickupDate;
  }
  get pickupTime() {
    return this.checkoutForm.controls.pickupTime;
  }

  private _createCheckoutForm() {
    this.checkoutForm = this.formBuilder.group({
      email: [`${this._authenticationService.authUserEmail}`],
      // bannerId: ['', [Validators.required, Validators.pattern(`^${this._authenticationService.authUserBannerId}$`)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.minLength(10)]],
      pickupDate: ['', Validators.required],
      pickupTime: ['', [Validators.required]],
    });
  }

  private _getCartProducts() {
    this._cartService
      .getCartProducts()
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: ApiResponseModel) => {
          this.cartItems = res.items as ProductModel[];
          this._fetchCartProductImages(this.cartItems);
          this._setLoader(false);
        },
        (err) => {
          this._globalErrorService.reactToAppError(err);
        }
      );
  }

  private _fetchCartProductImages(cartProducts: ProductModel[]) {
    cartProducts.forEach((cartProduct) => {
      cartProduct.imagePath = this._productService.fetchProductImage(cartProduct.id);
    });
  }

  private _setLoader(val: boolean) {
    this.isLoading = val;
  }

  private _loadShoppingCart() {
    this._setLoader(true);
    this._getCartProducts();
  }
}
