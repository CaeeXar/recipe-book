import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

type Kaka = {
  title: string;
  description: string;
};

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  inputSearch = '';
  cols!: number;
  cards: Kaka[] = [
    {
      title: 'TEST GERICHT',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi nisi, vulputate a porta quis, egestas at ligula. Ut ultricies dolor sed luctus vulputate. In laoreet ligula at sapien semper, a porta sem lobortis. Nullam ac ex scelerisque nisi pharetra auctor ac at augue. Integer iaculis faucibus congue. Nulla laoreet ullamcorper enim sed fermentum. Donec eget rutrum urna, et luctus erat. Curabitur a purus pharetra, iaculis eros ac, luctus odio. Vestibulum nec vehicula metus, sed egestas mauris. Ut dignissim pretium ex. Praesent venenatis tellus id urna semper ultrices. Etiam ante mauris, gravida ac auctor at, rutrum vitae metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque quis diam neque. Duis mi est, dapibus finibus molestie vel, placerat vitae dolor. Sed congue eros nec metus cursus imperdiet. ',
    },
    {
      title: 'Pesto Pasta',
      description: 'Geile Pesto aus frischen Basilikum-Blüten.',
    },
    {
      title: '"Steinofen" Pizza',
      description:
        'Original italienischer Teig mit Steinofensimulation für den perfekten Knusperfaktor.',
    },
    {
      title: 'Asia Nudel-/Reisbox',
      description: 'Hähnchen und Gemüse mit Reis oder Nudel und dazu Teriyaki',
    },
    { title: 'Teriyaki Sauce', description: 'Beste. Teriyaki. Sauce. Ever.' },
    {
      title: 'Pesto Pasta',
      description: 'Geile Pesto aus frischen Basilikum-Blüten.',
    },
    {
      title: '"Steinofen" Pizza',
      description:
        'Original italienischer Teig mit Steinofensimulation für den perfekten Knusperfaktor.',
    },
    {
      title: 'Asia Nudel-/Reisbox',
      description: 'Hähnchen und Gemüse mit Reis oder Nudel und dazu Teriyaki',
    },
    { title: 'Teriyaki Sauce', description: 'Beste. Teriyaki. Sauce. Ever.' },
  ];
  filteredCards: Kaka[] = [];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.cards = this.cards.map((card) =>
      card.description.length > 200
        ? { ...card, description: card.description.substring(0, 225) + '...' }
        : card
    );
    this.filteredCards = this.cards;
  }

  ngOnInit() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(
        map((result) => {
          if (result.breakpoints[Breakpoints.XSmall]) return 1;
          if (result.breakpoints[Breakpoints.Small]) return 2;
          if (result.breakpoints[Breakpoints.Medium]) return 3;
          if (result.breakpoints[Breakpoints.Large]) return 4;
          if (result.breakpoints[Breakpoints.XLarge]) return 5;

          return 6;
        })
      )
      .subscribe((cols) => {
        this.cols = cols;
      });
  }

  onSearch(): void {
    if (this.inputSearch.length < 3) {
      this.filteredCards = this.cards;
      return;
    }

    this.filteredCards = this.cards.filter((card: Kaka) => {
      return Object.values(card)
        .join(' ')
        .toLowerCase()
        .includes(this.inputSearch.toLowerCase());
    });
  }
}
