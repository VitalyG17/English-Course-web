import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {TuiFallbackSrcPipe, TuiHintDirective} from '@taiga-ui/core';
import {AsyncPipe} from '@angular/common';
import {Profile} from '../shared/models/profile.model';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileService} from '../shared/services/profile.service';
import {UploadResponse} from '../shared/interfaces/uploadResponce.interface';

@Component({
  selector: 'profile-header',
  standalone: true,
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiAvatar, TuiFallbackSrcPipe, AsyncPipe, ReactiveFormsModule, TuiHintDirective],
})
export class ProfileHeaderComponent {
  @Input()
  public profileInfo: Profile = new Profile();

  constructor(
    private readonly profileService: ProfileService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      this.profileService.uploadAvatar(file).subscribe((res: UploadResponse) => {
        this.profileInfo.avatarUrl = `http://localhost:3000/uploads/${res.avatarUrl}`;
        // TODO уйти от markForCheck
        this.cdr.markForCheck();
      });
    }
  }
}
