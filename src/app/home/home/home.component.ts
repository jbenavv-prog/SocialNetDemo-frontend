import { Component, Inject, OnInit } from '@angular/core';
import { AuthService, CommentService, ProfileService, PublicationService, ReactionService } from 'src/app/_services';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private publicationService: PublicationService,
    private reactionService: ReactionService,
    private commentService: CommentService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.user = this.authService.userValue;
  }

  user: any;
  profile: any;
  defaultImgAvatar: string = '../../../assets/images/avatar/defaultAvatar.png';
  loading: boolean = false;
  publications: any;
  globalLikes: any;
  commentsEnabled: boolean = false;
  commentsChips: any = [];

  likes: any = {}

  ngOnInit(): void {
    this.profileService.getProfile(this.user.data).subscribe(response => {
      let resp: any = response;
      this.profile = resp.data;
    });
    this.getPublications();
  }

  getPublications() {
    this.publicationService.getPublications().subscribe(response => {
      const resp: any = response;
      console.log(resp);
      this.publications = resp.data.result;
    })
  }

  openDialog() {

    const dialogRef = this.dialog.open(PublicationDialog, {
      data: {
        user: this.user,
        profile: this.profile,
        defaultImgAvatar: this.defaultImgAvatar
      },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  like(event: any) {
    let idPublication: number;

    if (event.target.id) {
      idPublication = event.target.id
    } else {
      idPublication = event.target.parentElement.id
    }

    let like: any;

    if (this.likes[idPublication]) {
      like = this.likes[idPublication].like;
      if (this.likes[idPublication].like == 1) {
        like = 0;
      } else {
        like = 1;
      }
    }

    const idTypeReaction = 1;

    Object.assign(this.likes, { [idPublication]: { like, idTypeReaction } });

    const reaction = {
      idPublication,
      like,
      idTypeReaction,
    }

    const request = {
      user: this.user.data,
      reaction
    }

    this.reactionService.create(request).subscribe(response => {
      this.ngOnInit();
    })
  }

  validateLike(idAccountsWhoLiked: any, idPublication: any) {
    for (let i in idAccountsWhoLiked) {
      if (idAccountsWhoLiked[i] == this.user.data.id) {
        Object.assign(this.likes, { [idPublication]: { like: 1, idTypeReaction: 1 } });
        return true;
      }
    }
    Object.assign(this.likes, { [idPublication]: { like: 0, idTypeReaction: 1 } });
    return false;
  }

  onEnterComment(event: any) {
    const comment = {
      idPublication: event.target.id,
      description: event.target.value
    }

    const request = {
      user: this.user.data,
      comment
    }

    this.commentService.create(request).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    })
  }

  navigateToProfile(idAccount: string) {
    this.router.navigate([`profile/${idAccount}`])
    .then(() => {
      window.location.reload();
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'publication-dialog.html',
  styleUrls: ['./home.component.scss']
})
export class PublicationDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private publicationService: PublicationService,
    private router: Router,
  ) { }

  imageSrc: any;
  loading: boolean = false;


  form = this.fb.group({
    imagePublication: [''],
    description: ['', Validators.required],
  });

  loadImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }

    this.imageToForm(event)
  }

  imageToForm(e: any) {
    const event = (e.target as HTMLInputElement);
    const file = event.files![0];
    const id = event.id;

    this.form.patchValue({
      [id]: file
    });

    this.form.get(id)!.updateValueAndValidity();
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const formData = new FormData();

      Object.keys(this.form.controls).forEach(key => {
        formData.append(key, this.form.get(key)!.value);
      });

      this.publicationService.create(formData, this.data.user.data).subscribe(response => {
        console.log(response);
        this.navigateToProfile(this.data.user.data.id);
      })
    }
  }

  navigateToProfile(idAccount: string) {
    this.router.navigate([`home`])
    .then(() => {
      window.location.reload();
    });
  }
}


