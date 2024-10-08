import { LoginService } from './../../services/login.service';
import { PrimaryInputComponent } from './../../components/primary-input/primary-input.component';
import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService,
    ToastrService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private LoginService: LoginService,
    private toastService: ToastrService
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }


  submit(){
    this.LoginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => this.router.navigate(["baseteses"]),
      error: () => this.toastService.error("Email ou senha inválidos, tente novamente.")
    })
  }

  navigate(){
   this.router.navigate(["signup"])
  }
}
