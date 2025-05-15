import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiveComponent } from './give/give.component';
import { VerificationComponent } from './verification/verification/verification.component';
import { VerificationGuard } from './guards/verification.guard'; // Импортируем Guard

const routes: Routes = [
  {
    path: '',
    component: GiveComponent,
    data: { animation: 'GivePage' }
  },
  {
    path: 'verification',
    component: VerificationComponent,
    canActivate: [VerificationGuard],
    data: { animation: 'VerificationPage' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiveRoutingModule {}