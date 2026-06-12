import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Kategorien</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Kategorien werden hier aufgelistet.</p>
      </mat-card-content>
    </mat-card>
  `,
})
export class CategoryListComponent {}