/*
  Module for importing and exporting all needed Material-UI components,
  so the application can use them and provide it to other components.
*/

import { NgModule } from '@angular/core';

// material-ui components/modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const materialModules = [MatButtonModule, MatIconModule, MatSlideToggleModule];

@NgModule({
  declarations: [],
  imports: [...materialModules],
  exports: [...materialModules],
})
export class MaterialModule {}
