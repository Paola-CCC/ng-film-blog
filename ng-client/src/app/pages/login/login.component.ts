import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { TokenStorageService } from '../../_services/token/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : UntypedFormGroup;
  /** indique si la connexion a réussi ou non  */
  loginIsSuccess = false;
  /** message d'erreur en cas d'ehec */
  errorMessage = '';
  /** message de success */
  sucessMessage = '';
  /** indique si le formualaire a été envoyé ou non  */
  submitted : boolean = false;

  constructor(private fb: UntypedFormBuilder,private authService: AuthService , private storage: TokenStorageService) {
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
        this.loginIsSuccess = true;
        
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
