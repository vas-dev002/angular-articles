import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VasBannerMessageComponent } from './vas-banner-message/vas-banner-message.component';

const SHARED_COMPONENTS = [VasBannerMessageComponent];

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [CommonModule],
  exports: [...SHARED_COMPONENTS],
})
export class VasSharedModule {}
