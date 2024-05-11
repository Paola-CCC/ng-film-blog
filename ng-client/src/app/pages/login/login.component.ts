import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../services/token/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '@services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : UntypedFormGroup;
  /** indique si la connexion a réussi ou non  */
  loginIsSuccess: boolean | null = null;
  /** message d'erreur en cas d'ehec */
  errorMessage = '';
  /** message de success */
  sucessMessage = '';
  /** indique si le formualaire a été envoyé ou non  */
  submitted : boolean | null  = null;

  constructor(private fb: UntypedFormBuilder,private authService: AuthService , private storage: TokenStorageService , private router: Router) {
    this.loginForm = this.fb.group({
      email: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required])
    });
  }

  get email (): any {
    return this.loginForm.get('email') as UntypedFormGroup ;
  }

  get password (): any {
    return this.loginForm.get('password') as UntypedFormGroup ;
  }

  get controlLogin() : any {
    return this.loginForm.controls;
  }

  // Change All controls value
  setDefaultValue() { 
    this.loginForm.setValue(
    {
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {}
  

  onSubmit(): void {
    this.submitted = true;
    this.authService.login( this.email.value, this.password.value).subscribe({
      next: data => {
        console.log(data);
        this.storage.setToken(data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.loginIsSuccess = true;
        this.router.navigate(['/home']);

        
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.loginIsSuccess = false;
      }
    });
    if (this.loginForm.invalid) {
      return;
    }
  }
  
}
