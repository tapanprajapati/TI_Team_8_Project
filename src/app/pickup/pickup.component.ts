import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss']
})
export class PickupComponent implements OnInit {
  pickupForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this._createPickupForm();
  }
  pickup(){

  }
  get phone() {
    return this.pickupForm.controls.phone;
  }
  get zipcode() {
    return this.pickupForm.controls.zipcode;
  }
  get address1() {
    return this.pickupForm.controls.address1;
  }
  get address2() {
    return this.pickupForm.controls.address2;
  }
  get name() {
    return this.pickupForm.controls.name;
  }
  get pickupslot() {
    return this.pickupForm.controls.pickupslot;
  }
  get pickupTime() {
    return this.pickupForm.controls.pickupTime;
  }
  private _createPickupForm() {
    this.pickupForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern('^([0-9]){10}$')]],
      name: [''],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      zipcode: ['', Validators.required],
      pickupslot: ['', Validators.required],
      pickupTime: ['', [Validators.required, Validators.min(9), Validators.max(18)]],
    });
  }

}
