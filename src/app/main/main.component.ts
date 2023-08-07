import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  animations: [
    trigger('openClose', [
      state('open', style({
        top: '0px'
      })),
      state('closed', style({
        top: '-12vh'
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ]),
  ],
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  linkSelected: string;
  isMobile: boolean;
  isOpenMenu = false;
  isOpen: boolean = false;
  contentElement: any;

  constructor(public translate: TranslateService, private zone: NgZone) {
    translate.addLangs(['en', 'ru', 'ua']);
    translate.setDefaultLang('ua');
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|ru|ua/) ? browserLang : 'en');
    this.setIsMobile();
  }

  ngOnInit() {
    window.addEventListener('orientationchange', this.setIsMobile.bind(this), true);
    this.contentElement = document.getElementById("content");
    window.addEventListener('scroll', this.scrollEvent.bind(this), true);
  }

  ngOnDestroy() {
    window.removeEventListener('orientationchange', this.setIsMobile.bind(this), true);
    window.removeEventListener('scroll', this.scrollEvent.bind(this), true);
  }

  private scrollEvent(): void {
  if (this.contentElement.scrollTop > window.innerHeight - 100) {
      this.zone.run(() => this.isOpen = true)
    } else {
      this.zone.run(() => this.isOpen = false)
    }
  }

  public getState(): string {
    return this.isOpen ? 'open' : 'closed';
  }

  private setIsMobile() {
    let screen = window.screen;
    this.zone.run(() => {
      this.isMobile = screen.width < 1280;
    });
  }

  public changeTranslate(lang: string) {
    this.translate.use(lang);
    this.closeMenu();
  }

  public selectLink(link: string) {
    this.linkSelected = link;
    this.closeMenu();
  }

  public isSelected(link: string): boolean {
    return this.linkSelected == link;
  }

  public openMenu() {
    this.isOpenMenu = true;
  }

  public closeMenu() {
    this.isOpenMenu = false;
  }
}
