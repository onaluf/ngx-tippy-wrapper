import { Injectable } from '@angular/core';
import { CompRef, isComponent, isHTMLTemplate, isTemplateRef, TplRef } from '../utils';
import * as i0 from "@angular/core";
export class NgxViewService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC10aXBweS13cmFwcGVyL3NyYy9saWIvc2VydmljZXMvbmd4LXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWtCLFVBQVUsRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFFaEcsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBR3ZGLE1BQU0sT0FBTyxjQUFjO0lBR3pCLFlBQW9CLE1BQXNCO1FBQXRCLFdBQU0sR0FBTixNQUFNLENBQWdCO0lBQUcsQ0FBQztJQUU5QyxrQkFBa0IsQ0FBQyxPQUF5QixFQUFFLFNBQWtCLEVBQUUsWUFBa0I7UUFDbEYsSUFBSSxPQUFpQixDQUFDO1FBRXRCLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzFCLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRTtnQkFDckMsR0FBRyxZQUFZO2dCQUNmLFNBQVMsRUFBRSxTQUFTO2FBQ3JCLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekM7YUFBTSxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsQyxPQUFPLEdBQUc7Z0JBQ1IsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPO2FBQ2xDLENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTyxHQUFHO2dCQUNSLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPO2FBQzFCLENBQUM7U0FDSDtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFTyxjQUFjLENBQUksR0FBcUIsRUFBRSxPQUFVO1FBQ3pELE9BQU8sSUFBSSxNQUFNLENBQUk7WUFDbkIsR0FBRztZQUNILE9BQU87WUFDUCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGVBQWUsQ0FBSSxTQUFrQjtRQUMzQyxPQUFPLElBQUksT0FBTyxDQUFJO1lBQ3BCLFNBQVM7WUFDVCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1NBQ3hDLENBQUMsQ0FBQztJQUNMLENBQUM7OzRHQXpDVSxjQUFjO2dIQUFkLGNBQWMsY0FERCxNQUFNOzRGQUNuQixjQUFjO2tCQUQxQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBJbmplY3RhYmxlLCBUZW1wbGF0ZVJlZiwgVHlwZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4VGlwcHlUZW1wbGF0ZSwgVmlld1JlZiB9IGZyb20gJy4uL25neC10aXBweS5pbnRlcmZhY2VzJztcbmltcG9ydCB7IENvbXBSZWYsIGlzQ29tcG9uZW50LCBpc0hUTUxUZW1wbGF0ZSwgaXNUZW1wbGF0ZVJlZiwgVHBsUmVmIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE5neFZpZXdTZXJ2aWNlIHtcbiAgcHVibGljIHZpZXdDb250YWluZXJSZWYhOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZikge31cblxuICBnZXRWaWV3UmVmSW5zdGFuY2UoY29udGVudDogTmd4VGlwcHlUZW1wbGF0ZSwgdGlwcHlOYW1lPzogc3RyaW5nLCB0aXBweUNvbnRleHQ/OiBhbnkpOiBWaWV3UmVmIHtcbiAgICBsZXQgdmlld1JlZiE6IFZpZXdSZWY7XG5cbiAgICBpZiAoaXNUZW1wbGF0ZVJlZihjb250ZW50KSkge1xuICAgICAgdmlld1JlZiA9IHRoaXMuY3JlYXRlVGVtcGxhdGUoY29udGVudCwge1xuICAgICAgICAuLi50aXBweUNvbnRleHQsXG4gICAgICAgICRpbXBsaWNpdDogdGlwcHlOYW1lLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpc0NvbXBvbmVudChjb250ZW50KSkge1xuICAgICAgdmlld1JlZiA9IHRoaXMuY3JlYXRlQ29tcG9uZW50KGNvbnRlbnQpO1xuICAgIH0gZWxzZSBpZiAoaXNIVE1MVGVtcGxhdGUoY29udGVudCkpIHtcbiAgICAgIHZpZXdSZWYgPSB7XG4gICAgICAgIGdldEVsZW1lbnQ6ICgpID0+IGNvbnRlbnQuY29udGVudCxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZXdSZWYgPSB7XG4gICAgICAgIGdldEVsZW1lbnQ6ICgpID0+IGNvbnRlbnQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB2aWV3UmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVUZW1wbGF0ZTxDPih0cGw6IFRlbXBsYXRlUmVmPGFueT4sIGNvbnRleHQ6IEMpIHtcbiAgICByZXR1cm4gbmV3IFRwbFJlZjxDPih7XG4gICAgICB0cGwsXG4gICAgICBjb250ZXh0LFxuICAgICAgYXBwUmVmOiB0aGlzLmFwcFJlZixcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29tcG9uZW50PEM+KGNvbXBvbmVudDogVHlwZTxDPikge1xuICAgIHJldHVybiBuZXcgQ29tcFJlZjxDPih7XG4gICAgICBjb21wb25lbnQsXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZpZXdDb250YWluZXJSZWYsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==