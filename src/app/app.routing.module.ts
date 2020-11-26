import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { TestDetailComponent } from './test-detail/test-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    component: TestComponent
  },
  { path: 'area/edit/:id', component: TestDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        //enableTracing: true, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }