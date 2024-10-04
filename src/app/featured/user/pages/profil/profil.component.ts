import { Component, OnInit } from '@angular/core';
import { IUserProfile } from '@shared/interfaces';
import { AuthService, UserService } from '@shared/services';
import { ImagesService } from '@shared/services/images/images.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  /** id utilisateur */
  userId: number; 
  /** données utilisateurs */
  userData : IUserProfile = {} as IUserProfile;

  /** id de l'image de l'utilisateur */
  userImageId : number | undefined = undefined;

  previewImageFile = '';
  /** Nom du fichier chargé */
  fileName: string = '';
  /** fichier */
  file: File | null = null;
  /** Id de l'image inséré avec succès */
  insertImageID: number = null;
  /** indique si on peut afficher le preview */
  canDisplayPreviewImage: boolean = false ;
  /** état affichage boutons update image  */
  hiddenUpdateImageBtns: boolean = false;

  constructor( private userService: UserService , 
    private auth: AuthService,
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

  public updateUserImage() {

    if(this.userData.userImageId !== null){
      this.imagesService.deleteImage(this.userImageId).subscribe({
        next:(response) => {
          console.log( response)
        },
        error:(error)=> {
          return throwError(() => error)
        }
      })
    }

    this.uploadImage();
  }

  public uploadImage(){

    const formData = new FormData();
    formData.append('thumbnail', this.file ,this.fileName);

    this.imagesService.uploadImage(formData).subscribe({
      next:(response:any) => {
        this.updateUserPhoto(response.imageId);
      },
      error:(error)=> {
        return throwError(() => error)
      }
    });
  }

  public updateUserPhoto(imageId: number){
    this.userService.updateUserPhoto(this.userId, imageId).subscribe({
      next:(response:any) => {
        console.log( response)
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

  /** permet afficher le preview  */
  public showPreviewImage(){
    this.previewImageFile = '';
    this.hiddenUpdateImageBtns = !this.hiddenUpdateImageBtns;
    return this.canDisplayPreviewImage = !this.canDisplayPreviewImage;
  }

  public updateTemplate(){
    this.hiddenUpdateImageBtns = false;
    this.canDisplayPreviewImage = false;
  }

}
