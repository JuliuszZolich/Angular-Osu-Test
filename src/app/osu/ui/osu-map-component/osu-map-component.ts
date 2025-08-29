import { Component, effect, inject, Input, input, HostListener } from '@angular/core';
import { OsuMapStateService } from './osu-map-state-service';
import { convertEnumToGenre, convertEnumToLanguage } from '../../utils/enum-converter';
import { GenresEnum } from '../../model/genres';
import { LanguagesEnum } from '../../model/languages';

@Component({
  selector: 'osu-map-component',
  imports: [],
  templateUrl: './osu-map-component.html',
  styleUrl: './osu-map-component.scss',
})
export class OsuMapComponent {
  protected beatmapState = inject(OsuMapStateService);
  protected isVisible = false;

  protected genre = '';
  protected language = '';

  constructor() {
    effect(() => {
      //Efekt do odczytu zmian w sygnale
      const beatmap = this.beatmapState.currentBeatmap();
      if (beatmap) {
        this.genre = convertEnumToGenre(beatmap.beatmapset?.genre_id as GenresEnum);
        this.language = convertEnumToLanguage(beatmap.beatmapset?.language_id as LanguagesEnum)
        this.isVisible = true;
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.isVisible = false;
  }
}
