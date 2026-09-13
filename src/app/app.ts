import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/textfield/outlined-text-field.js';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  protected readonly optionList = viewChild<ElementRef<HTMLDivElement>>('optionList');
  protected readonly options = signal(['カフェで休む', '本屋をぶらぶらする', '公園を散歩する']);
  protected readonly newOption = signal('');
  protected readonly result = signal('');
  protected readonly hasDecided = signal(false);
  protected readonly resultCardAnimating = signal(false);

  protected updateNewOption(value: string) {
    this.newOption.set(value.slice(0, this.maxOptionLength));
  }
  protected readonly maxOptionLength = 30;

  protected addOption() {
    const option = this.newOption().trim();
    if (!option) return;
    this.options.update((options) => [...options, option]);
    this.newOption.set('');
    this.changeDetectorRef.detectChanges();
    this.scrollOptionListToBottom();
  }

  private scrollOptionListToBottom() {
    const list = this.optionList()?.nativeElement;
    list?.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
  }

  protected removeOption(index: number) {
    this.options.update((options) => options.filter((_, optionIndex) => optionIndex !== index));
    if (this.options().length < 2) {
      this.result.set('');
      this.hasDecided.set(false);
    }
  }

  protected decide() {
    const options = this.options();
    if (options.length < 2) return;
    this.result.set(options[Math.floor(Math.random() * options.length)]);
    this.hasDecided.set(true);
    this.resultCardAnimating.set(false);
    requestAnimationFrame(() => this.resultCardAnimating.set(true));
  }
}
