import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategoriesForm } from '@shared/interfaces';
import { AuthService, PostService } from '@shared/services';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  insertPostForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    categoryId: ['', Validators.required],
    thumbnail: ['', Validators.required]
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

  fileName: string = '';

  file: File | null = null;

  imagesList: any = [];


  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService,
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

  get thumbnail(): any {
    return this.insertPostForm.get('thumbnail');
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
          this.imagesList = data;
        }
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    });
  }

  public onSubmit() {

    this.postService.addNewPost(this.userId, this.controlAddPost.title.value, this.controlAddPost.content.value, this.controlAddPost.thumbnail.value, Number(this.categoryID)).subscribe({
      next: data => {
        if (data) {
          this.creationPostIsSuccessfull = true;
        } else {
          this.creationPostIsSuccessfull = false;
        }
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.creationPostIsSuccessfull = false;
      }
    });

  }

  public handleShowListInput() {
    this.canShowInputsCategories = !this.canShowInputsCategories;
  }

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
    }
  }

  public onSubmitBis() 
  {
    const formData = new FormData();
    formData.append('thumbnail', this.file ,this.fileName);

    const upload$ = this.postService.uploadImage(formData);
    upload$.subscribe({
      next: (data) => console.log('Response ', data),
      error: (error) => {
        return throwError(() => error)
      },
    })
  }

}

