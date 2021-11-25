import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { PokemonService } from '../services/pokemon.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  offset = 0;
  pokemon = [];
  detail_2: any;
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  constructor(private pokeService: PokemonService) {}

  ngOnInit() {
    this.loadPokemon();
    // this.loadDetail();
  }
  // loadDetail(){
  //   this.pokeService.getPokeDetails()
  // }
  loadPokemon(loadMore = false, event?) {
    if (loadMore) {
      this.offset += 20;
    }

    this.pokeService.getApiData(this.offset).subscribe((res) => {
      this.pokemon = [...this.pokemon, ...res];
      if (event) {
        event.target.complete();
      }
    });
  }
  onSearchChange(e) {
    let value = e.detail.value;

    if (value == '') {
      this.offset = 0;
      this.loadPokemon();
      return;
    }
    this.pokeService.findPokemon(value).subscribe(
      (res) => {
        this.pokemon = [res];
      },
      (err) => {
        this.pokemon = [];
      }
    );
  }
}
