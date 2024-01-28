import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modaladdscheda',
  standalone: true,
  imports: [FormsModule,CommonModule,MatDialogClose],
  templateUrl: './modaladdscheda.component.html',
  styleUrl: './modaladdscheda.component.css'
})
export class ModaladdschedaComponent {
  scheda={
    name:"",
    startDate:"",
    endDate:""
  }
  constructor(
    public dialogRef: MatDialogRef<ModaladdschedaComponent>
  ) {}

  createScheda(): void {
    if(this.scheda.endDate && this.scheda.name && this.scheda.startDate){
      this.dialogRef.close(this.scheda);
    }
    else{
      if (!this.scheda.name) {
        document.getElementById("name")?.classList.add("is-invalid")
      } else {
        document.getElementById("name")?.classList.remove("is-invalid")
      }
      if (!this.scheda.startDate) {
        document.getElementById("startDate")?.classList.add("is-invalid")
      } else {
        document.getElementById("startDate")?.classList.remove("is-invalid")
      }
      if (!this.scheda.endDate) {
        document.getElementById("endDate")?.classList.add("is-invalid")
      } else {
        document.getElementById("endDate")?.classList.remove("is-invalid")
      }
    }
  }
}
