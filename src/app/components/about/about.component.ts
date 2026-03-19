import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  imports: [MatButtonModule, MatIconModule],
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

     techStack = [
        { name: 'Angular', icon: 'assets/icons/angular.svg' },
        { name: 'JavaScript', icon: 'assets/icons/javascript.svg' },
        { name: 'HTML & CSS', icon: 'assets/icons/html.svg' },
        { name: 'Java', icon: 'assets/icons/java.svg' },
        { name: 'Spring Boot', icon: 'assets/icons/springboot.svg' },
        { name: 'Git & GitHub', icon: 'assets/icons/github.svg' },
        { name: 'MySQL', icon: 'assets/icons/mysql.svg' },
        { name: 'Jira', icon: 'assets/icons/jira.svg' },
        { name: 'Confluence', icon: 'assets/icons/confluence.svg' },
        { name: 'BitBucket', icon: 'assets/icons/bitbucket.svg' },
        { name: 'Bamboo', icon: 'assets/icons/bamboo.svg' },
        { name: 'NodeJS', icon: 'assets/icons/nodejs.svg' },
      ];

}
