import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public isPasswordVisible = false;

  public form = new FormGroup({
    login: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(
    private readonly router: Router,
    private authService: AuthService
  ) {
  }

  public onFormSubmit(): void {
    if (this.form.valid) {
      this.authService.login(
        this.form.controls.login.value,
        this.form.controls.password.value
      );
      this.router.navigate(['tasks'], {});
    }
  }

  ngOnInit(): void {
  }

}
