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
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserUpdateComponent>,
    public router: Router
    ) { }

  ngOnInit(): void {
  }

  /**
   * Access API sending POST request to update user profile
   * 
   * @function updateAppUser 
   */

  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((resp:any) => {
      console.log(resp);
      this.dialogRef.close();
      this.snackBar.open('Your profile has been updated', 'ok', {
        duration: 3000
      });
    
      // Log out user if they update Username or Password to avoid errors
      if (this.userData.Username || this.userData.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Please login again with your new credentials',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    });
  }
}