import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-or-edit-task.dialog',
  templateUrl: './add-or-edit-task.dialog.component.html',
  styleUrls: ['./add-or-edit-task.dialog.component.scss']
})
export class AddOrEditTaskDialogComponent implements OnInit {

  public options = ['a', 'b', 'c', 'd'];

  public form = new FormGroup({
    task: new FormControl(null, [
      Validators.required,
      Validators.minLength(100)
    ]),
    files: new FormControl(null),
    questions: new FormArray([]),

  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    readonly dialogRef: MatDialogRef<AddOrEditTaskDialogComponent>
  ) {
  }

  public addQuestion(): void {
    (this.form.controls.questions as FormArray).push(
      new FormGroup({
        question: new FormControl(null, Validators.required),
        answers: new FormGroup({
          right: new FormControl(null, Validators.required),
          option1: new FormControl(null, Validators.required),
          option2: new FormControl(null, Validators.required),
          option3: new FormControl(null, Validators.required),
          option4: new FormControl(null, Validators.required)
        })
      })
    );
  }

  public saveTask(): void {
    this.dialogRef.close(this.requestFactory());
  }

  private requestFactory() {
    const questionsArr = this.form.value.questions.map((item) => {
      return {
        question: item.question,
        answers: [
          {
            letter: 'a',
            text: item.answers.option1,
            isRight: item.answers.right === 'a'
          },
          {
            letter: 'b',
            text: item.answers.option2,
            isRight: item.answers.right === 'b'
          },
          {
            letter: 'c',
            text: item.answers.option3,
            isRight: item.answers.right === 'c'
          },
          {
            letter: 'd',
            text: item.answers.option4,
            isRight: item.answers.right === 'd'
          },
        ]
      };
    });
    const request = {
      text: this.form.value.task,
      level: this.data.level,
      questions: questionsArr,
      type: 'text'
    };
    return request;
  }

  ngOnInit(): void {
    for (let i = 0; i < 5; i++) {
      this.addQuestion();
    }
  }

}
