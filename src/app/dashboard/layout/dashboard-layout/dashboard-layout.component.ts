import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth-service.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private userService = inject(AuthService)

  public user = computed(() => this.userService.currentUser())

}
