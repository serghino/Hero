import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: any = [];
  loading: boolean = false;
  constructor(private _herores: HeroesService) { 
    this._herores.getheroes().subscribe((context): any => {
       this.heroes = context;
       this.loading = true;
    });
  }

  ngOnInit() {
  }

  deleteHeroe(key: string){
    this._herores.deletehero(key).subscribe(context => {
      if(context){
        console.error(context);
      }else{
        delete this.heroes[key];
      }
    });
  }

}
