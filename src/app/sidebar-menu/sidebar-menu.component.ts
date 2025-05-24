import {AsyncPipe, NgIf} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, Signal, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiThemeColorService} from '@taiga-ui/cdk';
import {TuiButton, TuiDataList, TuiDropdown, TuiFallbackSrcPipe} from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiBadge,
  TuiBadgeNotification,
  TuiChevron,
  TuiDataListDropdownManager,
  TuiFade,
  TuiSwitch,
} from '@taiga-ui/kit';
import {TuiNavigation} from '@taiga-ui/layout';
import {RouterModule} from '@angular/router';
import {ProfileService} from '../profile/shared/services/profile.service';
import {Profile} from '../profile/shared/models/profile.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';

@Component({
  selector: 'sidebar-menu',
  standalone: true,
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    NgIf,
    TuiAvatar,
    TuiBadge,
    TuiBadgeNotification,
    TuiButton,
    TuiChevron,
    TuiDataList,
    TuiDataListDropdownManager,
    TuiDropdown,
    TuiFade,
    TuiNavigation,
    TuiSwitch,
    TuiFallbackSrcPipe,
    AsyncPipe,
    RouterModule,
  ],
})
export class SidebarMenuComponent {
  private readonly theme: TuiThemeColorService = inject(TuiThemeColorService);
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

  protected expanded: WritableSignal<boolean> = signal(true);
  protected open: boolean = false;
  protected switchColor: boolean = false;
  protected color: boolean = false;

  protected onColor(color: boolean): void {
    this.theme.color = color ? '#526ed3' : 'black';
  }

  protected handleToggle(): void {
    this.expanded.update((e) => !e);
  }
}
