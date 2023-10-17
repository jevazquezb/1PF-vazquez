import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[headerFont]',
})
export class HeaderFontDirective {
  @Input()
  set fontWeight(newValue: string) {
    this.render.setStyle(
      this.elementRef.nativeElement,
      'font-weight',
      newValue
    );
  }

  constructor(private elementRef: ElementRef, private render: Renderer2) {
    this.render.setStyle(this.elementRef.nativeElement, 'font-size', '20px');
  }
}