import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';

import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  searchTerm: string = '';
  heroes: Hero[] = [];

  selectedHero!: Hero | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  searching() {
    this.heroesService.getSuggestions(this.searchTerm.trim())
      .subscribe(heroes => this.heroes = heroes);
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroes = [];
      this.searchTerm = '';
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;

    this.searchTerm = hero.superhero;
    this.heroesService.getHeroById(hero.id!)
      .subscribe(hero => this.selectedHero = hero);
  }

}
