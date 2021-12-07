import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetoutPage } from './getout.page';

const routes: Routes = [
  {
    path: '',
    component: GetoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetoutPageRoutingModule {}
