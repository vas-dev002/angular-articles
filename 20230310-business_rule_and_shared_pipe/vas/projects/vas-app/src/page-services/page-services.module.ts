import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageServicesComponent } from './page-services/page-services.component';
import { ROUTING } from './page-services.routing';

@NgModule({
  declarations: [PageServicesComponent],
  imports: [CommonModule, ROUTING],
})
export class PageServicesModule {}
