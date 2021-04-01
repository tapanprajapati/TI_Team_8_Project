import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { WorkersService } from '../services/workers.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DonationsResponse, Donations } from '../../@core/model/donation.model';

@Component({
  selector: 'app-admin-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss'],
})
export class AdminWorkersComponent implements OnInit {
  columns: string[] = ['Name', 'AddressLine1', 'AddressLine2', 'ZipCode', 'Phone', 'PickUpSlot'];
  index = ['Name', 'AddressLine1', 'AddressLine2', 'ZipCode', 'Phone', 'PickUpSlot'];

  donations: Donations[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public service: WorkersService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Donations
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getWorkersList().subscribe(
      (response: DonationsResponse) => {
        this.donations = response?.items;
        console.log(this.donations);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
