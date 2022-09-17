import { Pipe, PipeTransform } from '@angular/core';

import { Hero } from '../interfaces/hero.interface';


@Pipe({
  name: 'heroImg'
})
export class HeroImgPipe implements PipeTransform {

  transform(hero: Hero): string {
    return `assets/heroes/${hero.id}.jpg`;
  }

}
