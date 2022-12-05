import { Pipe, PipeTransform } from '@angular/core';

import { Hero } from '../interfaces/hero.interface';


@Pipe({
  name: 'heroImg',
  pure: false
})
export class HeroImgPipe implements PipeTransform {

  transform(hero: Hero): string {

    if (!hero.id || (hero.alt_img == '' && !hero.alt_img?.includes(hero.id))) {
      return 'assets/no-image.png';
    }
    else if (hero.alt_img) {
      return hero.alt_img;
    }
    else {
      return `assets/heroes/${hero.id}.jpg`;
    }

  }

}
