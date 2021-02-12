import { ShortDescriptionPipe } from './pipe/short-description.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Interceptor } from './interceptors/interceptor.module';
import { AlertComponent } from './alert/alert/alert.component';

@NgModule({
  imports: [Interceptor, CommonModule],
  declarations: [AlertComponent, ShortDescriptionPipe],
  entryComponents: [AlertComponent],
  exports: [AlertComponent, ShortDescriptionPipe],
})
export class SharedModule {}
