import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../../../shared/services/token/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { ImagesService } from '@shared/services/images/images.service';

interface UploadResponse {
  imageId: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    username: ['' , Validators.required],
    email: ['' , Validators.required],
    password: ['' , Validators.required],
    profilePicture: ['' , Validators.required],

  })
  /** indique si le formulaire a été envoyé ou non  */
  submitted : boolean = false;
  /** indique si s'inscription a réussi ou non  */
  signUpIsSuccessful = false;
  errorMessage = '';

  previewImageFile = '';
  /** Nom du fichier chargé */
  fileName: string = '';
  /** fichier */
  file: File | null = null;
  /** Id de l'image inséré avec succès */
  insertImageID: number = null;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private storage: TokenStorageService,
    private router: Router,
    private imagesService: ImagesService
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

  get profilePicture (): any {
    return this.registerForm.get('profilePicture');
  }

  get controlRegister() : { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }


  ngOnInit(): void {}
  

  public onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
      this.fileName = this.file.name;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previewImageFile = e.target.result;
      };

      reader.readAsDataURL(this.file);
    }
  }

  public cleanThumbnailUpload(){
    this.previewImageFile = '';
    return this.profilePicture.setValue('')
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

  public uploadAndCreateUser(formData: FormData): Observable<any> {
    return this.imagesService.uploadImage(formData).pipe(
      switchMap((data: UploadResponse) => this.createUserWithImage(data.imageId +'')),
      catchError((error) => throwError(() => error))
    );
  }

  private createUserWithImage(imageId: string): Observable<any> {
    return this.authService.register(
      this.username.value, 
      this.email.value, 
      this.password.value, 
      imageId
    );
  }

  onSubmit(){

    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('thumbnail', this.file, this.fileName);

    this.uploadAndCreateUser(formData).subscribe({
      next: data => {
        if(data.jwt && data.user) {
          this.storage.setToken(data.jwt);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.signUpIsSuccessful = true;
          this.router.navigate(['/home']);
        }
      },
      error: error => {
        this.signUpIsSuccessful = false;
        this.setDefaultValue();
        this.onReset();
        throwError(() => error)
      }
    });
  }
  
}
