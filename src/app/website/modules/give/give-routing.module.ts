import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiveComponent } from './give/give.component';


const routes: Routes = [
    {
        path: '',
        component: GiveComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GiveRoutingModule {}