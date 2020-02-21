export class Workout {
  public title: string;
  public description: string;
  public imageUrl: string;
  public type: string;
  public duration: number;
  public specialty: string[];
  public phase: string[];
  public zwo: string;

  constructor(
    title: string,
    description: string,
    imageUrl: string,
    type: string,
    duration: number,
    specialty: string[],
    phase: string[],
    zwo: string
  ) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.type = type;
    this.duration = duration;
    this.specialty = specialty;
    this.phase = phase;
    this.zwo = zwo;
  }
}
