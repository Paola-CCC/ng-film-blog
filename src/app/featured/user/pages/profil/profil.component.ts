import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, UserService } from '@shared/services';
import { ImagesService } from '@shared/services/images/images.service';
import { finalize, Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  /** id utilisateur */
  userId: number; 
  /** données utilisateurs */
  userData: any;

  /** id de l'image de l'utilisateur */
  userImageId : number | undefined = undefined;

  profilePictureId: number;

  previewImageFile = '';
  /** Nom du fichier chargé */
  fileName: string = '';
  /** fichier */
  file: File | null = null;
  /** Id de l'image inséré avec succès */
  insertImageID: number = null;

  canDisplayPreviewImage: boolean = false ;

  constructor( private userService: UserService , 
    private auth: AuthService,
    private http: HttpClient,
    private imagesService: ImagesService
  
  ) { }

  ngOnInit(): void {
    this.userId = this.auth.userDatasStored.id;
    this.userService.getById(this.userId).subscribe({
      next: data => {
        this.userData = data;
        this.userImageId = data.userImageId;
      },
      error: err => {
        console.log(err);
      }
    });

  }

  deleteImage() {
    const formData = new FormData();
    formData.append('thumbnail', this.file ,this.fileName);

      const deleteImage = this.imagesService.deleteImage(Number(this.userImageId)).subscribe({
        next:(response) => {
          console.log( response)
        },
        error:(error)=> {
          return throwError(() => error)

        }
      })


      const upload = this.imagesService.uploadImage(formData).subscribe({
        next:(response:any) => {
          this.profilePictureId = response.imageId;

          const updateUserPhoto = this.userService.updateUserPhoto(this.userId, response.imageId).subscribe({
            next:(response:any) => {
              console.log( response)
            },
            error:(error)=> {
              return throwError(() => error)
    
            }
          })
        },
        error:(error)=> {
          return throwError(() => error)

        }
      });
      

  



  }

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


  public showPreviewImage(){
    return this.canDisplayPreviewImage = !this.canDisplayPreviewImage;
  }


}
