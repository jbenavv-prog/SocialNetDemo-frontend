import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, ProfileService, PublicationService } from 'src/app/_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileService: ProfileService,
    private publicationService: PublicationService,
  ) {
    this.user = this.authService.userValue;
  }

  profileId: any;
  profile: any;
  publication: any;
  user: any;
  defaultBanner: string = '../../../assets/images/avatar/defaultBanner.jpg'
  defaultImgAvatar: string = '../../../assets/images/avatar/defaultAvatar.png';

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
    });

    this.publicationService.getPublicationsByUser(user).subscribe(response => {
      console.log(response);
      const resp = response;
      this.publication = resp;
    })

  }

}
