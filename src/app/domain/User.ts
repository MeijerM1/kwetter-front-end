export class User {
  public uuid: string;
  public username: string;
  public avatarUrl: string;
  public description: string;
  public location: string;
  public websiteUrl: string;
  public password: string;
  public roleUuid: string;
  public following: string[];
  public token: string;

  constructor() {}

  public addFollower(id: string) {
    this.following.push(id);
  }
}
