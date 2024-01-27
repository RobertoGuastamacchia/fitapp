import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent {
  data: any = [];  
  @Input()
  set Data(data:any){
    this.data=data;
  }
  constructor(){

  }
  ngOnChange(change:any){
    console.log(change)
  }
}
