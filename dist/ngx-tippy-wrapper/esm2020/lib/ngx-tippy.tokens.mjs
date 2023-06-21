import { InjectionToken } from '@angular/core';
import { messagesDict, tippyFakeInstance } from './consts';
export const NGX_TIPPY_MESSAGES = new InjectionToken('NGX_TIPPY_MESSAGES', {
    providedIn: 'root',
    factory: () => messagesDict,
});
export const TIPPY_FAKE_INSTANCE = new InjectionToken('TIPPY_FAKE_INSTANCE', {
    providedIn: 'root',
    factory: () => tippyFakeInstance,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpcHB5LnRva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC10aXBweS13cmFwcGVyL3NyYy9saWIvbmd4LXRpcHB5LnRva2Vucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFM0QsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxjQUFjLENBQTRCLG9CQUFvQixFQUFFO0lBQ3BHLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxZQUFZO0NBQzVCLENBQUMsQ0FBQztBQUNILE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLElBQUksY0FBYyxDQUFTLHFCQUFxQixFQUFFO0lBQ25GLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxpQkFBaUI7Q0FDakMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1lc3NhZ2VzRGljdCwgdGlwcHlGYWtlSW5zdGFuY2UgfSBmcm9tICcuL2NvbnN0cyc7XG5cbmV4cG9ydCBjb25zdCBOR1hfVElQUFlfTUVTU0FHRVMgPSBuZXcgSW5qZWN0aW9uVG9rZW48eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfT4oJ05HWF9USVBQWV9NRVNTQUdFUycsIHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICBmYWN0b3J5OiAoKSA9PiBtZXNzYWdlc0RpY3QsXG59KTtcbmV4cG9ydCBjb25zdCBUSVBQWV9GQUtFX0lOU1RBTkNFID0gbmV3IEluamVjdGlvblRva2VuPG9iamVjdD4oJ1RJUFBZX0ZBS0VfSU5TVEFOQ0UnLCB7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgZmFjdG9yeTogKCkgPT4gdGlwcHlGYWtlSW5zdGFuY2UsXG59KTtcbiJdfQ==