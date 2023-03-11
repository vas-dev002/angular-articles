import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vas-banner-message',
  templateUrl: 'vas-banner-message.component.html',
  styles: [],
})
export class VasBannerMessageComponent {
  @Input() public message = '';
  constructor() {}
}
