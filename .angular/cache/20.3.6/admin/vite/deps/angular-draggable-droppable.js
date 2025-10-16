import {
  bundle_es_default
} from "./chunk-EC2EVBEZ.js";
import {
  DOCUMENT,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  ViewContainerRef,
  inject,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-HEIFUZFQ.js";
import {
  fromEvent,
  merge
} from "./chunk-IOUOWZVM.js";
import "./chunk-F6UGHFBF.js";
import {
  Observable,
  ReplaySubject,
  Subject,
  combineLatest,
  count,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  pairwise,
  share,
  startWith,
  take,
  takeLast,
  takeUntil
} from "./chunk-DRZFONXE.js";
import "./chunk-LEABZSFV.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-OUOAADPF.js";

// node_modules/.pnpm/angular-draggable-droppable_0647479d40e959eb5d523b7ddf0f255d/node_modules/angular-draggable-droppable/fesm2022/angular-draggable-droppable.mjs
var _DraggableHelper = class _DraggableHelper {
  constructor() {
    this.currentDrag = new Subject();
  }
};
_DraggableHelper.ɵfac = function DraggableHelper_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DraggableHelper)();
};
_DraggableHelper.ɵprov = ɵɵdefineInjectable({
  token: _DraggableHelper,
  factory: _DraggableHelper.ɵfac,
  providedIn: "root"
});
var DraggableHelper = _DraggableHelper;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DraggableHelper, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _DraggableScrollContainerDirective = class _DraggableScrollContainerDirective {
  constructor() {
    this.elementRef = inject(ElementRef);
  }
};
_DraggableScrollContainerDirective.ɵfac = function DraggableScrollContainerDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DraggableScrollContainerDirective)();
};
_DraggableScrollContainerDirective.ɵdir = ɵɵdefineDirective({
  type: _DraggableScrollContainerDirective,
  selectors: [["", "mwlDraggableScrollContainer", ""]]
});
var DraggableScrollContainerDirective = _DraggableScrollContainerDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DraggableScrollContainerDirective, [{
    type: Directive,
    args: [{
      selector: "[mwlDraggableScrollContainer]"
    }]
  }], null, null);
})();
function addClass(renderer, element, classToAdd) {
  if (classToAdd) {
    classToAdd.split(" ").forEach((className) => renderer.addClass(element.nativeElement, className));
  }
}
function removeClass(renderer, element, classToRemove) {
  if (classToRemove) {
    classToRemove.split(" ").forEach((className) => renderer.removeClass(element.nativeElement, className));
  }
}
var _DraggableDirective = class _DraggableDirective {
  constructor() {
    this.dragAxis = {
      x: true,
      y: true
    };
    this.dragSnapGrid = {};
    this.ghostDragEnabled = true;
    this.showOriginalElementWhileDragging = false;
    this.dragCursor = "";
    this.autoScroll = {
      margin: 20
    };
    this.dragPointerDown = new EventEmitter();
    this.dragStart = new EventEmitter();
    this.ghostElementCreated = new EventEmitter();
    this.dragging = new EventEmitter();
    this.dragEnd = new EventEmitter();
    this.pointerDown$ = new Subject();
    this.pointerMove$ = new Subject();
    this.pointerUp$ = new Subject();
    this.eventListenerSubscriptions = {};
    this.destroy$ = new Subject();
    this.timeLongPress = {
      timerBegin: 0,
      timerEnd: 0
    };
    this.element = inject(ElementRef);
    this.renderer = inject(Renderer2);
    this.draggableHelper = inject(DraggableHelper);
    this.zone = inject(NgZone);
    this.vcr = inject(ViewContainerRef);
    this.scrollContainer = inject(DraggableScrollContainerDirective, {
      optional: true
    });
    this.document = inject(DOCUMENT);
  }
  ngOnInit() {
    this.checkEventListeners();
    const pointerDragged$ = this.pointerDown$.pipe(filter(() => this.canDrag()), mergeMap((pointerDownEvent) => {
      if (pointerDownEvent.event.stopPropagation && !this.scrollContainer) {
        pointerDownEvent.event.stopPropagation();
      }
      const globalDragStyle = this.renderer.createElement("style");
      this.renderer.setAttribute(globalDragStyle, "type", "text/css");
      this.renderer.appendChild(globalDragStyle, this.renderer.createText(`
          body * {
           -moz-user-select: none;
           -ms-user-select: none;
           -webkit-user-select: none;
           user-select: none;
          }
        `));
      requestAnimationFrame(() => {
        this.document.head.appendChild(globalDragStyle);
      });
      const startScrollPosition = this.getScrollPosition();
      const scrollContainerScroll$ = new Observable((observer) => {
        const scrollContainer = this.scrollContainer ? this.scrollContainer.elementRef.nativeElement : "window";
        return this.renderer.listen(scrollContainer, "scroll", (e) => observer.next(e));
      }).pipe(startWith(startScrollPosition), map(() => this.getScrollPosition()));
      const currentDrag$ = new Subject();
      const cancelDrag$ = new ReplaySubject();
      if (this.dragPointerDown.observers.length > 0) {
        this.zone.run(() => {
          this.dragPointerDown.next({
            x: 0,
            y: 0
          });
        });
      }
      const dragComplete$ = merge(this.pointerUp$, this.pointerDown$, cancelDrag$, this.destroy$).pipe(share());
      const pointerMove = combineLatest([this.pointerMove$, scrollContainerScroll$]).pipe(map(([pointerMoveEvent, scroll]) => {
        return {
          currentDrag$,
          transformX: pointerMoveEvent.clientX - pointerDownEvent.clientX,
          transformY: pointerMoveEvent.clientY - pointerDownEvent.clientY,
          clientX: pointerMoveEvent.clientX,
          clientY: pointerMoveEvent.clientY,
          scrollLeft: scroll.left,
          scrollTop: scroll.top,
          target: pointerMoveEvent.event.target
        };
      }), map((moveData) => {
        if (this.dragSnapGrid.x) {
          moveData.transformX = Math.round(moveData.transformX / this.dragSnapGrid.x) * this.dragSnapGrid.x;
        }
        if (this.dragSnapGrid.y) {
          moveData.transformY = Math.round(moveData.transformY / this.dragSnapGrid.y) * this.dragSnapGrid.y;
        }
        return moveData;
      }), map((moveData) => {
        if (!this.dragAxis.x) {
          moveData.transformX = 0;
        }
        if (!this.dragAxis.y) {
          moveData.transformY = 0;
        }
        return moveData;
      }), map((moveData) => {
        const scrollX = moveData.scrollLeft - startScrollPosition.left;
        const scrollY = moveData.scrollTop - startScrollPosition.top;
        return __spreadProps(__spreadValues({}, moveData), {
          x: moveData.transformX + scrollX,
          y: moveData.transformY + scrollY
        });
      }), filter(({
        x,
        y,
        transformX,
        transformY
      }) => !this.validateDrag || this.validateDrag({
        x,
        y,
        transform: {
          x: transformX,
          y: transformY
        }
      })), takeUntil(dragComplete$), share());
      const dragStarted$ = pointerMove.pipe(take(1), share());
      const dragEnded$ = pointerMove.pipe(takeLast(1), share());
      dragStarted$.subscribe(({
        clientX,
        clientY,
        x,
        y
      }) => {
        if (this.dragStart.observers.length > 0) {
          this.zone.run(() => {
            this.dragStart.next({
              cancelDrag$
            });
          });
        }
        this.scroller = bundle_es_default([this.scrollContainer ? this.scrollContainer.elementRef.nativeElement : this.document.defaultView], __spreadProps(__spreadValues({}, this.autoScroll), {
          autoScroll() {
            return true;
          }
        }));
        addClass(this.renderer, this.element, this.dragActiveClass);
        if (this.ghostDragEnabled) {
          const rect = this.element.nativeElement.getBoundingClientRect();
          const clone = this.element.nativeElement.cloneNode(true);
          if (!this.showOriginalElementWhileDragging) {
            this.renderer.setStyle(this.element.nativeElement, "visibility", "hidden");
          }
          if (this.ghostElementAppendTo) {
            this.ghostElementAppendTo.appendChild(clone);
          } else {
            this.element.nativeElement.parentNode.insertBefore(clone, this.element.nativeElement.nextSibling);
          }
          this.ghostElement = clone;
          this.document.body.style.cursor = this.dragCursor;
          this.setElementStyles(clone, {
            position: "fixed",
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            cursor: this.dragCursor,
            margin: "0",
            willChange: "transform",
            pointerEvents: "none"
          });
          if (this.ghostElementTemplate) {
            const viewRef = this.vcr.createEmbeddedView(this.ghostElementTemplate);
            clone.innerHTML = "";
            viewRef.rootNodes.filter((node) => node instanceof Node).forEach((node) => {
              clone.appendChild(node);
            });
            dragEnded$.subscribe(() => {
              this.vcr.remove(this.vcr.indexOf(viewRef));
            });
          }
          if (this.ghostElementCreated.observers.length > 0) {
            this.zone.run(() => {
              this.ghostElementCreated.emit({
                clientX: clientX - x,
                clientY: clientY - y,
                element: clone
              });
            });
          }
          dragEnded$.subscribe(() => {
            clone.parentElement.removeChild(clone);
            this.ghostElement = null;
            this.renderer.setStyle(this.element.nativeElement, "visibility", "");
          });
        }
        this.draggableHelper.currentDrag.next(currentDrag$);
      });
      dragEnded$.pipe(mergeMap((dragEndData) => {
        const dragEndData$ = cancelDrag$.pipe(count(), take(1), map((calledCount) => __spreadProps(__spreadValues({}, dragEndData), {
          dragCancelled: calledCount > 0
        })));
        cancelDrag$.complete();
        return dragEndData$;
      })).subscribe(({
        x,
        y,
        dragCancelled
      }) => {
        this.scroller.destroy();
        if (this.dragEnd.observers.length > 0) {
          this.zone.run(() => {
            this.dragEnd.next({
              x,
              y,
              dragCancelled
            });
          });
        }
        removeClass(this.renderer, this.element, this.dragActiveClass);
        currentDrag$.complete();
      });
      merge(dragComplete$, dragEnded$).pipe(take(1)).subscribe(() => {
        requestAnimationFrame(() => {
          this.document.head.removeChild(globalDragStyle);
        });
      });
      return pointerMove;
    }), share());
    merge(pointerDragged$.pipe(take(1), map((value) => [, value])), pointerDragged$.pipe(pairwise())).pipe(filter(([previous, next]) => {
      if (!previous) {
        return true;
      }
      return previous.x !== next.x || previous.y !== next.y;
    }), map(([previous, next]) => next)).subscribe(({
      x,
      y,
      currentDrag$,
      clientX,
      clientY,
      transformX,
      transformY,
      target
    }) => {
      if (this.dragging.observers.length > 0) {
        this.zone.run(() => {
          this.dragging.next({
            x,
            y
          });
        });
      }
      requestAnimationFrame(() => {
        if (this.ghostElement) {
          const transform = `translate3d(${transformX}px, ${transformY}px, 0px)`;
          this.setElementStyles(this.ghostElement, {
            transform,
            "-webkit-transform": transform,
            "-ms-transform": transform,
            "-moz-transform": transform,
            "-o-transform": transform
          });
        }
      });
      currentDrag$.next({
        clientX,
        clientY,
        dropData: this.dropData,
        target
      });
    });
  }
  ngOnChanges(changes) {
    if (changes.dragAxis) {
      this.checkEventListeners();
    }
  }
  ngOnDestroy() {
    this.unsubscribeEventListeners();
    this.pointerDown$.complete();
    this.pointerMove$.complete();
    this.pointerUp$.complete();
    this.destroy$.next();
  }
  checkEventListeners() {
    const canDrag = this.canDrag();
    const hasEventListeners = Object.keys(this.eventListenerSubscriptions).length > 0;
    if (canDrag && !hasEventListeners) {
      this.zone.runOutsideAngular(() => {
        this.eventListenerSubscriptions.mousedown = this.renderer.listen(this.element.nativeElement, "mousedown", (event) => {
          this.onMouseDown(event);
        });
        this.eventListenerSubscriptions.mouseup = this.renderer.listen("document", "mouseup", (event) => {
          this.onMouseUp(event);
        });
        this.eventListenerSubscriptions.touchstart = this.renderer.listen(this.element.nativeElement, "touchstart", (event) => {
          this.onTouchStart(event);
        });
        this.eventListenerSubscriptions.touchend = this.renderer.listen("document", "touchend", (event) => {
          this.onTouchEnd(event);
        });
        this.eventListenerSubscriptions.touchcancel = this.renderer.listen("document", "touchcancel", (event) => {
          this.onTouchEnd(event);
        });
        this.eventListenerSubscriptions.mouseenter = this.renderer.listen(this.element.nativeElement, "mouseenter", () => {
          this.onMouseEnter();
        });
        this.eventListenerSubscriptions.mouseleave = this.renderer.listen(this.element.nativeElement, "mouseleave", () => {
          this.onMouseLeave();
        });
      });
    } else if (!canDrag && hasEventListeners) {
      this.unsubscribeEventListeners();
    }
  }
  onMouseDown(event) {
    if (event.button === 0) {
      if (!this.eventListenerSubscriptions.mousemove) {
        this.eventListenerSubscriptions.mousemove = this.renderer.listen("document", "mousemove", (mouseMoveEvent) => {
          this.pointerMove$.next({
            event: mouseMoveEvent,
            clientX: mouseMoveEvent.clientX,
            clientY: mouseMoveEvent.clientY
          });
        });
      }
      this.pointerDown$.next({
        event,
        clientX: event.clientX,
        clientY: event.clientY
      });
    }
  }
  onMouseUp(event) {
    if (event.button === 0) {
      if (this.eventListenerSubscriptions.mousemove) {
        this.eventListenerSubscriptions.mousemove();
        delete this.eventListenerSubscriptions.mousemove;
      }
      this.pointerUp$.next({
        event,
        clientX: event.clientX,
        clientY: event.clientY
      });
    }
  }
  onTouchStart(event) {
    let startScrollPosition;
    let isDragActivated;
    let hasContainerScrollbar;
    if (this.touchStartLongPress) {
      this.timeLongPress.timerBegin = Date.now();
      isDragActivated = false;
      hasContainerScrollbar = this.hasScrollbar();
      startScrollPosition = this.getScrollPosition();
    }
    if (!this.eventListenerSubscriptions.touchmove) {
      const contextMenuListener = fromEvent(this.document, "contextmenu").subscribe((e) => {
        e.preventDefault();
      });
      const touchMoveListener = fromEvent(this.document, "touchmove", {
        passive: false
      }).subscribe((touchMoveEvent) => {
        if (this.touchStartLongPress && !isDragActivated && hasContainerScrollbar) {
          isDragActivated = this.shouldBeginDrag(event, touchMoveEvent, startScrollPosition);
        }
        if (!this.touchStartLongPress || !hasContainerScrollbar || isDragActivated) {
          touchMoveEvent.preventDefault();
          this.pointerMove$.next({
            event: touchMoveEvent,
            clientX: touchMoveEvent.targetTouches[0].clientX,
            clientY: touchMoveEvent.targetTouches[0].clientY
          });
        }
      });
      this.eventListenerSubscriptions.touchmove = () => {
        contextMenuListener.unsubscribe();
        touchMoveListener.unsubscribe();
      };
    }
    this.pointerDown$.next({
      event,
      clientX: event.touches[0].clientX,
      clientY: event.touches[0].clientY
    });
  }
  onTouchEnd(event) {
    if (this.eventListenerSubscriptions.touchmove) {
      this.eventListenerSubscriptions.touchmove();
      delete this.eventListenerSubscriptions.touchmove;
      if (this.touchStartLongPress) {
        this.enableScroll();
      }
    }
    this.pointerUp$.next({
      event,
      clientX: event.changedTouches[0].clientX,
      clientY: event.changedTouches[0].clientY
    });
  }
  onMouseEnter() {
    this.setCursor(this.dragCursor);
  }
  onMouseLeave() {
    this.setCursor("");
  }
  canDrag() {
    return this.dragAxis.x || this.dragAxis.y;
  }
  setCursor(value) {
    if (!this.eventListenerSubscriptions.mousemove) {
      this.renderer.setStyle(this.element.nativeElement, "cursor", value);
    }
  }
  unsubscribeEventListeners() {
    Object.keys(this.eventListenerSubscriptions).forEach((type) => {
      this.eventListenerSubscriptions[type]();
      delete this.eventListenerSubscriptions[type];
    });
  }
  setElementStyles(element, styles) {
    Object.keys(styles).forEach((key) => {
      this.renderer.setStyle(element, key, styles[key]);
    });
  }
  getScrollElement() {
    if (this.scrollContainer) {
      return this.scrollContainer.elementRef.nativeElement;
    } else {
      return this.document.body;
    }
  }
  getScrollPosition() {
    if (this.scrollContainer) {
      return {
        top: this.scrollContainer.elementRef.nativeElement.scrollTop,
        left: this.scrollContainer.elementRef.nativeElement.scrollLeft
      };
    } else {
      return {
        top: window.pageYOffset || this.document.documentElement.scrollTop,
        left: window.pageXOffset || this.document.documentElement.scrollLeft
      };
    }
  }
  shouldBeginDrag(event, touchMoveEvent, startScrollPosition) {
    const moveScrollPosition = this.getScrollPosition();
    const deltaScroll = {
      top: Math.abs(moveScrollPosition.top - startScrollPosition.top),
      left: Math.abs(moveScrollPosition.left - startScrollPosition.left)
    };
    const deltaX = Math.abs(touchMoveEvent.targetTouches[0].clientX - event.touches[0].clientX) - deltaScroll.left;
    const deltaY = Math.abs(touchMoveEvent.targetTouches[0].clientY - event.touches[0].clientY) - deltaScroll.top;
    const deltaTotal = deltaX + deltaY;
    const longPressConfig = this.touchStartLongPress;
    if (deltaTotal > longPressConfig.delta || deltaScroll.top > 0 || deltaScroll.left > 0) {
      this.timeLongPress.timerBegin = Date.now();
    }
    this.timeLongPress.timerEnd = Date.now();
    const duration = this.timeLongPress.timerEnd - this.timeLongPress.timerBegin;
    if (duration >= longPressConfig.delay) {
      this.disableScroll();
      return true;
    }
    return false;
  }
  enableScroll() {
    if (this.scrollContainer) {
      this.renderer.setStyle(this.scrollContainer.elementRef.nativeElement, "overflow", "");
    }
    this.renderer.setStyle(this.document.body, "overflow", "");
  }
  disableScroll() {
    if (this.scrollContainer) {
      this.renderer.setStyle(this.scrollContainer.elementRef.nativeElement, "overflow", "hidden");
    }
    this.renderer.setStyle(this.document.body, "overflow", "hidden");
  }
  hasScrollbar() {
    const scrollContainer = this.getScrollElement();
    const containerHasHorizontalScroll = scrollContainer.scrollWidth > scrollContainer.clientWidth;
    const containerHasVerticalScroll = scrollContainer.scrollHeight > scrollContainer.clientHeight;
    return containerHasHorizontalScroll || containerHasVerticalScroll;
  }
};
_DraggableDirective.ɵfac = function DraggableDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DraggableDirective)();
};
_DraggableDirective.ɵdir = ɵɵdefineDirective({
  type: _DraggableDirective,
  selectors: [["", "mwlDraggable", ""]],
  inputs: {
    dropData: "dropData",
    dragAxis: "dragAxis",
    dragSnapGrid: "dragSnapGrid",
    ghostDragEnabled: "ghostDragEnabled",
    showOriginalElementWhileDragging: "showOriginalElementWhileDragging",
    validateDrag: "validateDrag",
    dragCursor: "dragCursor",
    dragActiveClass: "dragActiveClass",
    ghostElementAppendTo: "ghostElementAppendTo",
    ghostElementTemplate: "ghostElementTemplate",
    touchStartLongPress: "touchStartLongPress",
    autoScroll: "autoScroll"
  },
  outputs: {
    dragPointerDown: "dragPointerDown",
    dragStart: "dragStart",
    ghostElementCreated: "ghostElementCreated",
    dragging: "dragging",
    dragEnd: "dragEnd"
  },
  features: [ɵɵNgOnChangesFeature]
});
var DraggableDirective = _DraggableDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DraggableDirective, [{
    type: Directive,
    args: [{
      selector: "[mwlDraggable]"
    }]
  }], null, {
    dropData: [{
      type: Input
    }],
    dragAxis: [{
      type: Input
    }],
    dragSnapGrid: [{
      type: Input
    }],
    ghostDragEnabled: [{
      type: Input
    }],
    showOriginalElementWhileDragging: [{
      type: Input
    }],
    validateDrag: [{
      type: Input
    }],
    dragCursor: [{
      type: Input
    }],
    dragActiveClass: [{
      type: Input
    }],
    ghostElementAppendTo: [{
      type: Input
    }],
    ghostElementTemplate: [{
      type: Input
    }],
    touchStartLongPress: [{
      type: Input
    }],
    autoScroll: [{
      type: Input
    }],
    dragPointerDown: [{
      type: Output
    }],
    dragStart: [{
      type: Output
    }],
    ghostElementCreated: [{
      type: Output
    }],
    dragging: [{
      type: Output
    }],
    dragEnd: [{
      type: Output
    }]
  });
})();
function isCoordinateWithinRectangle(clientX, clientY, rect) {
  return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
}
var _DroppableDirective = class _DroppableDirective {
  constructor() {
    this.dragEnter = new EventEmitter();
    this.dragLeave = new EventEmitter();
    this.dragOver = new EventEmitter();
    this.drop = new EventEmitter();
    this.element = inject(ElementRef);
    this.draggableHelper = inject(DraggableHelper);
    this.zone = inject(NgZone);
    this.renderer = inject(Renderer2);
    this.scrollContainer = inject(DraggableScrollContainerDirective, {
      optional: true
    });
  }
  ngOnInit() {
    this.currentDragSubscription = this.draggableHelper.currentDrag.subscribe((drag$) => {
      addClass(this.renderer, this.element, this.dragActiveClass);
      const droppableElement = {
        updateCache: true
      };
      const deregisterScrollListener = this.renderer.listen(this.scrollContainer ? this.scrollContainer.elementRef.nativeElement : "window", "scroll", () => {
        droppableElement.updateCache = true;
      });
      let currentDragEvent;
      const overlaps$ = drag$.pipe(map(({
        clientX,
        clientY,
        dropData,
        target
      }) => {
        currentDragEvent = {
          clientX,
          clientY,
          dropData,
          target
        };
        if (droppableElement.updateCache) {
          droppableElement.rect = this.element.nativeElement.getBoundingClientRect();
          if (this.scrollContainer) {
            droppableElement.scrollContainerRect = this.scrollContainer.elementRef.nativeElement.getBoundingClientRect();
          }
          droppableElement.updateCache = false;
        }
        const isWithinElement = isCoordinateWithinRectangle(clientX, clientY, droppableElement.rect);
        const isDropAllowed = !this.validateDrop || this.validateDrop({
          clientX,
          clientY,
          target,
          dropData
        });
        if (droppableElement.scrollContainerRect) {
          return isWithinElement && isDropAllowed && isCoordinateWithinRectangle(clientX, clientY, droppableElement.scrollContainerRect);
        } else {
          return isWithinElement && isDropAllowed;
        }
      }));
      const overlapsChanged$ = overlaps$.pipe(distinctUntilChanged());
      let dragOverActive;
      overlapsChanged$.pipe(filter((overlapsNow) => overlapsNow)).subscribe(() => {
        dragOverActive = true;
        addClass(this.renderer, this.element, this.dragOverClass);
        if (this.dragEnter.observers.length > 0) {
          this.zone.run(() => {
            this.dragEnter.next(currentDragEvent);
          });
        }
      });
      overlaps$.pipe(filter((overlapsNow) => overlapsNow)).subscribe(() => {
        if (this.dragOver.observers.length > 0) {
          this.zone.run(() => {
            this.dragOver.next(currentDragEvent);
          });
        }
      });
      overlapsChanged$.pipe(pairwise(), filter(([didOverlap, overlapsNow]) => didOverlap && !overlapsNow)).subscribe(() => {
        dragOverActive = false;
        removeClass(this.renderer, this.element, this.dragOverClass);
        if (this.dragLeave.observers.length > 0) {
          this.zone.run(() => {
            this.dragLeave.next(currentDragEvent);
          });
        }
      });
      drag$.subscribe({
        complete: () => {
          deregisterScrollListener();
          removeClass(this.renderer, this.element, this.dragActiveClass);
          if (dragOverActive) {
            removeClass(this.renderer, this.element, this.dragOverClass);
            if (this.drop.observers.length > 0) {
              this.zone.run(() => {
                this.drop.next(currentDragEvent);
              });
            }
          }
        }
      });
    });
  }
  ngOnDestroy() {
    if (this.currentDragSubscription) {
      this.currentDragSubscription.unsubscribe();
    }
  }
};
_DroppableDirective.ɵfac = function DroppableDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DroppableDirective)();
};
_DroppableDirective.ɵdir = ɵɵdefineDirective({
  type: _DroppableDirective,
  selectors: [["", "mwlDroppable", ""]],
  inputs: {
    dragOverClass: "dragOverClass",
    dragActiveClass: "dragActiveClass",
    validateDrop: "validateDrop"
  },
  outputs: {
    dragEnter: "dragEnter",
    dragLeave: "dragLeave",
    dragOver: "dragOver",
    drop: "drop"
  }
});
var DroppableDirective = _DroppableDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DroppableDirective, [{
    type: Directive,
    args: [{
      selector: "[mwlDroppable]"
    }]
  }], null, {
    dragOverClass: [{
      type: Input
    }],
    dragActiveClass: [{
      type: Input
    }],
    validateDrop: [{
      type: Input
    }],
    dragEnter: [{
      type: Output
    }],
    dragLeave: [{
      type: Output
    }],
    dragOver: [{
      type: Output
    }],
    drop: [{
      type: Output
    }]
  });
})();
var _DragAndDropModule = class _DragAndDropModule {
};
_DragAndDropModule.ɵfac = function DragAndDropModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DragAndDropModule)();
};
_DragAndDropModule.ɵmod = ɵɵdefineNgModule({
  type: _DragAndDropModule,
  imports: [DraggableDirective, DroppableDirective, DraggableScrollContainerDirective],
  exports: [DraggableDirective, DroppableDirective, DraggableScrollContainerDirective]
});
_DragAndDropModule.ɵinj = ɵɵdefineInjector({});
var DragAndDropModule = _DragAndDropModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DragAndDropModule, [{
    type: NgModule,
    args: [{
      imports: [DraggableDirective, DroppableDirective, DraggableScrollContainerDirective],
      exports: [DraggableDirective, DroppableDirective, DraggableScrollContainerDirective]
    }]
  }], null, null);
})();
export {
  DragAndDropModule,
  DraggableDirective,
  DraggableScrollContainerDirective,
  DroppableDirective
};
//# sourceMappingURL=angular-draggable-droppable.js.map
