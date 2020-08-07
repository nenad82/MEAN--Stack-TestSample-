import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'confirm-dialog',
  templateUrl: '/app/confirm-dialog/confirmation-dialog.html',
})
export class ConfirmationDialog {
  constructor(public dialogRef: MdDialogRef<ConfirmationDialog>) {}

  public confirmMessage:string;
}