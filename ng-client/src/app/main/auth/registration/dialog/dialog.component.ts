import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
  styles: [`.dialog {
    margin: 15px
  }`],
  template: "<div class='dialog'><h2 mat-dialog-title>Успешная регистрация</h2>" +
    "<mat-dialog-content>Вы успешно зарегистрировались, войдите под своими учётными данными для продолжения.</mat-dialog-content>\n" +
    "<mat-dialog-actions [align]='actionsAlign'>\n" +
    "  <button mat-button mat-dialog-close>Закрыть</button>\n" +
    "</mat-dialog-actions></div>",
})
export class DialogComponent {
  actionsAlign: "end" = 'end'
}
