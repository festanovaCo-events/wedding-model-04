import { Component } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { GiftIcon, Mail01Icon } from '@hugeicons/core-free-icons';
import { MODEL_04_INFO } from '../../constants/m04-info';

@Component({
  selector: 'app-m04-gifts',
  standalone: true,
  imports: [HugeiconsIconComponent],
  templateUrl: './m04-gifts.component.html',
})
export class M04GiftsComponent {
  readonly gifts = MODEL_04_INFO.gifts;
  readonly GiftIcon = GiftIcon;
  readonly MailIcon = Mail01Icon;
}
