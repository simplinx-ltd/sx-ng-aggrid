import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { GridComponent } from './grid/grid.component';
import { DateFormatPipe } from './pipe/dateFormat';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AgGridModule.withComponents([])
  ],
  declarations: [
    GridComponent,
    DateFormatPipe
  ],
  exports: [
    GridComponent,
    DateFormatPipe
  ]
})
export class GridModule { }
