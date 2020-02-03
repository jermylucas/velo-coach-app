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
      `Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Reiciendis nihil Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Reiciendis nihil Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Reiciendis nihil Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Reiciendis nihil Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Reiciendis nihil Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Reiciendis nihil`,
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
