import { Injectable, signal } from '@angular/core';
import { GenresEnum } from '../model/genres';
import { LanguagesEnum } from '../model/languages';
import { Score } from '../model/score';

export interface FilterState {
  search: string;
  starsMin: number;
  starsMax: number;
  ppMin: number;
  ppMax: number;
  selectedGenres: GenresEnum[];
  selectedLanguages: LanguagesEnum[];
  topPP: number;
  topStars: number;
}

@Injectable({
  providedIn: 'root',
})
export class OsuFiltersService {
  private _filters = signal<FilterState>({
    search: '',
    starsMin: 0,
    starsMax: 20,
    ppMin: 0,
    ppMax: 1000,
    selectedGenres: [],
    selectedLanguages: [],
    topPP: 1000,
    topStars: 20,
  });

  filters = this._filters.asReadonly();

  updateFilters(filters: Partial<FilterState>) {
    this._filters.update((current) => ({ ...current, ...filters }));
  }

  filterScores(scores: Score[]): Score[] {
    const currentFilters = this._filters();

    return scores
      .filter(
        (score) =>
          currentFilters.search === '' ||
          score.beatmap?.beatmapset?.title
            ?.toLowerCase()
            .includes(currentFilters.search.toLowerCase())
      )
      .filter((score) => currentFilters.ppMin === 0 || score.pp! >= currentFilters.ppMin)
      .filter(
        (score) =>
          currentFilters.ppMax === currentFilters.topPP || score.pp! <= currentFilters.ppMax
      )
      .filter(
        (score) =>
          currentFilters.starsMin === 0 ||
          score.beatmap?.difficulty_rating! >= currentFilters.starsMin
      )
      .filter(
        (score) =>
          currentFilters.starsMax === currentFilters.topStars ||
          score.beatmap?.difficulty_rating! <= currentFilters.starsMax
      )
      .filter(
        (score) =>
          currentFilters.selectedGenres.length === 0 ||
          currentFilters.selectedGenres.includes(score.beatmap?.beatmapset?.genre_id as GenresEnum)
      )
      .filter(
        (score) =>
          currentFilters.selectedLanguages.length === 0 ||
          currentFilters.selectedLanguages.includes(
            score.beatmap?.beatmapset?.language_id as LanguagesEnum
          )
      );
  }

  updateMax(scores: Score[]) {
    const currentFilters = this._filters();
    scores.forEach((score) => {
      if (score.pp! > currentFilters.topPP) currentFilters.topPP = score.pp!;
      if (score.beatmap?.difficulty_rating! > currentFilters.topStars)
        currentFilters.topStars = score.beatmap?.difficulty_rating!;
    });
  }
}
