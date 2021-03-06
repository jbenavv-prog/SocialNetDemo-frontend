import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService, ProfileService } from 'src/app/_services';
import * as $ from 'jquery';
import { Router } from '@angular/router';

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
    private router: Router,
  ) {
    this.user = this.authService.userValue;
    this.authService.user.subscribe(x => this.user = x);
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

  logOut() {
    this.authService.logout();
  }

  navigateToProfile(idAccount: string) {
    this.router.navigate([`profile/${idAccount}`])
    .then(() => {
      window.location.reload();
    });
  }
}
