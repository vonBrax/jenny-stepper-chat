import { Component } from '@angular/core';

export const data = [
  { question: 'Do you agree to the terms?', answers: ['Yes', 'No'], shouldBeVisible: true  },
  { question: 'How many grafts?', answers: ['1', '2', '3', '4'], shouldBeVisible: false  },
  { question: 'Where do you wanna go?', answers: ['New York', 'Japan', 'Capetown'], shouldBeVisible: false  },
  { question: 'When do you wanna go?', answers: ['Back to the future', 'Tomorrow', 'In a little while'], shouldBeVisible: false  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  questions = data;

  changeVisibility(index: number): void {
  this.questions[index].shouldBeVisible = !this.questions[index].shouldBeVisible;
  }
}
