/**
 *
 *
 */

import { WorkersService } from '../services/workers.service';
import { Workers } from '../../@core/model/workers.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-worker-delete-dialog',
  templateUrl: './worker-delete-dialog.component.html',
  styleUrls: ['./worker-delete-dialog.component.scss'],
})
export class WorkerDeleteDialogComponent implements OnInit {
  workers: Workers[] = [];
  BannerId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  RoleId: number;
  RoleName: string;

  constructor(
    public dialogRef: MatDialogRef<WorkerDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Workers,
    public service: WorkersService,
    private router: Router
  ) {
    this.BannerId = data.BannerId;
    this.FirstName = data.FirstName;
    this.LastName = data.LastName;
    this.Email = data.Email;
    this.RoleId = data.RoleId;
    this.RoleName = data.RoleName;
  }

  ngOnInit(): void {}

  confirm(form: NgForm) {
    this.dialogRef.close(form.value);
  }
}
