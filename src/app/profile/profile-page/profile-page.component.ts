import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {ProfileHeaderComponent} from '../profile-header/profile-header.component';
import {TuiAppearance} from '@taiga-ui/core';
import {LanguageProgressComponent} from '../language-progress/language-progress.component';
import {UserStatsComponent} from '../user-stats/user-stats.component';
import {CoursesListComponent} from '../courses-list/courses-list.component';
import {ProgressTrainingDaysComponent} from '../progress-training-days/progress-training-days.component';
import {TuiCardLarge} from '@taiga-ui/layout';
import {ProfileService} from '../shared/services/profile.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {Profile} from '../shared/models/profile.model';
import {TuiInputFiles} from '@taiga-ui/kit';
import {map} from 'rxjs';

@Component({
  selector: 'profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProfileHeaderComponent,
    TuiAppearance,
    LanguageProgressComponent,
    UserStatsComponent,
    CoursesListComponent,
    ProgressTrainingDaysComponent,
    TuiCardLarge,
  ],
  providers: [TuiInputFiles],
})
export class ProfilePageComponent {
  private readonly profileService: ProfileService = inject(ProfileService);

  protected readonly profileInfo: Signal<Profile> = toSignal(
    this.profileService.getProfile().pipe(
      map((profile: Profile) => {
        profile.avatarUrl = `http://localhost:3000/uploads/${profile.avatarUrl}`;
        return profile;
      }),
    ),
    {initialValue: new Profile()},
  );
}
