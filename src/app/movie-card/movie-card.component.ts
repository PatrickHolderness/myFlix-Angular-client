import { GenreComponent } from './../genre/genre.component';
import { DirectorComponent } from './../director/director.component';
import { SynopsisComponent } from './../synopsis/synopsis.component';
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favMovies: any[] = [];


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

/**
   * Get movie array from API
   *
   * @returns {object[]} - array of movies 
   * @function getMovies
   */

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
/**
   * Used to check if movie is a favorite or not
   * 
   * @param id 
   * @returns {boolean} 
   * @function isFav
   */

  isFav(id: string): boolean {
    return this.favMovies.includes(id);
  }

  /**
   * Gets list of favorite movies
   * 
   * @returns {object[]} movie array
   * @function getFavMovies
   */

   getFavMovies(): void {
    this.fetchApiData.getFavMovie().subscribe((resp: any) => {
      this.favMovies = resp;
      return this.favMovies;
    })
  }

  /**
   * Post new movie to array
   * 
   * @returns {object[]} movie array
   * @param id 
   * @function addToFav 
   */

  addToFav(id: string): void {
    this.fetchApiData.addFavMovie(id).subscribe((resp: any) => {
      console.log(resp);
      this.ngOnInit();
    });
  }

  /**
   * Delete movie from array
   * 
   * @returns {object[]} movie array
   * @param id 
   * @function delFav
   */

  delFavMovie(id: string): void {
    console.log('removed '+ id);
    this.fetchApiData.delFavMovie(id).subscribe((resp: any) => {
      console.log(resp);
      this.ngOnInit();
    })
  }

  /**
   * Dialog opens with genre data
   * 
   * @param name 
   * @param description 
   * @function openGenreDialog
   */


  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '480px'
    })
  }

  /**
   * Dialog opens with director data
   * 
   * @param name 
   * @param bio 
   * @function openDirectorDialog
   */

  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open (DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
       
      },
      width: '480px'
    })
  }

  /**
   * Dialog opens with movie description
   * 
   * @param title 
   * @param description 
   * @function openSynopsisDialog
   */


  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open( SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '480px'
    })
  }
}