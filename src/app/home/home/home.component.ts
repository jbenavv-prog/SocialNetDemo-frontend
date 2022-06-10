import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
  ) {
    this.user = this.authService.userValue;
  }

  user: any;
  profile: any;
  defaultImgAvatar: string = '../../../assets/images/avatar/defaultAvatar.png';

  ngOnInit(): void {
    this.profileService.getProfile(this.user.data).subscribe(response => {
      let resp: any = response;
      this.profile = resp.data;
    })
  }
}
