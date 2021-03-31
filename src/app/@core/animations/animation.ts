import { animate, style, transition, trigger } from '@angular/animations';

export const slideToBottom = trigger('slideToBottom', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' })),
  ]),
  transition(':leave', [animate('0.5s ease-in-out', style({ transform: 'translateY(-100%)' }))]),
]);
