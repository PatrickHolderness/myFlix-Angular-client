import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  @Input() userData: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<UserUpdateComponent>
  ) { }

  ngOnInit(): void {
  }

  /**
   * Access API sending POST request to update user profile
   * 
   * @function updateAppUser 
   */

  updateAppUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((resp:any) => {
      console.log(resp);
      this.dialogRef.close();
      this.snackbar.open('Your profile has been updated', 'ok', {
        duration: 3000
      });
    })
  }
  
}