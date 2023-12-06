import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth-service.service';
import { AuthStatus } from './auth/enums/auth-status.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private authService = inject(AuthService)

  private router = inject(Router)

  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false
    }

    return true

  })

  public authStatusChangedEffect = effect(() => {

    switch (this.authService.authStatus()) {

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login')
        return;

      case AuthStatus.checking:
        return;

        case AuthStatus.authenticated:
          this.router.navigateByUrl('/dashboard')
          return;

    }
  })
}
