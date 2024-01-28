import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Exercise } from '../../classes/classes';
import { APIModule } from '../../api/api.module';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [APIModule,CommonModule, FormsModule],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent {
  data: any|null=null;  
  api:any
  
  constructor(_api:APIModule){
    this.api=_api
    
  }
  ngOnInit(){
    let context = this;
    if(this.data && !this.data.descrizione){
      this.api.getExercise(this.data!.id).subscribe(function(i:any){
        context.data=new Exercise(i[0]);
      })
    }
  }
  ngOnChange(change:any){
    console.log(change)
  }
}
