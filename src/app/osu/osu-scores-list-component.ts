import { Component, inject, computed, signal } from '@angular/core';
import { OsuScoreApiService } from './data-access/osu-score-api.service';
import { Score } from './model/score';
import { OsuScoreComponent } from './ui/osu-score-component/osu-score-component';
import { OsuApiMapService } from './data-access/osu-map-api.service';
import { OsuMapComponent } from './ui/osu-map-component/osu-map-component';
import { OsuMapStateService } from './ui/osu-map-component/osu-map-state-service';
import { OsuFiltersComponent } from "./ui/osu-filters-component/osu-filters.component";
import { OsuFiltersService } from './data-access/osu-filters.service';

@Component({
  selector: 'osu-scores-list',
  imports: [OsuScoreComponent, OsuMapComponent, OsuFiltersComponent],
  templateUrl: './osu-scores-list-component.html',
  styleUrl: './osu-scores-list-component.scss',
})
export class OsuNotificationList {
  private allScores = signal<Score[]>([]);
  private apiService = inject(OsuScoreApiService);
  private mapService = inject(OsuApiMapService);
  private filtersService = inject(OsuFiltersService);
  protected beatmapStateService = inject(OsuMapStateService);
  
  protected filteredScores = computed(() => {
    return this.filtersService.filterScores(this.allScores());
  });
  ngOnInit() {
    const fetchScores = () => {
      this.apiService.getScores().subscribe((scores) => {
        this.mapService.getMapsForScores(scores).subscribe((result) => {
          this.allScores.update(currentScores => [...result, ...currentScores]);
          this.filtersService.updateMax(result);
        });
      });
    };
  
    fetchScores();
    //Nie ma websocketu więc jest zapytanie co 10s
    setInterval(fetchScores, 10000);
  }
}
