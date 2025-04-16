import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../../shared/types/user';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  private readonly baseApiurl: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  public login(user: User): Observable<any> {
    return this.httpClient.post<User[]>(`${this.baseApiurl}/login`, user);
  }
}
