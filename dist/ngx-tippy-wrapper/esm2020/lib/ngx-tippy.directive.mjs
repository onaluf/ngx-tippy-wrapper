import { isPlatformServer } from '@angular/common';
import { Directive, Inject, Input, PLATFORM_ID, } from '@angular/core';
import tippy from 'tippy.js';
import { setTemplateVisible } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "./services";
export class NgxTippyDirective {
    constructor(tippyEl, renderer, ngxTippyService, ngxViewService, viewContainerRef, platform) {
        this.tippyEl = tippyEl;
        this.renderer = renderer;
        this.ngxTippyService = ngxTippyService;
        this.ngxViewService = ngxViewService;
        this.viewContainerRef = viewContainerRef;
        this.platform = platform;
        this.cachedInstances = new Map();
    }
    ngOnInit() {
        if (isPlatformServer(this.platform))
            return;
        this.ngxViewService.viewContainerRef = this.viewContainerRef;
        this.initTippy();
    }
    ngOnChanges(changes) {
        this.handleChanges(changes);
    }
    ngOnDestroy() {
        this.destroyTippy();
    }
    /**
     * Tooltip initialize
     * Content can be directly passed through `ngxTippy` selector
     */
    initTippy() {
        const tippyTarget = this.tippyEl.nativeElement;
        if (this.ngxTippy === null || this.ngxTippy === undefined)
            return;
        const viewRef = this.ngxViewService.getViewRefInstance(this.ngxTippy, this.tippyName, this.tippyContext);
        const tippyElement = viewRef.getElement();
        const tInstance = tippy(tippyTarget, {
            ...(this.tippyProps || {}),
            ...(tippyElement && { content: tippyElement }),
        });
        this.tippyName = this.tippyName || `tippy-${tInstance.id}`;
        setTemplateVisible(tippyElement, this.renderer);
        this.setTippyInstance({ tippyTarget, tippyName: this.tippyName, viewRef });
        this.setClassName(this.tippyInstance, this.tippyClassName);
        this.writeInstancesToStorage(this.tippyInstance, this.tippyName);
    }
    setTippyInstance({ tippyTarget, tippyName, viewRef, }) {
        this.tippyInstance = { ...tippyTarget._tippy, tippyName, viewRef };
    }
    setClassName(tippyInstance, className) {
        if (!className || !tippyInstance)
            return;
        const classNames = className.split(' ');
        classNames.length &&
            classNames.forEach(className => {
                this.renderer.addClass(tippyInstance.popper.firstElementChild, className);
            });
    }
    removeClassName(tippyInstance, className) {
        if (!className || !tippyInstance)
            return;
        const classNames = className.split(' ');
        classNames.length &&
            classNames.forEach(className => {
                this.renderer.removeClass(tippyInstance.popper.firstElementChild, className);
            });
    }
    /**
     * To manipulate tooltips, write all instances to storage
     * `tippyName` used as unique key
     * If `tippyName` does not provided - it will be generated using `tippyInstance.id`
     *
     * @param tippyInstance { NgxTippyInstance }
     */
    writeInstancesToStorage(tippyInstance, tippyName) {
        tippyInstance && this.ngxTippyService.setInstance(tippyName, tippyInstance);
    }
    handleChanges({ tippyName, ngxTippy, tippyProps, tippyClassName }) {
        tippyName && !tippyName.firstChange && this.handleNameChanges(tippyName);
        ngxTippy && !ngxTippy.firstChange && this.handleContentChanges(ngxTippy);
        tippyProps && !tippyProps.firstChange && this.handlePropsChanges(tippyProps);
        tippyClassName && !tippyClassName.firstChange && this.handleClassChanges(tippyClassName);
    }
    handleNameChanges({ previousValue, currentValue }) {
        const tippyInstances = this.cachedTippyInstances();
        if (!tippyInstances || !this.tippyInstance)
            return;
        this.deleteEntryInStorage(tippyInstances, previousValue);
        this.tippyInstance = { ...this.tippyInstance, tippyName: currentValue };
        tippyInstances.set(currentValue, this.tippyInstance);
    }
    handleContentChanges({ currentValue }) {
        const tippyInstances = this.cachedTippyInstances();
        if (this.tippyInstance && this.tippyName) {
            this.ngxTippyService.setContent(this.tippyName, currentValue);
        }
        else {
            this.initTippy();
        }
        if (tippyInstances && this.tippyInstance && currentValue === null) {
            this.clearInstance({ tippyInstance: this.tippyInstance, tippyInstances });
        }
    }
    handlePropsChanges({ currentValue }) {
        this.tippyName && this.ngxTippyService.setProps(this.tippyName, currentValue);
    }
    handleClassChanges({ previousValue, currentValue }) {
        this.removeClassName(this.tippyInstance, previousValue);
        this.setClassName(this.tippyInstance, currentValue);
    }
    cachedTippyInstances() {
        const tippyInstances = this.ngxTippyService.getInstances();
        if (this.cachedInstances.has(tippyInstances)) {
            return this.cachedInstances.get(tippyInstances);
        }
        else {
            this.cachedInstances.set(tippyInstances, tippyInstances);
            return tippyInstances;
        }
    }
    destroyTippy() {
        const tippyInstances = this.cachedTippyInstances();
        const tippyInstance = this.tippyInstance;
        if (!tippyInstance || !tippyInstances)
            return;
        this.clearInstance({ tippyInstance, tippyInstances });
        this.resetLocalInstance();
        this.clearCachedInstances();
    }
    clearInstance({ tippyInstance, tippyInstances, }) {
        const { tippyName } = tippyInstance;
        this.clearViewRef(tippyInstance);
        this.destroyTippyInstance(tippyInstance);
        this.deleteEntryInStorage(tippyInstances, tippyName);
    }
    clearViewRef(tippyInstance) {
        tippyInstance.viewRef?.destroy && tippyInstance.viewRef.destroy();
    }
    destroyTippyInstance(tippyInstance) {
        tippyInstance.destroy();
    }
    deleteEntryInStorage(tippyInstances, tippyName) {
        tippyInstances.delete(tippyName);
    }
    resetLocalInstance() {
        this.tippyInstance = undefined;
    }
    clearCachedInstances() {
        this.cachedInstances.clear();
    }
}
NgxTippyDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxTippyDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.NgxTippyService }, { token: i1.NgxViewService }, { token: i0.ViewContainerRef }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Directive });
NgxTippyDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.12", type: NgxTippyDirective, selector: "[ngxTippy]", inputs: { ngxTippy: "ngxTippy", tippyProps: "tippyProps", tippyName: "tippyName", tippyClassName: "tippyClassName", tippyContext: "tippyContext" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxTippyDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngxTippy]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NgxTippyService }, { type: i1.NgxViewService }, { type: i0.ViewContainerRef }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { ngxTippy: [{
                type: Input
            }], tippyProps: [{
                type: Input
            }], tippyName: [{
                type: Input
            }], tippyClassName: [{
                type: Input
            }], tippyContext: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpcHB5LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC10aXBweS13cmFwcGVyL3NyYy9saWIvbmd4LXRpcHB5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsU0FBUyxFQUVULE1BQU0sRUFDTixLQUFLLEVBR0wsV0FBVyxHQUtaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxNQUFNLFVBQVUsQ0FBQztBQUc3QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxTQUFTLENBQUM7OztBQUs3QyxNQUFNLE9BQU8saUJBQWlCO0lBVTVCLFlBQ1UsT0FBbUIsRUFDbkIsUUFBbUIsRUFDbkIsZUFBZ0MsRUFDaEMsY0FBOEIsRUFDOUIsZ0JBQWtDLEVBQ2IsUUFBZ0I7UUFMckMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNiLGFBQVEsR0FBUixRQUFRLENBQVE7UUFSdkMsb0JBQWUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBU2pDLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQUUsT0FBTztRQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUM3RCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lB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QVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7aUJBQ3ZCOzswQkFpQkksTUFBTTsyQkFBQyxXQUFXOzRDQWZaLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUExBVEZPUk1fSUQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB0aXBweSBmcm9tICd0aXBweS5qcyc7XG5pbXBvcnQgeyBOZ3hUaXBweUNvbnRlbnQsIE5neFRpcHB5SW5zdGFuY2UsIE5neFRpcHB5UHJvcHMsIFRpcHB5SFRNTEVsZW1lbnQsIFZpZXdSZWYgfSBmcm9tICcuL25neC10aXBweS5pbnRlcmZhY2VzJztcbmltcG9ydCB7IE5neFRpcHB5U2VydmljZSwgTmd4Vmlld1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzJztcbmltcG9ydCB7IHNldFRlbXBsYXRlVmlzaWJsZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmd4VGlwcHldJyxcbn0pXG5leHBvcnQgY2xhc3MgTmd4VGlwcHlEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIG5neFRpcHB5PzogTmd4VGlwcHlDb250ZW50O1xuICBASW5wdXQoKSB0aXBweVByb3BzPzogTmd4VGlwcHlQcm9wcztcbiAgQElucHV0KCkgdGlwcHlOYW1lPzogc3RyaW5nO1xuICBASW5wdXQoKSB0aXBweUNsYXNzTmFtZT86IHN0cmluZztcbiAgQElucHV0KCkgdGlwcHlDb250ZXh0OiBhbnk7XG5cbiAgcHJpdmF0ZSB0aXBweUluc3RhbmNlOiBOZ3hUaXBweUluc3RhbmNlIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIGNhY2hlZEluc3RhbmNlcyA9IG5ldyBNYXAoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRpcHB5RWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgbmd4VGlwcHlTZXJ2aWNlOiBOZ3hUaXBweVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBuZ3hWaWV3U2VydmljZTogTmd4Vmlld1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm06IE9iamVjdFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5wbGF0Zm9ybSkpIHJldHVybjtcbiAgICB0aGlzLm5neFZpZXdTZXJ2aWNlLnZpZXdDb250YWluZXJSZWYgPSB0aGlzLnZpZXdDb250YWluZXJSZWY7XG4gICAgdGhpcy5pbml0VGlwcHkoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmhhbmRsZUNoYW5nZXMoY2hhbmdlcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3lUaXBweSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvb2x0aXAgaW5pdGlhbGl6ZVxuICAgKiBDb250ZW50IGNhbiBiZSBkaXJlY3RseSBwYXNzZWQgdGhyb3VnaCBgbmd4VGlwcHlgIHNlbGVjdG9yXG4gICAqL1xuICBwcml2YXRlIGluaXRUaXBweSgpIHtcbiAgICBjb25zdCB0aXBweVRhcmdldDogVGlwcHlIVE1MRWxlbWVudCA9IHRoaXMudGlwcHlFbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgaWYgKHRoaXMubmd4VGlwcHkgPT09IG51bGwgfHwgdGhpcy5uZ3hUaXBweSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICBjb25zdCB2aWV3UmVmID0gdGhpcy5uZ3hWaWV3U2VydmljZS5nZXRWaWV3UmVmSW5zdGFuY2UodGhpcy5uZ3hUaXBweSwgdGhpcy50aXBweU5hbWUsIHRoaXMudGlwcHlDb250ZXh0KTtcbiAgICBjb25zdCB0aXBweUVsZW1lbnQgPSB2aWV3UmVmLmdldEVsZW1lbnQoKTtcblxuICAgIGNvbnN0IHRJbnN0YW5jZSA9IHRpcHB5KHRpcHB5VGFyZ2V0LCB7XG4gICAgICAuLi4odGhpcy50aXBweVByb3BzIHx8IHt9KSxcbiAgICAgIC4uLih0aXBweUVsZW1lbnQgJiYgeyBjb250ZW50OiB0aXBweUVsZW1lbnQgfSksXG4gICAgfSk7XG5cbiAgICB0aGlzLnRpcHB5TmFtZSA9IHRoaXMudGlwcHlOYW1lIHx8IGB0aXBweS0ke3RJbnN0YW5jZS5pZH1gO1xuXG4gICAgc2V0VGVtcGxhdGVWaXNpYmxlKHRpcHB5RWxlbWVudCwgdGhpcy5yZW5kZXJlcik7XG4gICAgdGhpcy5zZXRUaXBweUluc3RhbmNlKHsgdGlwcHlUYXJnZXQsIHRpcHB5TmFtZTogdGhpcy50aXBweU5hbWUsIHZpZXdSZWYgfSk7XG4gICAgdGhpcy5zZXRDbGFzc05hbWUodGhpcy50aXBweUluc3RhbmNlLCB0aGlzLnRpcHB5Q2xhc3NOYW1lKTtcbiAgICB0aGlzLndyaXRlSW5zdGFuY2VzVG9TdG9yYWdlKHRoaXMudGlwcHlJbnN0YW5jZSwgdGhpcy50aXBweU5hbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUaXBweUluc3RhbmNlKHtcbiAgICB0aXBweVRhcmdldCxcbiAgICB0aXBweU5hbWUsXG4gICAgdmlld1JlZixcbiAgfToge1xuICAgIHRpcHB5VGFyZ2V0OiBUaXBweUhUTUxFbGVtZW50O1xuICAgIHRpcHB5TmFtZTogc3RyaW5nO1xuICAgIHZpZXdSZWY6IFZpZXdSZWY7XG4gIH0pIHtcbiAgICB0aGlzLnRpcHB5SW5zdGFuY2UgPSB7IC4uLnRpcHB5VGFyZ2V0Ll90aXBweSwgdGlwcHlOYW1lLCB2aWV3UmVmIH07XG4gIH1cblxuICBwcml2YXRlIHNldENsYXNzTmFtZSh0aXBweUluc3RhbmNlOiBOZ3hUaXBweUluc3RhbmNlIHwgdW5kZWZpbmVkLCBjbGFzc05hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgIGlmICghY2xhc3NOYW1lIHx8ICF0aXBweUluc3RhbmNlKSByZXR1cm47XG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuXG4gICAgY2xhc3NOYW1lcy5sZW5ndGggJiZcbiAgICAgIGNsYXNzTmFtZXMuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRpcHB5SW5zdGFuY2UucG9wcGVyLmZpcnN0RWxlbWVudENoaWxkLCBjbGFzc05hbWUpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNsYXNzTmFtZSh0aXBweUluc3RhbmNlOiBOZ3hUaXBweUluc3RhbmNlIHwgdW5kZWZpbmVkLCBjbGFzc05hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgIGlmICghY2xhc3NOYW1lIHx8ICF0aXBweUluc3RhbmNlKSByZXR1cm47XG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuXG4gICAgY2xhc3NOYW1lcy5sZW5ndGggJiZcbiAgICAgIGNsYXNzTmFtZXMuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRpcHB5SW5zdGFuY2UucG9wcGVyLmZpcnN0RWxlbWVudENoaWxkLCBjbGFzc05hbWUpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVG8gbWFuaXB1bGF0ZSB0b29sdGlwcywgd3JpdGUgYWxsIGluc3RhbmNlcyB0byBzdG9yYWdlXG4gICAqIGB0aXBweU5hbWVgIHVzZWQgYXMgdW5pcXVlIGtleVxuICAgKiBJZiBgdGlwcHlOYW1lYCBkb2VzIG5vdCBwcm92aWRlZCAtIGl0IHdpbGwgYmUgZ2VuZXJhdGVkIHVzaW5nIGB0aXBweUluc3RhbmNlLmlkYFxuICAgKlxuICAgKiBAcGFyYW0gdGlwcHlJbnN0YW5jZSB7IE5neFRpcHB5SW5zdGFuY2UgfVxuICAgKi9cbiAgcHJpdmF0ZSB3cml0ZUluc3RhbmNlc1RvU3RvcmFnZSh0aXBweUluc3RhbmNlOiBOZ3hUaXBweUluc3RhbmNlIHwgdW5kZWZpbmVkLCB0aXBweU5hbWU6IHN0cmluZykge1xuICAgIHRpcHB5SW5zdGFuY2UgJiYgdGhpcy5uZ3hUaXBweVNlcnZpY2Uuc2V0SW5zdGFuY2UodGlwcHlOYW1lLCB0aXBweUluc3RhbmNlKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlQ2hhbmdlcyh7IHRpcHB5TmFtZSwgbmd4VGlwcHksIHRpcHB5UHJvcHMsIHRpcHB5Q2xhc3NOYW1lIH06IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aXBweU5hbWUgJiYgIXRpcHB5TmFtZS5maXJzdENoYW5nZSAmJiB0aGlzLmhhbmRsZU5hbWVDaGFuZ2VzKHRpcHB5TmFtZSk7XG4gICAgbmd4VGlwcHkgJiYgIW5neFRpcHB5LmZpcnN0Q2hhbmdlICYmIHRoaXMuaGFuZGxlQ29udGVudENoYW5nZXMobmd4VGlwcHkpO1xuICAgIHRpcHB5UHJvcHMgJiYgIXRpcHB5UHJvcHMuZmlyc3RDaGFuZ2UgJiYgdGhpcy5oYW5kbGVQcm9wc0NoYW5nZXModGlwcHlQcm9wcyk7XG4gICAgdGlwcHlDbGFzc05hbWUgJiYgIXRpcHB5Q2xhc3NOYW1lLmZpcnN0Q2hhbmdlICYmIHRoaXMuaGFuZGxlQ2xhc3NDaGFuZ2VzKHRpcHB5Q2xhc3NOYW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlTmFtZUNoYW5nZXMoeyBwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUgfTogU2ltcGxlQ2hhbmdlKSB7XG4gICAgY29uc3QgdGlwcHlJbnN0YW5jZXMgPSB0aGlzLmNhY2hlZFRpcHB5SW5zdGFuY2VzKCk7XG4gICAgaWYgKCF0aXBweUluc3RhbmNlcyB8fCAhdGhpcy50aXBweUluc3RhbmNlKSByZXR1cm47XG5cbiAgICB0aGlzLmRlbGV0ZUVudHJ5SW5TdG9yYWdlKHRpcHB5SW5zdGFuY2VzLCBwcmV2aW91c1ZhbHVlKTtcbiAgICB0aGlzLnRpcHB5SW5zdGFuY2UgPSB7IC4uLnRoaXMudGlwcHlJbnN0YW5jZSwgdGlwcHlOYW1lOiBjdXJyZW50VmFsdWUgfTtcbiAgICB0aXBweUluc3RhbmNlcy5zZXQoY3VycmVudFZhbHVlLCB0aGlzLnRpcHB5SW5zdGFuY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVDb250ZW50Q2hhbmdlcyh7IGN1cnJlbnRWYWx1ZSB9OiBTaW1wbGVDaGFuZ2UpIHtcbiAgICBjb25zdCB0aXBweUluc3RhbmNlcyA9IHRoaXMuY2FjaGVkVGlwcHlJbnN0YW5jZXMoKTtcblxuICAgIGlmICh0aGlzLnRpcHB5SW5zdGFuY2UgJiYgdGhpcy50aXBweU5hbWUpIHtcbiAgICAgIHRoaXMubmd4VGlwcHlTZXJ2aWNlLnNldENvbnRlbnQodGhpcy50aXBweU5hbWUsIGN1cnJlbnRWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5pdFRpcHB5KCk7XG4gICAgfVxuXG4gICAgaWYgKHRpcHB5SW5zdGFuY2VzICYmIHRoaXMudGlwcHlJbnN0YW5jZSAmJiBjdXJyZW50VmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuY2xlYXJJbnN0YW5jZSh7IHRpcHB5SW5zdGFuY2U6IHRoaXMudGlwcHlJbnN0YW5jZSwgdGlwcHlJbnN0YW5jZXMgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVQcm9wc0NoYW5nZXMoeyBjdXJyZW50VmFsdWUgfTogU2ltcGxlQ2hhbmdlKSB7XG4gICAgdGhpcy50aXBweU5hbWUgJiYgdGhpcy5uZ3hUaXBweVNlcnZpY2Uuc2V0UHJvcHModGhpcy50aXBweU5hbWUsIGN1cnJlbnRWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUNsYXNzQ2hhbmdlcyh7IHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSB9OiBTaW1wbGVDaGFuZ2UpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZSh0aGlzLnRpcHB5SW5zdGFuY2UsIHByZXZpb3VzVmFsdWUpO1xuICAgIHRoaXMuc2V0Q2xhc3NOYW1lKHRoaXMudGlwcHlJbnN0YW5jZSwgY3VycmVudFZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FjaGVkVGlwcHlJbnN0YW5jZXMoKTogTWFwPHN0cmluZywgTmd4VGlwcHlJbnN0YW5jZT4gfCBudWxsIHtcbiAgICBjb25zdCB0aXBweUluc3RhbmNlcyA9IHRoaXMubmd4VGlwcHlTZXJ2aWNlLmdldEluc3RhbmNlcygpO1xuXG4gICAgaWYgKHRoaXMuY2FjaGVkSW5zdGFuY2VzLmhhcyh0aXBweUluc3RhbmNlcykpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlZEluc3RhbmNlcy5nZXQodGlwcHlJbnN0YW5jZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhY2hlZEluc3RhbmNlcy5zZXQodGlwcHlJbnN0YW5jZXMsIHRpcHB5SW5zdGFuY2VzKTtcbiAgICAgIHJldHVybiB0aXBweUluc3RhbmNlcztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3lUaXBweSgpIHtcbiAgICBjb25zdCB0aXBweUluc3RhbmNlcyA9IHRoaXMuY2FjaGVkVGlwcHlJbnN0YW5jZXMoKTtcbiAgICBjb25zdCB0aXBweUluc3RhbmNlID0gdGhpcy50aXBweUluc3RhbmNlO1xuXG4gICAgaWYgKCF0aXBweUluc3RhbmNlIHx8ICF0aXBweUluc3RhbmNlcykgcmV0dXJuO1xuXG4gICAgdGhpcy5jbGVhckluc3RhbmNlKHsgdGlwcHlJbnN0YW5jZSwgdGlwcHlJbnN0YW5jZXMgfSk7XG4gICAgdGhpcy5yZXNldExvY2FsSW5zdGFuY2UoKTtcbiAgICB0aGlzLmNsZWFyQ2FjaGVkSW5zdGFuY2VzKCk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFySW5zdGFuY2Uoe1xuICAgIHRpcHB5SW5zdGFuY2UsXG4gICAgdGlwcHlJbnN0YW5jZXMsXG4gIH06IHtcbiAgICB0aXBweUluc3RhbmNlOiBOZ3hUaXBweUluc3RhbmNlO1xuICAgIHRpcHB5SW5zdGFuY2VzOiBNYXA8c3RyaW5nLCBOZ3hUaXBweUluc3RhbmNlPjtcbiAgfSkge1xuICAgIGNvbnN0IHsgdGlwcHlOYW1lIH0gPSB0aXBweUluc3RhbmNlO1xuICAgIHRoaXMuY2xlYXJWaWV3UmVmKHRpcHB5SW5zdGFuY2UpO1xuICAgIHRoaXMuZGVzdHJveVRpcHB5SW5zdGFuY2UodGlwcHlJbnN0YW5jZSk7XG4gICAgdGhpcy5kZWxldGVFbnRyeUluU3RvcmFnZSh0aXBweUluc3RhbmNlcywgdGlwcHlOYW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJWaWV3UmVmKHRpcHB5SW5zdGFuY2U6IE5neFRpcHB5SW5zdGFuY2UpIHtcbiAgICB0aXBweUluc3RhbmNlLnZpZXdSZWY/LmRlc3Ryb3kgJiYgdGlwcHlJbnN0YW5jZS52aWV3UmVmLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveVRpcHB5SW5zdGFuY2UodGlwcHlJbnN0YW5jZTogTmd4VGlwcHlJbnN0YW5jZSkge1xuICAgIHRpcHB5SW5zdGFuY2UuZGVzdHJveSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWxldGVFbnRyeUluU3RvcmFnZSh0aXBweUluc3RhbmNlczogTWFwPHN0cmluZywgTmd4VGlwcHlJbnN0YW5jZT4sIHRpcHB5TmFtZTogc3RyaW5nKSB7XG4gICAgdGlwcHlJbnN0YW5jZXMuZGVsZXRlKHRpcHB5TmFtZSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0TG9jYWxJbnN0YW5jZSgpIHtcbiAgICB0aGlzLnRpcHB5SW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyQ2FjaGVkSW5zdGFuY2VzKCkge1xuICAgIHRoaXMuY2FjaGVkSW5zdGFuY2VzLmNsZWFyKCk7XG4gIH1cbn1cbiJdfQ==