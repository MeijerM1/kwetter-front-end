export class UserDto {
  public uuid: string;
  public username: string;
  public avatarUrl: string;
  public description: string;
  public location: string;
  public websiteUrl: string;
  public password: string;
  public roleUuid: string;
  public following: string[] = [];

  constructor();

  constructor(username?: string, password?: string) {
    this.username = username;
    this.password = password;
  }

  public addFollower(id: string) {
    this.following.push(id);
  }
}
