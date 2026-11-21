import { Component } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import {
  Dress01Icon,
  DrinkIcon,
  Restaurant01Icon,
  SparklesIcon,
  Suit01Icon,
  Table01Icon,
  WeddingIcon,
} from '@hugeicons/core-free-icons';
import { MODEL_04_INFO, Model04TimelineIcon } from '../../constants/m04-info';

@Component({
  selector: 'app-m04-events',
  standalone: true,
  imports: [HugeiconsIconComponent],
  templateUrl: './m04-events.component.html',
})
export class M04EventsComponent {
  readonly reception = MODEL_04_INFO.reception;
  readonly timeline = MODEL_04_INFO.timeline;
  readonly dressCode = MODEL_04_INFO.dressCode;
  readonly DrinkIcon = DrinkIcon;
  readonly SuitIcon = Suit01Icon;
  readonly DressIcon = Dress01Icon;

  private readonly timelineIcons = {
    reception: Table01Icon,
    entrance: WeddingIcon,
    toast: DrinkIcon,
    dinner: Restaurant01Icon,
    party: SparklesIcon,
  } as const;

  timelineIcon(icon: Model04TimelineIcon) {
    return this.timelineIcons[icon];
  }
}
