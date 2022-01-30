export class Document {
  public id: string;
  public name: string;
  public description: string;
  public url: string;
  public group: string;

  constructor(id: string, name: string, description: string, url: string, group: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
    this.group = group;
  }
}
