import { MovieCardComponent } from './../movie-card/movie-card.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any={};

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Routes to movie page - "/movies"
   * 
   * @function goToIndex
   */

  goToIndex(): void {
    this.router.navigate(['movies']);
    
  }

  /**
   * Routes to profile page - "/profile"
   * 
   * @function goToProfile
   */

  goToProfile(): void {
    this.router.navigate(['profile'])

  }

  /**
   * Logs user out and routes to welcome page 
   */

  userLogOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome'])
  }

  /**
   * Get User data from API
   * 
   * @function getUser
   */

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      return this.userLogOut;
    })
  }
}