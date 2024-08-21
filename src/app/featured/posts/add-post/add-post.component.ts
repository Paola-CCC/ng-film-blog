import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategoriesForm } from '@shared/interfaces';
import { AuthService, PostService } from '@shared/services';
import { ImagesService } from '@shared/services/images/images.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';


interface UploadResponse {
  imageId: string;
}

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit ,DoCheck {

  insertPostForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    categoryId: ['', Validators.required],
    thumbnailLink: [{ value: '', disabled: false }, Validators.required],
    thumbnailUpload: [{ value: '', disabled: false }, Validators.required]

  })
  /** Message erreur */
  errorMessage: string = '';
  /** indique si formulaire est envoyé */
  submitted: boolean = false;
  /** indique si la création est réussie */
  creationPostIsSuccessfull: boolean | null = null;
  /** Stock Id utilisateur */
  userId: number | null = null;
  /** indique si on affiche ou non liste des inputs */
  canShowInputsCategories: boolean = false;
  /** liste des labels pour la catégories */
  categoryPostList: ICategoriesForm[] = [];

  console = console;

  previewImageFile = '';
  /** Nom du fichier chargé */
  fileName: string = '';
  /** fichier */
  file: File | null = null;
  /** Id de l'image inséré avec succès */
  insertImageID: number = null;



  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService,
    private imagesService: ImagesService
  ) { }


  get title(): any {
    return this.insertPostForm.get('title');
  }

  get content(): any {
    return this.insertPostForm.get('content');
  }

  get categoryID(): any {
    return this.insertPostForm.get('categoryId').value;
  }

  get thumbnailLink(): any {
    return this.insertPostForm.get('thumbnailLink');
  }

  get thumbnailUpload(): any {
    return this.insertPostForm.get('thumbnailUpload');
  }

  get controlAddPost() {
    return this.insertPostForm.controls;
  }

  ngOnInit() {
    this.userId = this.authService.userDatasStored.id;

    this.postService.getAllCategories().subscribe({
      next: data => {
        if (data) {
          this.categoryPostList = [...data];
        }
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    });

    this.postService.showImages().subscribe({
      next: data => {
        if (data) {
         //this.imagesList = data;
        }
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    });
  }

  ngDoCheck(): void {
    
    if( this.thumbnailLink.value === '' && this.thumbnailUpload.value === ''){
      this.thumbnailLink.enable();
      this.thumbnailUpload.enable();
    }

    if( this.thumbnailLink.value === '' && this.thumbnailUpload.value !== ''){
      this.thumbnailLink.disable();
      this.thumbnailUpload.enable();
    }

    if( this.thumbnailLink.value !== '' && this.thumbnailUpload.value === ''){
      this.thumbnailLink.enable();
      this.thumbnailUpload.disable();
    }

  }

  public handleShowListInput() {
    this.canShowInputsCategories = !this.canShowInputsCategories;
  }

  /** Afficher la catégorie choisie */
  public getLabelInputSelected() {
    let data = this.categoryPostList.find(e => e.value === this.categoryID);
    return data.label;
  }

  public closeLabelGroup() {
    return this.canShowInputsCategories = false;
  }

  public onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
      this.fileName = this.file.name;

      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.previewImageFile = e.target.result;
      };

      reader.readAsDataURL(this.file);

    }
  }

  public onSubmitUploadImage() 
  {
    const formData = new FormData();
    formData.append('thumbnail', this.file ,this.fileName);

    const upload$ = this.postService.uploadImage(formData);
    upload$.subscribe({
      next: (data) => this.insertImageID = data['imageId'],
      error: (error) => {
        return throwError(() => error)
      },
    })
  }


  public cleanThumbnailUpload(){
    this.previewImageFile = '';
    return this.thumbnailUpload.setValue('')
  }


  public uploadAndCreatePost(formData: FormData): Observable<any> {
    return this.imagesService.uploadImage(formData).pipe(
      switchMap((data: UploadResponse) => this.createPostWithImage(data.imageId)),
      catchError((error) => this.handleError(error))
    );
  }

  private createPostWithImage(imageIdOrLink: string): Observable<any> {
    return this.postService.addNewPost(
      this.userId,
      this.title.value,
      this.content.value,
      imageIdOrLink,
      Number(this.categoryID)
    );
  }

  private handleError(error: any): Observable<never> {
    this.creationPostIsSuccessfull = false;
    return throwError(() => error);
  }

  /** ajouter un poste dont l'image est charger */
  public submitImageUpload() {
    const formData = new FormData();
    formData.append('thumbnail', this.file, this.fileName);

    this.uploadAndCreatePost(formData).subscribe({
      next: (data) => {
        this.creationPostIsSuccessfull = true;
        console.log('Post created successfully:', data);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.creationPostIsSuccessfull = false;
      }
    });
  }

  /** ajouter un poste dont l'image est  un lien */
  public submitImageLink() {

    this.createPostWithImage(this.thumbnailLink.value).subscribe({
      next: data => {
        if (data) {
          this.creationPostIsSuccessfull = true;
        }
      },
      error: err => this.handleError(err)
    });

  }


  onSubmit(){
    if( this.thumbnailLink.value === '' && this.thumbnailUpload.value !== ''){
      this.submitImageUpload();
    }

    if( this.thumbnailLink.value !== '' && this.thumbnailUpload.value === ''){
      this.submitImageLink();
    }
  }
}

