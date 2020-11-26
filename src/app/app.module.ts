import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { GridModule } from './modules/grid.module';
import { TestComponent } from './test/test.component';
import { TestDetailComponent } from './test-detail/test-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TestDetailComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    GridModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
