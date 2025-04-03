import {Injectable} from '@angular/core';
import {ActiveToast, ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable()
export class SnackBarService {
  constructor(
    private toastr: ToastrService,
    private router: Router,
  ) {}

  public successShow(message: string, title: string = ''): ActiveToast<any> {
    return this.display(message, title, 'toast-success');
  }

  public messageShow(message: string, title: string = ''): void {
    return this.display(message, title, 'toast-info');
  }

  public warningShow(message: string, title: string = ''): void {
    return this.display(message, title, 'toast-warning');
  }

  public errorShow(message: string, title: string = ''): void {
    return this.display(message, title, 'toast-error');
  }

  private display(message: string, title: string = '', actionText: string = '', timeOut: number = 6000): any {
    message = message && message.length > 395 ? message.substr(0, 395) + '...' : message;

    const iconType: string =
      actionText === 'toast-success'
        ? 'tm-icon-correct'
        : actionText === 'toast-error' || actionText === 'toast-warning'
          ? 'tm-icon-attention'
          : actionText === 'toast-info'
            ? 'icon-information-icon-2'
            : '';

    const toastrRef: ActiveToast<any> = this.toastr.show(
      this.generateMessageHtml(message, title, iconType),
      '',
      {
        closeButton: false,
        enableHtml: true,
        timeOut: timeOut,
      },
      actionText,
    );

    return toastrRef;
  }

  private generateMessageHtml(message: string, title: string, type: string): string {
    return (
      '<div class="flex-direction-row snackbar-message-container">' +
      '<div class="toast-icon ' +
      type +
      ' "></div>' +
      '<div class="snackbar-content-wrapper"><div>' +
      title +
      '</div><div class="snackbar-text-wrapper">' +
      message +
      '</div></div> <span class="icon-close-icon"></span></div>'
    );
  }
}
