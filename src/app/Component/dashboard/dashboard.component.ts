import { Component,OnInit } from '@angular/core';
import { Movie } from 'src/app/Model/movie';
import { DataService } from 'src/app/Service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  latestMovie: any;
  popularMovies !: Movie;
  nowPlayingMovies !: any;
  topRatedMovies !: Movie;
  upComingMovies !: Movie;
  trendingMovies !: Movie; 
  originals !: Movie; 
  constructor(private dataservice : DataService) {}
  ngOnInit(): void {
   this.getLatestMovie();
   this.getPopularMovies();
   this.getNowPlayingMovies();
   this.getTopRatedMovies();
   this.getUpcomingMovies();
   this.getTrendingMovies();
   this.getOriginalMovies();

  }
  getLatestMovie() {
    this.dataservice.getLatestMovie().subscribe((res: any) =>{
      this.latestMovie = this.changeData(res);
      console.log(`latest:${this.latestMovie}`);
    },(err: any) => {
      console.log("Not able to get latest movie",err);
    })
  }
  changeData(res: any): any {
    if(!res.backdrop_path){
      res.backdrop_path =  'http://image.tmdb.org/t/p/original'+res.poster_path+'?api_key='+environment.api_key;
    }else{
      res.backdrop_path =  'http://image.tmdb.org/t/p/original'+res.backdrop_path+'?api_key='+environment.api_key;
    }
    return res;
  }
  getPopularMovies() {
    this.dataservice.getPopularMovies().subscribe((res: any) =>{
       this.popularMovies = this.modifyData(res);
       console.log(this.popularMovies);
       
    },err =>{
      console.log("Error while fething movies", err)
    })
  }
  getNowPlayingMovies() {
    this.dataservice.getNowPlayingMovies().subscribe((res: any) =>{
       this.nowPlayingMovies = this.modifyData(res);
    },err =>{
      console.log("Error while fething movies", err)
    })
  }
  getTopRatedMovies() {
    this.dataservice. getTopRatedMovies().subscribe((res: any) =>{
       this.topRatedMovies = this.modifyData(res);
    },err =>{
      console.log("Error while fething movies", err)
    })
  }
  getUpcomingMovies() {
    this.dataservice. getUpcomingMovies().subscribe((res: any) =>{
       this.upComingMovies = this.modifyData(res);
    },err =>{
      console.log("Error while fething movies", err)
    })
  }
  getTrendingMovies() {
    this.dataservice. getTrendingMovies().subscribe((res: any) =>{
       this.trendingMovies = this.modifyData(res);
    },err =>{
      console.log("Error while fething movies", err)
    })
  }
  getOriginalMovies() {
    this.dataservice.getOriginals().subscribe((res: any) =>{
       this.originals = this.modifyData(res);
    },err =>{
      console.log("Error while fething movies", err)
    })
  }
  
  modifyData(movies :Movie) : Movie {
    if(movies.results) {
      movies.results.forEach(element => {
        element.backdrop_path = 'http://image.tmdb.org/t/p/original'+element.backdrop_path+'?api_key='+environment.api_key;
        if(!element.title) {
          element.title = element?.name;
        }
      });
    }
    return movies;
  }
  
}
 

