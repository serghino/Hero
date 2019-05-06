import { Component, OnInit } from '@angular/core';
import { Iheroe } from '../../interfaces/iheroe.object';
import { HeroesService } from 'src/app/services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  private heroe: Iheroe = {
    name: '',
    team: '',
    bio: 'Marvel'
  };
  newHeroe: boolean = false;
  keyHeroe: string;

  constructor(private serviceheroe: HeroesService,
              private route: Router,
              private activeroute: ActivatedRoute) {
                this.activeroute.params.subscribe(param => this.keyHeroe = param.id);
                if(this.keyHeroe != 'new'){
                  this.serviceheroe.gethero(this.keyHeroe).subscribe((context: Iheroe) => {
                    this.heroe = context;
                  });
                }
               }

  ngOnInit() {
  }

  saveHeroe() {
    if(this.keyHeroe == 'new'){
      this.serviceheroe.addhero(this.heroe).subscribe(resp => {
        this.route.navigate(['/heroe', resp['name']]);
      }, error => {
        console.log(error);
      });
    } else{
      this.serviceheroe.updatehero(this.heroe, this.keyHeroe).subscribe(resp => {
        console.log(resp);
      }, error => {
        console.log(error);
      });
    }
  }
  newhero(form: NgForm){
    this.route.navigate(['/heroe','new']);
    form.reset();
  }
}
