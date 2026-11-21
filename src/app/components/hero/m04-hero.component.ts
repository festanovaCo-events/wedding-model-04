import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { interval } from 'rxjs';
import { MODEL_04_INFO } from '../../constants/m04-info';
import {
  CountdownParts,
  padCountdownValue,
  remainingCountdown,
} from '../../shared/utils/countdown';

@Component({
  selector: 'app-m04-hero',
  standalone: true,
  templateUrl: './m04-hero.component.html',
})
export class M04HeroComponent implements OnInit {
  readonly info = MODEL_04_INFO.hero;
  readonly countdownTitle = MODEL_04_INFO.countdown.title;
  readonly countdownLabels = MODEL_04_INFO.countdown.labels;
  readonly pad = padCountdownValue;

  countdown: CountdownParts = remainingCountdown(MODEL_04_INFO.countdown.targetDate);

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = interval(1000).subscribe(() => {
      this.countdown = remainingCountdown(MODEL_04_INFO.countdown.targetDate);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
