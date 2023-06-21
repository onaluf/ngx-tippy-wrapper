import { isPlatformServer, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { InjectionToken, PLATFORM_ID, ElementRef, Component, Inject, Input, ViewChild, isDevMode, Injectable, TemplateRef, Directive, NgModule } from '@angular/core';
import tippy, { hideAll, createSingleton } from 'tippy.js';
import { Subject } from 'rxjs';

const messagesDict = {
    instanceAlreadyExist: `Instance with name #tippyName already exist, please pick unique [tippyName]`,
    instanceNotExist: `Instance with name #tippyName does not exist`,
    childrenInstancesNotFoundGrouped: `No children tippy instances found within 'ngx-tippy-group' component`,
    childrenInstancesNotFoundSingleton: `No children tippy instances found within 'ngx-tippy-singleton' component`,
    singletonInstanceAlreadyExist: `Singleton instance with name #singletonName already exist, please pick unique [singletonName]`,
};

const tippyFakeInstance = {
    clearDelayTimeouts: () => { },
    destroy: () => { },
    disable: () => { },
    enable: () => { },
    hide: () => { },
    hideWithInteractivity: () => { },
    id: 0,
    plugins: [
        {
            name: 'followCursor',
            defaultValue: false,
        },
    ],
    popper: {
        state: {},
    },
    popperInstance: {},
    props: {},
    reference: {},
    setContent: () => { },
    setProps: () => { },
    show: () => { },
    state: {
        isEnabled: true,
        isVisible: true,
        isDestroyed: false,
        isMounted: true,
        isShown: false,
    },
    unmount: () => { },
};

const NGX_TIPPY_MESSAGES = new InjectionToken('NGX_TIPPY_MESSAGES', {
    providedIn: 'root',
    factory: () => messagesDict,
});
const TIPPY_FAKE_INSTANCE = new InjectionToken('TIPPY_FAKE_INSTANCE', {
    providedIn: 'root',
    factory: () => tippyFakeInstance,
});

/**
 * Different tooltip content to many different elements, but only one tippy instance
 */
class NgxTippyGroupComponent {
    constructor(platform, messagesDict) {
        this.platform = platform;
        this.messagesDict = messagesDict;
    }
    ngAfterViewInit() {
        if (isPlatformServer(this.platform))
            return;
        this.setTooltips();
    }
    setTooltips() {
        const contentWrapperNativeEl = this.contentWrapper.nativeElement;
        const tooltips = Array.from(contentWrapperNativeEl.querySelectorAll('[data-tippy-grouped]'));
        if (tooltips.length) {
            this.initTippy(tooltips);
        }
        else {
            throw new Error(this.messagesDict.childrenInstancesNotFoundGrouped);
        }
    }
    initTippy(tooltips) {
        tippy(tooltips, this.groupedProps);
    }
}
NgxTippyGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxTippyGroupComponent, deps: [{ token: PLATFORM_ID }, { token: NGX_TIPPY_MESSAGES }], target: i0.ɵɵFactoryTarget.Component });
NgxTippyGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: NgxTippyGroupComponent, selector: "ngx-tippy-group", inputs: { groupedProps: "groupedProps" }, viewQueries: [{ propertyName: "contentWrapper", first: true, predicate: ["contentWrapper"], descendants: true, read: ElementRef }], ngImport: i0, template: `
    <div #contentWrapper>
      <ng-content></ng-content>
    </div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxTippyGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-tippy-group',
                    template: `
    <div #contentWrapper>
      <ng-content></ng-content>
    </div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NGX_TIPPY_MESSAGES]
                }] }]; }, propDecorators: { groupedProps: [{
                type: Input
            }], contentWrapper: [{
                type: ViewChild,
                args: ['contentWrapper', { read: ElementRef, static: false }]
            }] } });

class DevModeService {
    isDevMode() {
        return isDevMode();
    }
}
DevModeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: DevModeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DevModeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: DevModeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: DevModeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

var InstanceChangeReasonEnum;
(function (InstanceChangeReasonEnum) {
    InstanceChangeReasonEnum["SetInstance"] = "setInstance";
    InstanceChangeReasonEnum["Show"] = "show";
    InstanceChangeReasonEnum["Hide"] = "hide";
    InstanceChangeReasonEnum["HideWithInteractivity"] = "hideWithInteractivity";
    InstanceChangeReasonEnum["Disable"] = "disable";
    InstanceChangeReasonEnum["Enable"] = "enable";
    InstanceChangeReasonEnum["SetProps"] = "setProps";
    InstanceChangeReasonEnum["SetContent"] = "setContent";
    InstanceChangeReasonEnum["Unmount"] = "unmount";
    InstanceChangeReasonEnum["ClearDelayTimeouts"] = "clearDelayTimeouts";
    InstanceChangeReasonEnum["Destroy"] = "destroy";
})(InstanceChangeReasonEnum || (InstanceChangeReasonEnum = {}));
var NgxTippyNamesEnum;
(function (NgxTippyNamesEnum) {
    NgxTippyNamesEnum["TippyName"] = "tippyName";
    NgxTippyNamesEnum["SingletonName"] = "singletonName";
})(NgxTippyNamesEnum || (NgxTippyNamesEnum = {}));

class CompRef {
    constructor(args) {
        this.args = args;
        this.compRef = this.args.viewContainerRef.createComponent(this.args.component);
    }
    detectChanges() {
        this.compRef?.changeDetectorRef.detectChanges();
        return this;
    }
    getElement() {
        return this.compRef?.location.nativeElement;
    }
    destroy() {
        this.compRef?.destroy();
        this.compRef = null;
    }
}

const isComponent = (value) => typeof value === 'function';

const isHTMLTemplate = (value) => value instanceof HTMLTemplateElement;

const isTemplateRef = (value) => value instanceof TemplateRef;

/**
 * Set display: "block" for content wrapper element
 *
 * @param tippyContent  { NgxTippyContent }
 * @param renderer { Renderer2 }
 */
const setTemplateVisible = (tippyContent, renderer) => {
    tippyContent && tippyContent instanceof Element && renderer.setStyle(tippyContent, 'display', 'block');
};

class TplRef {
    constructor(args) {
        this.args = args;
        this.viewRef = this.args.tpl.createEmbeddedView(this.args.context || {});
        this.viewRef.detectChanges();
        this.args.appRef.attachView(this.viewRef);
    }
    detectChanges() {
        this.viewRef?.detectChanges();
        return this;
    }
    getElement() {
        if (!this.viewRef)
            return null;
        const rootNodes = this.viewRef.rootNodes;
        if (rootNodes.length === 1 && rootNodes[0].nodeType === Node.ELEMENT_NODE) {
            this.element = rootNodes[0];
        }
        else {
            this.element = document.createElement('div');
            this.element.append(...rootNodes);
        }
        return this.element;
    }
    destroy() {
        if (!this.viewRef)
            return;
        if (this.viewRef.rootNodes[0] !== 1) {
            this.element?.parentNode?.removeChild(this.element);
            this.element = null;
        }
        this.viewRef.destroy();
        this.viewRef = null;
    }
}

class NgxViewService {
    constructor(appRef) {
        this.appRef = appRef;
    }
    getViewRefInstance(content, tippyName, tippyContext) {
        let viewRef;
        if (isTemplateRef(content)) {
            viewRef = this.createTemplate(content, {
                ...tippyContext,
                $implicit: tippyName,
            });
        }
        else if (isComponent(content)) {
            viewRef = this.createComponent(content);
        }
        else if (isHTMLTemplate(content)) {
            viewRef = {
                getElement: () => content.content,
            };
        }
        else {
            viewRef = {
                getElement: () => content,
            };
        }
        return viewRef;
    }
    createTemplate(tpl, context) {
        return new TplRef({
            tpl,
            context,
            appRef: this.appRef,
        });
    }
    createComponent(component) {
        return new CompRef({
            component,
            viewContainerRef: this.viewContainerRef,
        });
    }
}
NgxViewService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxViewService, deps: [{ token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Injectable });
NgxViewService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxViewService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxViewService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.ApplicationRef }]; } });

class NgxTippyService {
    constructor(rendererFactory, devModeService, ngxViewService, messagesDict) {
        this.devModeService = devModeService;
        this.ngxViewService = ngxViewService;
        this.messagesDict = messagesDict;
        this.tippyInstances = new Map();
        this.tippySingletonEntryInstances = new Map();
        this.tippyInstances$ = new Subject();
        this.createRenderer(rendererFactory);
    }
    /**
     * Working with storage
     */
    /**
     * Write tippy instances to storage
     *
     * @param name { string } name of tippy instance
     * @param state { NgxTippyInstance } tippy instance
     */
    setInstance(name, state) {
        const instance = this.tippyInstances.get(name);
        if (instance) {
            const errMessage = this.getMessage({
                reason: 'instanceAlreadyExist',
                messageFor: NgxTippyNamesEnum.TippyName,
                name,
            });
            this.throwError(errMessage);
        }
        else {
            this.tippyInstances.set(name, state);
            this.emitInstancesChange({
                name,
                reason: InstanceChangeReasonEnum.SetInstance,
                instance: state,
            });
        }
    }
    /**
     * Get specific tippy instance
     *
     * @param name { string } name of tippy instance
     * @returns { NgxTippyInstance | null } specific tippy instance or null
     */
    getInstance(name) {
        return this.tippyInstances.has(name) ? this.tippyInstances.get(name) : null;
    }
    /**
     * Get all tippy instances from storage
     *
     * @returns { Map<string, NgxTippyInstance> | null } all tippy instances or null
     */
    getInstances() {
        return this.tippyInstances.size ? this.tippyInstances : null;
    }
    /**
     * Write singleton instances to storage
     *
     * @param name { string } name of tippy instance
     * @param state { NgxTippyInstance } tippy instance
     */
    setSingletonInstance(name, state) {
        if (this.tippySingletonEntryInstances.has(name)) {
            const errMessage = this.getMessage({
                reason: 'singletonInstanceAlreadyExist',
                messageFor: NgxTippyNamesEnum.SingletonName,
                name,
            });
            this.throwError(errMessage);
        }
        else {
            this.tippySingletonEntryInstances.set(name, state);
        }
    }
    /**
     * Get specific singleton tippy instance
     *
     * @param name { string } name of singleton tippy instance
     * @returns { NgxTippySingletonInstance | null } specific singleton tippy instance or null
     */
    getSingletonInstance(name) {
        return this.tippySingletonEntryInstances.has(name) ? this.tippySingletonEntryInstances.get(name) : null;
    }
    /**
     * Get all singleton tippy instances
     *
     * @returns { Map<string, NgxTippyInstance> | null } all singleton tippy instances or null
     */
    getSingletonInstances() {
        return this.tippySingletonEntryInstances.size ? this.tippySingletonEntryInstances : null;
    }
    /**
     * Working with tippy instance methods
     */
    /**
     * Programmatically show the tippy
     *
     * @param name { string } name of tippy instance
     */
    show(name) {
        this.callNativeTippyMethod(name, InstanceChangeReasonEnum.Show);
    }
    /**
     * Programmatically hide the tippy
     *
     * @param name { string } name of tippy instance
     */
    hide(name) {
        this.callNativeTippyMethod(name, InstanceChangeReasonEnum.Hide);
    }
    /**
     * Will hide the tippy only if the cursor is outside of the tippy's interactive region
     * This allows you to programmatically hook into interactive behavior upon a mouseleave event if implementing custom event listeners
     *
     * @param name { string } name of tippy instance
     * @param name { mouseEvent } pass the mouse event object in from your event listener
     */
    hideWithInteractivity(name, mouseEvent) {
        this.callNativeTippyMethod(name, InstanceChangeReasonEnum.HideWithInteractivity, mouseEvent);
    }
    /**
     * Prevent a tippy from showing or hiding
     *
     * @param name { string } name of tippy instance
     */
    disable(name) {
        this.callNativeTippyMethod(name, InstanceChangeReasonEnum.Disable);
    }
    /**
     * Re-enable a tippy
     *
     * @param name { string } name of tippy instance
     */
    enable(name) {
        this.callNativeTippyMethod(name, InstanceChangeReasonEnum.Enable);
    }
    /**
     * Update any tippy props
     *
     * @param name { string } name of tippy instance
     * @param tippyProps { NgxTippyProps } new props
     */
    setProps(name, tippyProps) {
        this.callNativeTippyMethod(name, InstanceChangeReasonEnum.SetProps, tippyProps);
    }
    /**
     * Update the content for tippy
     *
     * @param name { string } name of tippy instance
     * @param tippyContent { NgxTippyContent } new content
     */
    setContent(name, tippyContent) {
        const instance = this.getInstance(name);
        if (!instance) {
            this.throwErrorInstanceNotExist(name);
            return;
        }
        if (tippyContent) {
            const viewRef = this.ngxViewService.getViewRefInstance(tippyContent, instance.tippyName);
            const content = viewRef.getElement();
            if (content) {
                setTemplateVisible(content, this.renderer);
                instance.setContent(content);
                instance.viewRef = viewRef;
                this.emitInstancesChange({
                    name,
                    reason: 'setContent',
                    instance,
                });
            }
            else {
                this.throwError('message');
            }
        }
    }
    /**
     * Unmount the tippy from the DOM
     *
     * @param name { string } name of tippy instance
     */
    unmount(name) {
        this.callNativeTippyMethod(name, InstanceChangeReasonEnum.Unmount);
    }
    /**
     * Clears the instances delay timeouts
     *
     * @param name { string } name of tippy instance
     */
    clearDelayTimeouts(name) {
        this.callNativeTippyMethod(name, InstanceChangeReasonEnum.ClearDelayTimeouts);
    }
    /**
     * Permanently destroy and clean up the tippy instance
     *
     * @param name { string } name of tippy instance
     */
    destroy(name) {
        this.callNativeTippyMethod(name, InstanceChangeReasonEnum.Destroy);
        this.tippyInstances.delete(name);
    }
    /** Working with tippy static methods */
    /**
     * Set the default props for each new tippy instance
     *
     * @param tippyProps { NgxTippyDefaultProps } default props
     */
    setDefaultProps(tippyProps) {
        tippy.setDefaultProps(tippyProps);
    }
    /**
     * Show all tippies
     */
    showAll() {
        this.tippyInstances.forEach((instance, name) => {
            instance.show();
            this.emitInstancesChange({
                name,
                reason: 'show',
                instance,
            });
        });
    }
    /**
     * Hide all tippies or hide all except a particular one
     * Additional hide them with duration
     *
     * @param { NgxTippyHideAllOptions } [options] - additional hiding options
     */
    hideAll(options) {
        const exclude = this.getInstance(options?.excludeName || '');
        const duration = options?.duration;
        hideAll({ duration, ...exclude });
    }
    /**
     * Subscription to change of tippy instances
     *
     * @returns { Observable<InstancesChanges> } observable of tippy instances change
     */
    get instancesChanges() {
        return this.tippyInstances$.asObservable();
    }
    /**
     * Service methods
     */
    callNativeTippyMethod(name, method, arg) {
        const instance = this.getInstance(name);
        if (instance) {
            instance[method](arg);
            this.emitInstancesChange({
                name,
                reason: method,
                instance,
            });
        }
        else {
            this.throwErrorInstanceNotExist(name);
        }
    }
    emitInstancesChange({ name, reason, instance, }) {
        this.tippyInstances$.next({ name, reason, instance });
    }
    createRenderer(rendererFactory) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    throwErrorInstanceNotExist(name) {
        const errMessage = this.getMessage({
            reason: 'instanceNotExist',
            messageFor: NgxTippyNamesEnum.TippyName,
            name,
        });
        this.throwError(errMessage);
    }
    throwError(message, errorConstructor = Error) {
        if (this.devModeService.isDevMode())
            throw new errorConstructor(message);
    }
    getMessage({ reason, messageFor, name, }) {
        return this.messagesDict[reason].replace(`#${messageFor}`, `'${name}'`);
    }
}
NgxTippyService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxTippyService, deps: [{ token: i0.RendererFactory2 }, { token: DevModeService }, { token: NgxViewService }, { token: NGX_TIPPY_MESSAGES }], target: i0.ɵɵFactoryTarget.Injectable });
NgxTippyService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxTippyService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxTippyService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i0.RendererFactory2 }, { type: DevModeService }, { type: NgxViewService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NGX_TIPPY_MESSAGES]
                }] }]; } });

/**
 * Tippy singleton - single tippy element that takes the place of an array of regular tippy instances
 */
class NgxTippySingletonComponent {
    constructor(platform, ngxTippyService, messagesDict) {
        this.platform = platform;
        this.ngxTippyService = ngxTippyService;
        this.messagesDict = messagesDict;
    }
    ngAfterViewInit() {
        if (isPlatformServer(this.platform))
            return;
        this.setSingleton();
    }
    ngOnDestroy() {
        this.clearSingletonInstance();
    }
    /**
     * Take projected in component tooltips element
     * Take initiated tippy instances
     * Initiate `singleton addon` only for projected tooltips for current component instance
     */
    setSingleton() {
        const contentWrapperNativeEl = this.contentWrapper.nativeElement;
        const singletonTooltipIDs = Array.from(contentWrapperNativeEl.querySelectorAll('[data-tippy-singleton]')).map((el) => el._tippy.id);
        const tippyInstances = this.ngxTippyService.getInstances();
        const tippyInstancesSerialized = tippyInstances && [...tippyInstances.values()];
        this.currentSingletonChildrenTippyInstances =
            tippyInstancesSerialized &&
                tippyInstancesSerialized.filter(tippyInstance => singletonTooltipIDs.includes(tippyInstance.id));
        if (this.currentSingletonChildrenTippyInstances?.length) {
            this.initTippySingletonEntry(this.currentSingletonChildrenTippyInstances);
        }
        else {
            throw new Error(this.messagesDict.childrenInstancesNotFoundSingleton);
        }
    }
    initTippySingletonEntry(childrenSingletonInstances) {
        this.singletonInstance = createSingleton(childrenSingletonInstances, this.singletonProps);
        this.writeSingletonInstanceToStorage(this.singletonInstance);
    }
    /**
     * To manipulate singleton groups, write all instances to storage
     * `singletonName` used as unique key
     * If `singletonName` does not provided - it will be generated using id of singletonInstance
     *
     * @param tippyInstance { NgxTippySingletonInstance }
     */
    writeSingletonInstanceToStorage(singletonInstance) {
        const extendedSingletonInstance = this.extendShowFn(singletonInstance);
        this.ngxTippyService.setSingletonInstance(this.singletonName || `singleton-${singletonInstance.id}`, extendedSingletonInstance);
    }
    /**
     * Extend original `show` method
     * Purpose: manipulate tooltip state by [tippyName]
     *
     * @param singletonInstance { NgxTippySingletonInstance }
     * @returns { NgxTippySingletonInstance }
     */
    extendShowFn(singletonInstance) {
        const originalShowFn = singletonInstance.show;
        singletonInstance.show = (singletonInstanceIdentifier) => {
            if (typeof singletonInstanceIdentifier === 'string') {
                const instance = this.ngxTippyService.getInstance(singletonInstanceIdentifier);
                instance && originalShowFn(instance);
            }
            else {
                originalShowFn(singletonInstanceIdentifier);
            }
        };
        return singletonInstance;
    }
    clearSingletonInstance() {
        const singletonInstances = this.ngxTippyService.getSingletonInstances();
        if (singletonInstances && this.singletonInstance) {
            this.destroySingletonInstance();
            this.deleteEntryInStorage(singletonInstances);
        }
    }
    destroySingletonInstance() {
        this.singletonInstance.destroy();
    }
    deleteEntryInStorage(singletonInstances) {
        singletonInstances.delete(this.singletonName || `singleton-${this.singletonInstance.id}`);
    }
}
NgxTippySingletonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxTippySingletonComponent, deps: [{ token: PLATFORM_ID }, { token: NgxTippyService }, { token: NGX_TIPPY_MESSAGES }], target: i0.ɵɵFactoryTarget.Component });
NgxTippySingletonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: NgxTippySingletonComponent, selector: "ngx-tippy-singleton", inputs: { singletonProps: "singletonProps", singletonName: "singletonName" }, viewQueries: [{ propertyName: "contentWrapper", first: true, predicate: ["contentWrapper"], descendants: true, read: ElementRef }], ngImport: i0, template: `
    <div #contentWrapper>
      <ng-content></ng-content>
    </div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxTippySingletonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-tippy-singleton',
                    template: `
    <div #contentWrapper>
      <ng-content></ng-content>
    </div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: NgxTippyService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NGX_TIPPY_MESSAGES]
                }] }]; }, propDecorators: { singletonProps: [{
                type: Input
            }], singletonName: [{
                type: Input
            }], contentWrapper: [{
                type: ViewChild,
                args: ['contentWrapper', { read: ElementRef, static: false }]
            }] } });

class NgxTippyDirective {
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
NgxTippyDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxTippyDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NgxTippyService }, { token: NgxViewService }, { token: i0.ViewContainerRef }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Directive });
NgxTippyDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.12", type: NgxTippyDirective, selector: "[ngxTippy]", inputs: { ngxTippy: "ngxTippy", tippyProps: "tippyProps", tippyName: "tippyName", tippyClassName: "tippyClassName", tippyContext: "tippyContext" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxTippyDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngxTippy]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: NgxTippyService }, { type: NgxViewService }, { type: i0.ViewContainerRef }, { type: Object, decorators: [{
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

class NgxTippyModule {
}
NgxTippyModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxTippyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxTippyModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: NgxTippyModule, declarations: [NgxTippyDirective, NgxTippyGroupComponent, NgxTippySingletonComponent], imports: [CommonModule], exports: [NgxTippyDirective, NgxTippyGroupComponent, NgxTippySingletonComponent] });
NgxTippyModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxTippyModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: NgxTippyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NgxTippyDirective, NgxTippyGroupComponent, NgxTippySingletonComponent],
                    exports: [NgxTippyDirective, NgxTippyGroupComponent, NgxTippySingletonComponent],
                }]
        }] });

/*
 * Public API Surface of ngx-tippy-wrapper
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxTippyDirective, NgxTippyGroupComponent, NgxTippyModule, NgxTippyService, NgxTippySingletonComponent };
//# sourceMappingURL=ngx-tippy-wrapper.mjs.map
