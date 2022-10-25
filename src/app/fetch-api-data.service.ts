import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


// Declaring the api url that will provide data for the app
const apiUrl = 'https://movie-info-online.herokuapp.com/';

//get token
const token = localStorage.getItem('token');
//get username stored locally
const username = localStorage.getItem('username');

@Injectable({
    providedIn: 'root'
  })
  export class FetchApiDataService {
    // Inject HttpClient module to constructor params
    constructor(private http: HttpClient) { }
  
    /**
     * calls API endpoint to register a new user
     * @param userDetails 
     * @returns a new user object in JSON format
     */
    public userRegistration(userDetails: any): Observable<any> {
      console.log(userDetails);
      return this.http
        .post(apiUrl + 'users', userDetails)
        .pipe(
          catchError(this.handleError)
        );
    }

  // Log existing user in
//   @param userDetails - object containing username and password
// @returns data of the user in JSON format
//
public userLogin(userDetails: any): Observable<any> {
 console.log(userDetails);
 return this.http
   .post(apiUrl + 'login', userDetails)
   .pipe(catchError(this.handleError));
}

  // Get a list of all movies
  public getAllMovies(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies', {
          headers: new HttpHeaders(
              {
                  Authorization: 'Bearer ' + token,
              })
      }).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
      );
  }

      // Get a single movie's details from database
      public getMovie(movieTitle: String): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/' + movieTitle, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // Get a director's details from database
    public getDirector(directorName: String): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/directors/' + directorName, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // Get a genre's details from database
    public getGenre(genreName: String): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/genres/' + genreName, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // Get a user's details from database
    public getUser(username: String): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'users/' + username, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // Add to favourites list, by movieID
    public addToFavorites(username: String, movieId: Number): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.post(apiUrl + 'users/' + username + '/FavoriteMovies/' + movieId, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // Edit a user's details
    public editUser(username: String, userDetails: any): Observable<any> {
        console.log(userDetails);
        const token = localStorage.getItem('token');
        return this.http.put(apiUrl + 'users/' + username, userDetails, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // Delete a user from database
    public deleteUser(username: String): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.delete(apiUrl + 'users/' + username, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // Delete from favourites list
    public deleteFromFavorites(username: String, movieId: Number): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.delete(apiUrl + 'users/' + username + '/FavoriteMovies/' + movieId, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

     /**
   * extracts response data from HTTP response
   * @param res 
   * @returns response body or empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
  
  // Error handling
  private handleError(error: HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
          console.error('Some error occurred:', error.error.message);
      } else {
          console.error(
              `Error Status code ${error.status}, ` +
              `Error body is: ${error.error}`);
      }
      return throwError(() => new Error(
          'Something bad happened; please try again later.'));
  }
}