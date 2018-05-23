import { Component } from '@angular/core';

export const data = [
  {
    field: 'tos_signoff',
    question:
`Hi,
In order for us to answer medical questions, we need you to agree to the Terms and Conditions and that` +
'Qunomedical may collect, process, use, and disclose your personal information, including your health data, ' +
'in order to provide a personal and customized service and as further detailed in your Consent Declaration.',
    answers: ['I agree', 'I don\'t agree']
  },
  {
    field: 'additional_info_grafts',
    question: 'How many grafts do you need?',
    answers: ['1,000 grafts', '2,000 grafts', '3,000 grafts', '4,000 grafts', 'More than 4,000 grafts', 'What is a graft?']
  },
  { field: 'additional_info_age', question: 'How old are you?', answers: ['18-25', '26-35', '36-45', '46-55', '56 or older'] },
  {
    field: 'additional_info_condition_duration',
    question: 'For how long have you been experiencing hair loss?',
    answers: ['Less than 1 year', '1-2 years', '2-5 years', 'Longer than 5 years']
  },
  { field: 'email', question: 'What is your email?'},
  { field: 'phone_number', question: 'What is your phone number?'},
  { field: 'first_name', question: 'What is your first name?'},
  { field: 'last_name', question: 'What is your lastname?'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  questions = data;
}
