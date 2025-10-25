import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { SidenavComponent } from './core/layout/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidenavComponent
  ],
  template: `
    <div class="app-container">
      <app-header />
      <div class="app-body">
        <app-sidenav />
        <main class="app-content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .app-body {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .app-content {
      flex: 1;
      overflow: auto;
      padding: 24px;
      background-color: #f5f5f5;
    }
  `]
})
export class AppComponent {
  title = 'G-Track TMS';
}
