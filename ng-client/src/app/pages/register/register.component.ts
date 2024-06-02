import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../services/token/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '@services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    username: ['' , Validators.required],
    email: ['' , Validators.required],
    password: ['' , Validators.required]
  })
  /** indique si le formulaire a été envoyé ou non  */
  submitted : boolean = false;
  /** indique si s'inscription a réussi ou non  */
  signUpIsSuccessful = false;
  errorMessage = '';

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private storage: TokenStorageService,
    private router: Router
    ) {}

  get username (): any {
    return this.registerForm.get('username') ;
  }

  get email (): any {
    return this.registerForm.get('email') ;
  }

  get password (): any {
    return this.registerForm.get('password');
  }

  get controlRegister() : any {
    return this.registerForm.controls;
  }


  ngOnInit(): void {}
  

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.username.value, this.email.value, this.password.value).subscribe({
      next: data => {
        if( data.jwt && data.user ) {
          this.storage.setToken(data.jwt);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.signUpIsSuccessful = true;
          this.router.navigate(['/home']);
        } else {
          this.signUpIsSuccessful = false;
        }

      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.signUpIsSuccessful = false;
      }
    });
  }

  
  setDefaultValue() { 
    this.registerForm.setValue({
      username:'',
      email: '',
      password: ''
    });
  }
  

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
  
}
