import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 10px;
    }
  `]
})
export class AddComponent implements OnInit {

  publishers = ['DC Comics', 'Marvel Comics'];

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
    publisher: Publisher.DCComics,
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private heroesService: HeroesService,
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroesService.getHeroById(id))
      )
      .subscribe(hero => this.hero = hero);
  }

  saveHero() {
    if (this.hero.superhero.trim().length === 0) return;

    if (this.hero.id) {
      this.heroesService.updateHero(this.hero)
        .subscribe(() => this.showSnackbar('Registro actualizado correctamente!'));
    }
    else {
      this.heroesService.addHero(this.hero)
        .subscribe(hero => {
          this.showSnackbar('Registro creado correctamente!');
          this.router.navigate(['/heroes/edit', hero.id]);
        });
    }
  }

  deleteHero() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: this.hero
    });

    dialog.afterClosed().subscribe(resp => {
      if (resp) {
        this.heroesService.deleteHero(this.hero.id!)
          .subscribe(() => this.router.navigate(['/heroes']));
      }
    });
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'Cerrar', {
      duration: 2500
    });
  }

}
























