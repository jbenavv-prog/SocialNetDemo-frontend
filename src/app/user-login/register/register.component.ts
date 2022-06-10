import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  loading = false;
  submitted = false;

  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  onSubmit() {

    this.submitted = true;

    if (this.form.valid) {
      console.log('is Valid');

      this.loading = true;

      this.authService.register(this.form.value)
        .pipe(first())
        .subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['../login'], { relativeTo: this.route })
          },
          error: error => {
            this.loading = false;
          }
        })
    }
  }

}
