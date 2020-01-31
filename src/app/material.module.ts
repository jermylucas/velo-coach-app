import { NgModule } from "@angular/core";
import { MatButtonModule, MatIconModule } from "@angular/material";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";

const MaterialComponents = [
  MatButtonModule,
  MatToolbarModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule {}
