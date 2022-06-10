import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services';
import { ProfileService } from 'src/app/_services/profile.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @HostListener('document:click', ['$event']) onDocumentClick() {
    if ($('.session-card').css('display') == 'block') {
      $(".session-card").toggleClass("display");
    }
  }

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

  openSessionCard(event: any) {
    event.stopPropagation();
    $(".session-card").toggleClass("display");
  }

  signOut() {
  }

  viewProfile(){
    
  }
}
