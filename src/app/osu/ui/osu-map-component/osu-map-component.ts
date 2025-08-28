import { Component, effect, inject, Input, input, HostListener } from '@angular/core';
import { OsuMapStateService } from './osu-map-state-service';

@Component({
  selector: 'app-osu-map-component',
  imports: [],
  templateUrl: './osu-map-component.html',
  styleUrl: './osu-map-component.css',
})
export class OsuMapComponent {
  protected beatmapState = inject(OsuMapStateService);
  protected isVisible = false;

  constructor(){
     effect(() => {
      const beatmap = this.beatmapState.currentBeatmap();
      if (beatmap) {
        console.log(beatmap)
        this.isVisible = true;
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.isVisible = false;
  }
}
