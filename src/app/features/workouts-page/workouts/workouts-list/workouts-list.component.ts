import { Component, OnInit } from "@angular/core";
import { Workout } from "../workout.model";

@Component({
  selector: "app-workouts-list",
  templateUrl: "./workouts-list.component.html",
  styleUrls: ["./workouts-list.component.scss"]
})
export class WorkoutsListComponent implements OnInit {
  workouts: Workout[] = [
    new Workout(
      "SS7-2",
      `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore voluptate totam doloremque excepturi aspernatur numquam accusantium optio amet quae eveniet, distinctio accusamus tempore autem dolor adipisci? Dolorum corrupti nulla alias culpa impedit! Ipsum pariatur placeat est quo hic dignissimos magni? 
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore voluptate totam doloremque excepturi aspernatur numquam accusantium optio amet quae eveniet, distinctio accusamus tempore autem dolor adipisci? Dolorum corrupti nulla alias culpa impedit! Ipsum pariatur placeat est quo hic dignissimos magni?`,
      "../../../../assets/img/placeholder.png",
      "Anaerobic",
      20,
      "road race",
      "Base",
      false
    ),
    new Workout(
      "SS6-3",
      `Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Reiciendis nihil Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Reiciendis nihil Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Reiciendis nihil Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Reiciendis nihil Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Reiciendis nihil Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Reiciendis nihil `,
      "../../../../assets/img/placeholder.png",
      "Aerobic",
      10,
      "Mountain Biking",
      "Build",
      true
    ),
    new Workout(
      'Name', 
      'description afdsfsdfadfasdfasdfsd',
      '../../../assets/img/placeholder.png',
      'Sprint',
      60,
      'Road Biking',
      'Race',
      true
    )
  ];

  constructor() {}

  ngOnInit() {}
}

// RECIPE MODEL
//
// title: string,
// description: string,
// imagePath: string,
// type: string,
// duration: number,
// specialty: string[],
// phase: string[],
// zwo: boolean
