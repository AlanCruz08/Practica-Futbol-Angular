import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.scale(1.1);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.scale(1);
  }

  private scale(factor: number) {
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${factor})`);
  }

}
