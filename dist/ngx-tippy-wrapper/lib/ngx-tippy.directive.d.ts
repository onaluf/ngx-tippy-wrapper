import { ElementRef, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { NgxTippyContent, NgxTippyProps } from './ngx-tippy.interfaces';
import { NgxTippyService, NgxViewService } from './services';
import * as i0 from "@angular/core";
export declare class NgxTippyDirective implements OnInit, OnDestroy {
    private tippyEl;
    private renderer;
    private ngxTippyService;
    private ngxViewService;
    private viewContainerRef;
    private platform;
    ngxTippy?: NgxTippyContent;
    tippyProps?: NgxTippyProps;
    tippyName?: string;
    tippyClassName?: string;
    tippyContext: any;
    private tippyInstance;
    private cachedInstances;
    constructor(tippyEl: ElementRef, renderer: Renderer2, ngxTippyService: NgxTippyService, ngxViewService: NgxViewService, viewContainerRef: ViewContainerRef, platform: Object);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /**
     * Tooltip initialize
     * Content can be directly passed through `ngxTippy` selector
     */
    private initTippy;
    private setTippyInstance;
    private setClassName;
    private removeClassName;
    /**
     * To manipulate tooltips, write all instances to storage
     * `tippyName` used as unique key
     * If `tippyName` does not provided - it will be generated using `tippyInstance.id`
     *
     * @param tippyInstance { NgxTippyInstance }
     */
    private writeInstancesToStorage;
    private handleChanges;
    private handleNameChanges;
    private handleContentChanges;
    private handlePropsChanges;
    private handleClassChanges;
    private cachedTippyInstances;
    private destroyTippy;
    private clearInstance;
    private clearViewRef;
    private destroyTippyInstance;
    private deleteEntryInStorage;
    private resetLocalInstance;
    private clearCachedInstances;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxTippyDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgxTippyDirective, "[ngxTippy]", never, { "ngxTippy": "ngxTippy"; "tippyProps": "tippyProps"; "tippyName": "tippyName"; "tippyClassName": "tippyClassName"; "tippyContext": "tippyContext"; }, {}, never, never, false>;
}
