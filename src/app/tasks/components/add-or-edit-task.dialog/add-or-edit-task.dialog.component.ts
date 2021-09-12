import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksApiService } from '../../services/tasks-api.service';

@Component({
  selector: 'app-add-or-edit-task.dialog',
  templateUrl: './add-or-edit-task.dialog.component.html',
  styleUrls: ['./add-or-edit-task.dialog.component.scss']
})
export class AddOrEditTaskDialogComponent implements OnInit {

  public options = ['a', 'b', 'c', 'd'];
  public fileName = '';
  private formData: FormData = new FormData();
  private currentDocumentId = null;
  private currentDocumentType = null;

  public form = new FormGroup({
    task: new FormControl(null, [
      Validators.required,
      Validators.minLength(5)
    ]),
    topic: new FormControl(null, Validators.required),
    file: new FormControl(null),
    questions: new FormArray([]),

  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    readonly dialogRef: MatDialogRef<AddOrEditTaskDialogComponent>,
    private readonly tasksApiService: TasksApiService,
  ) {
  }

  public addQuestion(question?): void {
    let right = null;
    if (this.data.task && question) {
      right = question.answers.find((item) => {
        return item.isRight;
      });
    }
    (this.form.controls.questions as FormArray).push(
      new FormGroup({
        question: new FormControl(
          question ? question.question : null,
          Validators.required
        ),
        answers: new FormGroup({
          right: new FormControl(
            question ? right?.letter : null, Validators.required),
          option1: new FormControl(
            question ? question.answers[0].text : null,
            Validators.required
          ),
          option2: new FormControl(
            question ? question.answers[1]?.text : null,
            Validators.required
          ),
          option3: new FormControl(
            question ? question.answers[2]?.text : null,
            Validators.required
          ),
          option4: new FormControl(
            question ? question.answers[3]?.text : null,
            Validators.required
          )
        })
      })
    );
  }

  public saveTask(): void {
    this.saveFile();
  }

  public fileChange(event: EventTarget): void {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const files: FileList = target.files;

    if (files[0]) {
      this.fileName = files[0].name;
    }
    this.formData.append('file', files[0]);
  }

  public saveFile(): void {
    if (!this.currentDocumentId && this.form.controls.file.value) {
      this.tasksApiService.saveFile(this.formData)
        .subscribe((doc) => {
          this.currentDocumentId = doc.id;
          this.currentDocumentType = doc.type;
          this.dialogRef.close(this.requestFactory());
        });
    } else {
      this.dialogRef.close(this.requestFactory());
    }
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
    const request: IRequest = {
      text: this.form.value.task,
      level: this.data.level || this.data.task.level,
      topic: this.form.value.topic,
      questions: questionsArr,
      type: this.currentDocumentType ? this.currentDocumentType : 'text'
    };
    if (this.currentDocumentId) {
      request.materialId = this.currentDocumentId;
    }
    if (this.data.task) {
      request.id = this.data.task.id;
    }
    return request;
  }

  private setFormValue(): void {
    const task = this.data.task;
    this.form.controls.task.setValue(task.text);
    this.form.controls.topic.setValue(task.topic);
    if (this.currentDocumentId) {
      this.getFile();
    }
    for (let i = 0; i < task.questions.length; i++) {
      this.addQuestion(task.questions[i]);
    }
  }

  private getFile(): void {
    this.tasksApiService.getFile(this.currentDocumentId)
      .subscribe((file) => {
        this.fileName = file.originalName;
      });
  }

  ngOnInit(): void {
    if (this.data.task) {
      this.currentDocumentId = this.data.task.materialId;
      this.setFormValue();
    } else {
      for (let i = 0; i < 5; i++) {
        this.addQuestion();
      }
    }
  }

}

export interface IRequest {
  text: string;
  level: string;
  topic: string;
  questions: any;
  type: string;
  materialId?: string;
  id?: string;
}
