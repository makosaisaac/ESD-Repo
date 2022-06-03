import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from './explore-container.component';
import { MomenttPipe } from '../momentt.pipe';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ExploreContainerComponent, MomenttPipe],
  exports: [ExploreContainerComponent]
})
export class ExploreContainerComponentModule {}
