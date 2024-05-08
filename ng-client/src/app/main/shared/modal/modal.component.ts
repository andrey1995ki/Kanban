import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCard} from "@angular/material/card";
import {NgIf, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    MatIcon,
    MatIconButton,
    MatCard,
    MatDialogActions,
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input()
  title!: string;
  @Input()
  acceptTitle: string = 'Продолжить'
  @Input()
  dismissTitle: string = 'Отмена'
  @Input()
  showActions: boolean = false
  @Output()
  onDismiss = new EventEmitter<unknown>()
  @Output()
  onAccept = new EventEmitter<unknown>()
  @ViewChild('close', {read: ElementRef}) closeModalBtn: ElementRef | undefined

  onDismissEvent() {
    this.onDismiss.emit()
  }

  onAcceptEvent() {
    this.onAccept.emit()
    console.log(this.closeModalBtn?.nativeElement);
  }

  closeModal(){
    this.closeModalBtn?.nativeElement.click()
  }
}
