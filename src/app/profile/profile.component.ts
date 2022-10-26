import { UserUpdateComponent } from './../user-update/user-update.component';
import { WelcomePageComponent } from './../welcome-page/welcome-page.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Gets user data from API
   * 
   * @function getUser
   */

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
    this.user = resp;
    console.log(this.user);
    return this.user;
    });
  }

  /**
   * Opens dialog for User-Update component
   * 
   * @openUpdateUserDialog
   */

  openUpdateUserDialog(): void {
    this.dialog.open(UserUpdateComponent, {
      width: '440px'
    })
  }

  /**
   * Deletes user data from API
   * 
   
   */

  delUser(): void {
    if (
      confirm("Are you sure?")
    ) {
      this.router.navigate(['welcome']);
      this.snackbar.open('Your profile has been deleted', 'ok', {
        duration: 3000
      });
    }
    {
      this.fetchApiData.delUser().subscribe((result) => {
        console.log(result)
        localStorage.clear();
      });
    }
  }
}