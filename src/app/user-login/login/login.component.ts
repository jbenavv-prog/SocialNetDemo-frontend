import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  loading = false;
  submitted = false;

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      console.log('is valid');
      this.loading = true;

      this.loginService.login(this.form.value)
        .pipe(first())
        .subscribe({
          next: (response) => {
            console.log(response);
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
            this.router.navigateByUrl(returnUrl);
          },
          error: error => {
            this.loading = false;
          }
        })

      const request = this.form.value;

      this.loginService.login(request).subscribe(response => {
        console.log(response);
      })

    }
  }

}
