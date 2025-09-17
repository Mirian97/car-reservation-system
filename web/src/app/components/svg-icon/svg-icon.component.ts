import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map, shareReplay } from 'rxjs';
import { SvgIconService } from './svg-icon.service';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.css',
})
export class SvgIconComponent {
  @Input() public iconName!: string;
  @Input() public fill?: string = 'current';
  @Input() public width?: number = 24;
  @Input() public height?: number = 24;
  @Input() public class?: string = '';

  public sanitizedSvgContent!: SafeHtml;

  constructor(
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private svgIconService: SvgIconService,
  ) {}

  public ngOnInit(): void {
    this.loadSvg();
  }

  private loadSvg(): void {
    if (!this.iconName) return;
    const svgPath = `/assets/svgs/${this.iconName}.svg`;

    if (!this.svgIconService.svgIconMap.has(svgPath)) {
      const svg$ = this.http.get(svgPath, { responseType: 'text' }).pipe(
        map((svg) => {
          svg = svg.replace(/fill=".*?"/, `fill="${this.fill}"`);
          svg = svg.replace(/width=".*?"/, `width="${this.width}px"`);
          svg = svg.replace(/height=".*?"/, `height="${this.height}px"`);
          svg = svg.replace(/class=".*?"/, `class="${this.class}"`);
          return this.sanitizer.bypassSecurityTrustHtml(svg);
        }),
        shareReplay(1),
      );

      this.svgIconService.svgIconMap.set(svgPath, svg$);
    }

    let cachedSvg$ = this.svgIconService.svgIconMap.get(svgPath);

    if (cachedSvg$) {
      cachedSvg$.subscribe({
        next: (svg) => {
          this.sanitizedSvgContent = svg;
          this.cdr.detectChanges();
        },
        error: (error) => console.error(`Error loading SVG`, error),
      });
    }
  }
}
