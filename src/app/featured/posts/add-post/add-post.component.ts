import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService, PostService } from '@shared/services';

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

  errorMessage: string = '' ;

  submitted: boolean = false;

  creationPostIsSuccessfull: boolean | null = null;

  userId: number | null = null;

  constructor( 
    private fb: FormBuilder, 
    private PostService: PostService,
    private authService: AuthService
  ) { }


  get title(): any {
    return this.insertPostForm.get('title');
  }

  get content(): any {
    return this.insertPostForm.get('content');
  }

  get categoryId(): any {
    return this.insertPostForm.get('categoryId');
  }

  get thumbnail(): any {
    return this.insertPostForm.get('thumbnail');
  }

  get controlAddPost() {
    return this.insertPostForm.controls;
  }

  ngOnInit() {
    this.userId = this.authService.userDatasStored.id;

  }

  public onSubmit(){
     
    this.PostService.addNewPost( this.userId ,this.controlAddPost.title.value ,this.controlAddPost.content.value, this.controlAddPost.thumbnail.value , this.controlAddPost.categoryId.value ).subscribe({
      next: data => {
        if(data) {
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
}

