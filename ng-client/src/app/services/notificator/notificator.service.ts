import {Injectable, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppState} from "../../store/store";
import {Store} from "@ngrx/store";
import {getMessages} from "../../store/task";
import {SetMessages} from "../../store/task/task.actions";

@Injectable({
  providedIn: 'root'
})
export class NotificatorService{
  private messages = this.store.select(getMessages)
  constructor(private notificator: MatSnackBar, private store: Store<AppState>) { }

  private OpenNotification(message:string){
    const notificatorRef = this.notificator.open(message, 'Закрыть',{
      duration: 5000,
      horizontalPosition: 'right'
    })
    notificatorRef.afterDismissed().subscribe(()=>{
      this.store.dispatch(new SetMessages(undefined))
    })
  }

  public init() {
    this.messages.subscribe(message=> {
      if(message){
        this.OpenNotification(message)
      }
    })
  }
}
