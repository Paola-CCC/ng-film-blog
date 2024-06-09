import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../../../shared/services/token/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  /** indique si la connexion a réussi ou non  */
  loginIsSuccess: boolean | null = null;
  /** message d'erreur en cas d'ehec */
  errorMessage = '';
  /** message de success */
  sucessMessage = '';
  /** indique si le formualaire a été envoyé ou non  */
  submitted: boolean = false;

  constructor(private fb: FormBuilder,private authService: AuthService , private storage: TokenStorageService , private router: Router) {}

  get email (): any {
    return this.loginForm.get('email');
  }

  get password (): any {
    return this.loginForm.get('password');
  }

  get controlLogin() : { [key: string]: AbstractControl }{
    return this.loginForm.controls;
  }

  /**  Met les valeurs par défaut*/
  setDefaultValue() { 
    this.loginForm.setValue({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login( this.email.value, this.password.value).subscribe({
      next: data => {
        if(data.jwt && data.user ) {
          this.storage.setToken(data.jwt);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.loginIsSuccess = true;
          this.router.navigate(['/home']);
        } else {
          this.loginIsSuccess = false;
        }

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.loginIsSuccess = false;
      }
    });

  }
  
}
