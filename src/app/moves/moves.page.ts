import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.page.html',
  styleUrls: ['./moves.page.scss'],
})
export class MovesPage implements OnInit {
  details: any;
  constructor(
    private route: ActivatedRoute,
    private pokeService: PokemonService
  ) {}

  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('index');
    this.pokeService.getPokeDetails(index).subscribe((details) => {
      console.log(details);
      this.details = details;
    });
  }
}
