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

  registerForm : UntypedFormGroup ;
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
    ) {
    this.registerForm = this.fb.group({
      username: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required])
    });
  }

  get username (): any {
    return this.registerForm.get('username') as UntypedFormGroup ;
  }

  get email (): any {
    return this.registerForm.get('email') as UntypedFormGroup ;
  }

  get password (): any {
    return this.registerForm.get('password') as UntypedFormGroup ;
  }

  get controlRegister() : any {
    return this.registerForm.controls;
  }


  ngOnInit(): void {}
  

  onSubmit(): void {
    this.submitted = true;

    this.authService.register(this.username.value, this.email.value, this.password.value).subscribe({
      next: data => {
        console.log(data);
        this.storage.setToken(data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.signUpIsSuccessful = true;
        this.router.navigate(['/home']);

      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.signUpIsSuccessful = false;
      }
    });
    if (this.registerForm.invalid) {
      return;
    }

  }

  // Change All controls value
  setDefaultValue() { 
    this.registerForm.setValue(
    {
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
