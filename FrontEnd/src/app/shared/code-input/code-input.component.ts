import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'code-input',
  template: `
    <div class="code-input">
      <input
        *ngFor="let digit of digits; let i = index"
        type="text"
        maxlength="1"
        (input)="onInput($event, i)"
        (keydown)="onKeyDown($event, i)"
        [value]="code[i] || ''"
        [class.hidden]="isCodeHidden"
      />
    </div>
  `,
  styles: [`
    .code-input {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    .code-input input {
      width: 40px;
      height: 40px;
      text-align: center;
      font-size: 18px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .code-input input.hidden {
      color: transparent;
      text-shadow: 0 0 0 #000;
    }
  `]
})
export class CodeInputComponent {
  @Input() isCodeHidden: boolean = false;
  @Input() codeLength: number = 6;
  @Output() codeCompleted = new EventEmitter<string>();

  code: string[] = [];
  digits = Array(this.codeLength).fill(0);

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    this.code[index] = input.value;
  
    // Emit the completed code if all inputs are filled
    if (this.code.join('').length === this.codeLength) {
      this.codeCompleted.emit(this.code.join('')); // Emits a string
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    // Handle backspace to clear the current input and focus the previous one
    if (event.key === 'Backspace' && !input.value && index > 0) {
      const prevInput = input.previousElementSibling as HTMLInputElement;
      prevInput?.focus();
      this.code[index - 1] = '';
    }
  }
}
