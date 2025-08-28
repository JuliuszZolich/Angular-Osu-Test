import { Component, Input, Output } from '@angular/core';
import { Score } from '../../model/score';

@Component({
  selector: 'app-osu-score-component',
  imports: [],
  templateUrl: './osu-score-component.html',
  styleUrl: './osu-score-component.css'
})
export class OsuScoreComponent {
  @Input({required:true}) score!: Score
}
