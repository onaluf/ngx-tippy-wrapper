import { ApplicationRef, ViewContainerRef } from '@angular/core';
import { NgxTippyTemplate, ViewRef } from '../ngx-tippy.interfaces';
import * as i0 from "@angular/core";
export declare class NgxViewService {
    private appRef;
    viewContainerRef: ViewContainerRef;
    constructor(appRef: ApplicationRef);
    getViewRefInstance(content: NgxTippyTemplate, tippyName?: string, tippyContext?: any): ViewRef;
    private createTemplate;
    private createComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxViewService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgxViewService>;
}
