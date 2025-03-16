import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferallsComponent } from './referalls.component';


const routes: Routes = [
    {
        path: '',
        component: ReferallsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReferallsRoutingModule {}