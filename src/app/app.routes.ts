import { Routes } from '@angular/router';
import { OsuNotificationList } from './osu/osu-notification-list.component';

export const routes: Routes = [
    {
        "path" : "scores",
        "component": OsuNotificationList
    }
];
