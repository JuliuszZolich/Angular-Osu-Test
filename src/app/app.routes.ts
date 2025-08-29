import { Routes } from '@angular/router';
import { OsuNotificationList } from './osu/osu-scores-list-component';

export const routes: Routes = [
    {
        "path" : "scores",
        "component": OsuNotificationList
    },
    {
        "path": "",
        "pathMatch": "full",
        "redirectTo": "scores"
    }
];
