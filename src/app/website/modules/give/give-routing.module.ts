import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiveComponent } from './give/give.component';
import { VerificationComponent } from './verification/verification/verification.component';


const routes: Routes = [
    {
        path: '',
        component: GiveComponent,
    },
    {
        path: 'verification',
        component: VerificationComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GiveRoutingModule {}