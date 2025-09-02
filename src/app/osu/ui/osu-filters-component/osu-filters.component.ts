import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { genres, GenresEnum } from '../../model/genres';
import { languages, LanguagesEnum } from '../../model/languages';
import { OsuFiltersService } from '../../data-access/osu-filters.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'osu-filters-component',
  standalone: true,
  imports: [ReactiveFormsModule, MatSliderModule],
  templateUrl: './osu-filters.component.html',
  styleUrl: './osu-filters.component.scss',
})
export class OsuFiltersComponent {
  protected isVisible = true;

  protected genreEntries = Object.entries(genres).map(([key, value]) => ({
    id: parseInt(key) as GenresEnum,
    name: value,
  }));
  protected languageEntries = Object.entries(languages).map(([key, value]) => ({
    id: parseInt(key) as LanguagesEnum,
    name: value,
  }));

  private filtersService = inject(OsuFiltersService);

  topPP = this.filtersService.filters().topPP;
  topStars = this.filtersService.filters().topStars;


  
  protected filters = new FormGroup({
    search: new FormControl<string>(''),
    starsMin: new FormControl<number>(0),
    starsMax: new FormControl<number>(this.topStars),
    ppMin: new FormControl<number>(0),
    ppMax: new FormControl<number>(this.topPP),
  });
  
  private selectedLanguages = [] as LanguagesEnum[];
  private selectedGenres = [] as GenresEnum[];

  constructor() {
    // Nasłuchuj zmian w formularzu i aktualizuj serwis
    this.filters.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateFiltersService();
      });
  }

  private updateFiltersService() {
    this.filtersService.updateFilters({
      search: this.filters.value.search || '',
      starsMin: this.filters.value.starsMin || 0,
      starsMax: this.filters.value.starsMax || this.topStars,
      ppMin: this.filters.value.ppMin || 0,
      ppMax: this.filters.value.ppMax || this.topPP,
      selectedGenres: [...this.selectedGenres],
      selectedLanguages: [...this.selectedLanguages]
    });
  }
  

  protected toggleGenre(genreId: GenresEnum) {
    if (this.selectedGenres.includes(genreId)) {
      this.selectedGenres = this.selectedGenres.filter((genre) => genre != genreId);
    } else {
      this.selectedGenres.push(genreId);
    }
    this.updateFiltersService();
  }

  protected toggleLanguage(languageId: LanguagesEnum) {
    if (this.selectedLanguages.includes(languageId)) {
      this.selectedLanguages = this.selectedLanguages.filter((language) => language != languageId);
    } else {
      this.selectedLanguages.push(languageId);
    }
    this.updateFiltersService();
  }
}
