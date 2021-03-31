import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APP_TITLES } from '@core/const/app.const';

import { AboutComponent } from './about.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { VolunteerComponent } from './volunteer/volunteer.component';

const routes: Routes = [
  { path: '', component: AboutComponent, data: { title: APP_TITLES?.about } },
  { path: 'our-team', component: OurTeamComponent, data: { title: APP_TITLES?.our_team } },
  { path: 'join', component: VolunteerComponent, data: { title: APP_TITLES?.volunteer } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AboutRoutingModule {}
