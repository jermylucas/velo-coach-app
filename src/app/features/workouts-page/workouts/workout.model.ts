export class Workout {
  public title: string;
  public description: string;
  public imagePath: string;
  public type: string;
  public duration: number;
  public specialty: string[];
  public phase: string[];
  public zwo: string;

  constructor(
    title: string,
    description: string,
    imagePath: string,
    type: string,
    duration: number,
    specialty: string[],
    phase: string[],
    zwo: string
  ) {
    this.title = title;
    this.description = description;
    this.imagePath = imagePath;
    this.type = type;
    this.duration = duration;
    this.specialty = specialty;
    this.phase = phase;
    this.zwo = zwo;
  }
}
