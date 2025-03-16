import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyHistoryComponent } from './my-history.component';


const routes: Routes = [
    {
        path: '',
        component: MyHistoryComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyHistoryRoutingModule {}