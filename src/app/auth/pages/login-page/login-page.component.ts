import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import swal from 'sweetalert2'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private authService = inject(AuthService)
  private fb          = inject(FormBuilder)
  private router      = inject(Router)

  public myFormGroup: FormGroup = this.fb.group({
    email: ['saiterbellomateo@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  })

  
  login() {

    const { email } = this.myFormGroup.value
    const { password } = this.myFormGroup.value

    this.authService.login(email, password)
      .subscribe(
        {
          next: () => this.router.navigateByUrl('/dashboard'),
          error: (message) => swal.fire('Error:', message, 'error')
        }
      )
  }

}
