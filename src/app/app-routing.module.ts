import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './website/main/main/main.component';

const routes: Routes = [
    {
        path: 'take',
        loadChildren: () =>
            import('./website/modules/take/take.module').then(
                (m) => m.TakeModule
            ),
            data: {title: 'Снять квартиру'},
    },
    {
        path: 'give',
        loadChildren: () =>
            import('./website/modules/give/give.module').then(
                (m) => m.GiveModule
            ),
            data: { title: 'Сдать квартиру'},
    },
    {
        path: 'my',
        loadChildren: () =>
            import('./website/modules/my/my.module').then(
                (m) => m.MyModule
            ),
            data: {title: 'Мои объявления'},
    },
    {
        path: 'my-history',
        loadChildren: () =>
            import('./website/modules/my-history/my-history.module').then(
                (m) => m.MyHistoryModule
            ),
            data: {title: 'История'},
    },
    {
        path: 'favourites',
        loadChildren: () =>
            import('./website/modules/favourites/favourites.module').then(
                (m) => m.FavouritesModule
            ),
            data: {title: 'Избранное'},
    },
    {
        path: 'profile',
        loadChildren: () =>
            import('./website/modules/profile/profile.module').then(
                (m) => m.ProfileModule
            ),
            data: {title: 'Мой профиль'},
    },
    {
        path: 'alert',
        loadChildren: () =>
            import('./website/modules/alert/alert.module').then(
                (m) => m.AlertModule
            ),
            data: {title: 'Уведомления'},
    },
    {
        path: 'subscription',
        loadChildren: () =>
            import('./website/modules/subscription/subscription.module').then(
                (m) => m.SubscriptionModule
            ),
            data: {title: 'Подписка'},
    },
    {
        path: 'referrals',
        loadChildren: () =>
            import('./website/modules/referalls/referrals.module').then(
                (m) => m.ReferallsModule
            ),
            data: {title: 'Реферальная система'},
    },
    { path: 'main', component: MainComponent, title: 'Главная' },
    {
        path: '**',
        //component: MainComponent,
        redirectTo: 'main',
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
