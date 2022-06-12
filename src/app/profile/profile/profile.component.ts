import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, CommentService, ProfileService, PublicationService, ReactionService } from 'src/app/_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private publicationService: PublicationService,
    private commentService: CommentService,
    private reactionService: ReactionService,
  ) {
    this.user = this.authService.userValue;
  }

  profileId: any;
  profile: any;
  publications: any;
  user: any;
  defaultBanner: string = '../../../assets/images/avatar/defaultBanner.jpg'
  defaultImgAvatar: string = '../../../assets/images/avatar/defaultAvatar.png';
  likes: any = {};
  commentsEnabled: boolean = false;
  canEdit: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.profileId = paramMap.get('id');
    });

    const user = {
      id: this.profileId
    }

    this.profileService.getProfile(user).subscribe(response => {
      console.log(response);
      const resp: any = response
      this.profile = resp.data;

      if (resp.data.idAccount == this.user.data.id) {
        this.canEdit = true;
      }
    });

    this.publicationService.getPublicationsByUser(user).subscribe(response => {
      console.log(response);
      const resp: any = response;
      this.publications = resp.data.result;
    })
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

  updatePhotoProfile(e: any): void {
    const event = (e.target as HTMLInputElement);
    const file = event.files![0];
    const id = event.id;
    const formData = new FormData();

    formData.append('photoProfileURL', file);

    this.profileService.updatePhotoProfile(formData, this.user.data).subscribe(response => {
      console.log(response);
    })
  }
}
