import { isPlatformServer } from '@angular/common';
import {
  ApplicationRef,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import tippy from 'tippy.js';
import { TplRef } from '../utils/template-ref';
import {
  NgxTippyContent,
  NgxTippyInstance,
  NgxTippyProps,
  TemplateViewOptions,
  TippyHTMLElement,
  ViewOptions,
  ViewRef,
} from './ngx-tippy.interfaces';
import { NgxTippyService } from './ngx-tippy.service';
import { setTemplateVisible } from './ngx-tippy.utils';

@Directive({
  selector: '[ngxTippy]',
})
export class NgxTippyDirective implements OnInit, OnDestroy {
  @Input() ngxTippy?: NgxTippyContent;
  @Input() tippyProps?: NgxTippyProps;
  @Input() tippyName?: string;
  @Input() data?: any;
  @Input() tippyClassName?: string;

  private tippyInstance!: NgxTippyInstance;
  private viewOptions$!: ViewOptions;
  private viewRef!: ViewRef;

  constructor(
    private tippyEl: ElementRef,
    private ngxTippyService: NgxTippyService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platform: Object,
    private appRef: ApplicationRef,
    private vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platform)) return;
    this.initTippy();
  }

  ngOnDestroy() {
    this.clearInstance();
  }

  /**
   * Tooltip initialize
   * Content can be directly passed through `ngxTippy` selector
   */
  private initTippy() {
    // if (this.ngxTippy === null || this.ngxTippy === undefined) return;

    const tippyTarget: TippyHTMLElement = this.tippyEl.nativeElement;
    let tippyTemplate = this.ngxTippy;

    if (this.isTemplateRef(this.ngxTippy)) {
      this.viewOptions$ = {
        context: {
          $implicit: this.tippyName,
          data: this.data,
        },
      };
      this.viewRef = this.createTemplate(this.ngxTippy, {
        vcr: this.vcr,
        ...this.viewOptions$,
      });

      tippyTemplate = this.viewRef.getElement();
    } else {
      tippyTemplate = this.ngxTippy;
    }

    if (tippyTemplate === null || tippyTemplate === undefined) return;

    tippy(tippyTarget, { ...(this.tippyProps || {}), ...(tippyTemplate && { content: tippyTemplate }) });

    setTemplateVisible(tippyTemplate, this.renderer);
    this.setTippyInstance(tippyTarget);
  }

  private setTippyInstance(tippyTarget: TippyHTMLElement) {
    this.tippyInstance = tippyTarget._tippy;
    this.setClassName(this.tippyInstance);
    this.writeInstancesToStorage(this.tippyInstance);
  }

  private setClassName(tippyInstance: NgxTippyInstance) {
    if (!this.tippyClassName) return;
    const classNames = this.tippyClassName.split(' ');

    classNames.length &&
      classNames.forEach(className => {
        this.renderer.addClass(tippyInstance.popper.firstElementChild, className);
      });
  }

  /**
   * To manipulate tooltips, write all instances to storage
   * `tippyName` used as unique key
   * If `tippyName` does not provided - it will be generated using `tippyInstance.id`
   *
   * @param tippyInstance { NgxTippyInstance }
   */
  private writeInstancesToStorage(tippyInstance: NgxTippyInstance) {
    this.ngxTippyService.setInstance(this.tippyName || `tippy-${tippyInstance.id}`, tippyInstance);
  }

  private clearInstance() {
    const instances = this.ngxTippyService.getInstances();

    if (instances && this.tippyInstance) {
      const tippyName = this.tippyName || `tippy-${this.tippyInstance.id}`;

      this.destroyTippyInstance(tippyName);
      this.deleteEntryInStorage(instances, tippyName);
    }
  }

  private destroyTippyInstance(tippyName: string) {
    this.ngxTippyService.destroy(tippyName);
  }

  private deleteEntryInStorage(instances: Map<string, NgxTippyInstance>, tippyName: string) {
    instances.delete(tippyName);
  }

  isTemplateRef(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }

  createTemplate<C>(tpl: TemplateRef<C>, options: TemplateViewOptions = {}) {
    return new TplRef({
      vcr: options.vcr,
      appRef: this.appRef,
      tpl,
      context: options.context,
    });
  }
}
