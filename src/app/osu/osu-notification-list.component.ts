import { Component, inject } from '@angular/core';
import { OsuNotificationApiService } from './data-access/osu-notication-api.service';
import { Score } from './model/score';
import { OsuScoreComponent } from './ui/osu-score-component/osu-score-component';
import { OsuApiMapService } from './data-access/osu-map-api.service';
import { OsuMapComponent } from './ui/osu-map-component/osu-map-component';
import { OsuMapStateService } from './ui/osu-map-component/osu-map-state-service';

@Component({
  selector: 'app-osu-notification-list',
  imports: [OsuScoreComponent, OsuMapComponent],
  templateUrl: './osu-notification-list.component.html',
  styleUrl: './osu-notification-list.component.css',
})
export class OsuNotificationList {
  protected scores = [] as Score[];
  private apiService = inject(OsuNotificationApiService);
  private mapService = inject(OsuApiMapService);
  protected beatmapStateService = inject(OsuMapStateService);
  ngOnInit() {
    const fetchScores = () => {
      this.apiService.getScores().subscribe((scores) => {
        this.mapService.getMapsForScores(scores).subscribe((result) => {
          this.scores.push(...result);
        });
      });
    };

    fetchScores();
    //Nie ma websocketu więc jest zapytanie co 10s
    setInterval(fetchScores, 10000);
  }
}
