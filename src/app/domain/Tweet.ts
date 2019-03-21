export class Tweet {
  uuid: string;
  content: string;
  date: string;
  authorUuid: string;

  constructor(uuid: string, content: string, date: string, authorUuid: string) {
    this.uuid = uuid;
    this.content = content;
    this.date = date;
    this.authorUuid = authorUuid;
  }
}