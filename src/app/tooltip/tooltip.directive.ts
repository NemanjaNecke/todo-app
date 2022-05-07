import { ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { AwesomeTooltipComponent } from './tooltip.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Directive({ selector: '[awesomeTooltip]' })
export class AwesomeTooltipDirective implements OnInit{

  @Input('awesomeTooltip') text = '';
  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay,
              private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef,
              @Optional() private item: TodoItemComponent) { /* this line checks if this component is clicked so the tooltip goes away */
  }


  ngOnInit(): void {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -8,
      }]);

    this.overlayRef = this.overlay.create({ positionStrategy });
  }

  @HostListener('mouseover')
  show() {
    const tooltipRef: ComponentRef<AwesomeTooltipComponent>
      = this.overlayRef.attach(new ComponentPortal(AwesomeTooltipComponent));
    tooltipRef.instance.text = this.text;
  }

  @HostListener('mouseout')
  hide() {
  
    this.overlayRef.detach();
  }


  @HostListener('click',['$event.target'])
    delete(){

      if(this.item !== null){
        this.overlayRef.dispose();
      }
      
    }  

  
}