import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObnovaComponent } from './obnova.component';


const routes: Routes = [
    {
        path: '',
        component: ObnovaComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ObnovaRoutingModule {}