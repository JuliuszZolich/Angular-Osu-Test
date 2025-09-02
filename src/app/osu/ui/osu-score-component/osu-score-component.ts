import { Component, Input, Output } from '@angular/core';
import { Score } from '../../model/score';

@Component({
  selector: 'osu-score-component',
  imports: [],
  templateUrl: './osu-score-component.html',
  styleUrl: './osu-score-component.scss',
})
export class OsuScoreComponent {
  @Input({ required: true }) score!: Score;
  protected timer: number = 0;
  ngOnInit() {
    this.timer = Math.floor((Date.now() - Date.parse(this.score.ended_at))/1000);
    this.score.pp = Math.round(this.score.pp!);
    setInterval(() => {
      this.timer++;
    }, 1000);
  }
}
