import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-google-button',
  imports: [],
  templateUrl: './google-button.html',
  styleUrl: './google-button.scss'
})
export class GoogleButton {
  text = input('Sign in with Google');
  disabled = input(false);
  showIcon = input(true);
  buttonClass = input('btn-google');
  buttonStyle = input('display: inline-flex; align-items: center; gap: 8px;');

  onClick = output<void>();
}
