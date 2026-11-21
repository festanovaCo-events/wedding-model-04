import { Component } from '@angular/core';
import { MODEL_04_INFO } from '../../constants/m04-info';

@Component({
  selector: 'app-m04-closing',
  standalone: true,
  templateUrl: './m04-closing.component.html',
})
export class M04ClosingComponent {
  readonly closing = MODEL_04_INFO.closing;
}
