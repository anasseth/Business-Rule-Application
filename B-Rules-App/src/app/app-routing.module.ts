import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessRuleComponent } from './business-rule/business-rule.component';
import { IntroComponent } from './intro/intro.component';

const routes: Routes = [
  {
    path: "create/rules",
    component: BusinessRuleComponent
  },
  {
    path: "",
    component: IntroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
