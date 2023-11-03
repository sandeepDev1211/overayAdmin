import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private dialog: MatDialog) {}

  isLoading = new Subject<boolean>();
  showMessage = new Subject<boolean>();
  message = new Subject<string>();

  openLoader(show: boolean = false) {
    this.isLoading.next(show);
  }

  openMessageDialog(show: boolean, heading: string, message: string) {
    this.dialog.open(MessageDialogComponent, {
      width: '300px',
      data: { heading, message },
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
