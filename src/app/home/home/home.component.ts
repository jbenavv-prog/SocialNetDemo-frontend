import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services';
import { ProfileService } from 'src/app/_services/profile.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    public dialog: MatDialog,
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
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'publication-dialog.html',
  styleUrls: ['./home.component.scss']
})
export class PublicationDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  imageSrc: any;

  loadImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }
}
