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
        data: { title: 'Снять квартиру', animation: 'TakePage' }
    },
    {
        path: 'give',
        loadChildren: () =>
            import('./website/modules/give/give.module').then(
                (m) => m.GiveModule
            ),
        data: { title: 'Сдать квартиру', animation: 'GivePage' }
    },
    {
        path: 'my',
        loadChildren: () =>
            import('./website/modules/my/my.module').then(
                (m) => m.MyModule
            ),
        data: { title: 'Мои объявления', animation: 'MyPage' }
    },
    {
        path: 'my-history',
        loadChildren: () =>
            import('./website/modules/my-history/my-history.module').then(
                (m) => m.MyHistoryModule
            ),
        data: { title: 'История', animation: 'MyHistoryPage' }
    },
    {
        path: 'favourites',
        loadChildren: () =>
            import('./website/modules/favourites/favourites.module').then(
                (m) => m.FavouritesModule
            ),
        data: { title: 'Избранное', animation: 'FavouritesPage' }
    },
    {
        path: 'profile',
        loadChildren: () =>
            import('./website/modules/profile/profile.module').then(
                (m) => m.ProfileModule
            ),
        data: { title: 'Мой профиль', animation: 'ProfilePage' }
    },
    {
        path: 'alert',
        loadChildren: () =>
            import('./website/modules/alert/alert.module').then(
                (m) => m.AlertModule
            ),
        data: { title: 'Уведомления', animation: 'AlertPage' }
    },
    {
        path: 'subscription',
        loadChildren: () =>
            import('./website/modules/subscription/subscription.module').then(
                (m) => m.SubscriptionModule
            ),
        data: { title: 'Подписка', animation: 'SubscriptionPage' }
    },
    {
        path: 'welcome',
        loadChildren: () =>
            import('./website/modules/welcome/welcome.module').then(
                (m) => m.WelcomeModule
            ),
        data: { title: 'Приветственное меню', animation: 'WelcomePage' }
    },
    {
        path: 'referrals',
        loadChildren: () =>
            import('./website/modules/referalls/referrals.module').then(
                (m) => m.ReferallsModule
            ),
        data: { title: 'Реферальная система', animation: 'ReferralsPage' }
    },
    {
        path: 'main',
        component: MainComponent,
        title: 'Главная',
        data: { animation: 'MainPage' }
    },
    {
        path: '**',
        redirectTo: 'main',
        data: { animation: 'MainPage' }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }