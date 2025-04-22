export class Profile {
  avatarUrl: string | null;
  birthDate: string;
  createdAt: string;
  email: string;
  id: number;
  name: string;
  phoneNumber: string;
  surname: string;
  updatedAt: string;

  constructor(
    avatarUrl: string | null = null,
    birthDate: string = '',
    createdAt: string = '',
    email: string = '',
    id: number = 0,
    name: string = '',
    phoneNumber: string = '',
    surname: string = '',
    updatedAt: string = '',
  ) {
    this.avatarUrl = avatarUrl;
    this.birthDate = birthDate;
    this.createdAt = createdAt;
    this.email = email;
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.surname = surname;
    this.updatedAt = updatedAt;
  }
}
