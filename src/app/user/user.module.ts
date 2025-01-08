import { NgModule } from '@angular/core';
import { CardModule } from '../shared/card/card.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [CardModule],
  exports: [UserComponent],
})
export class UserModule {}
