import { TuiRootModule } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DataPanelModule } from './modules/data-panel/data-panel.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DataPanelModule, BrowserAnimationsModule, TuiRootModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
