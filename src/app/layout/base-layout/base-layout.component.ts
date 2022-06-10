import { animate, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  animations: [
    trigger('architectUIAnimation', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            opacity: 0,
            display: 'flex',
            flex: '1',
            transform: 'translateY(-20px)',
            flexDirection: 'column'
          }),
        ]),
        query(':enter', [
          animate('600ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
        ], { optional: true }),

        query(':leave', [
          animate('600ms ease', style({ opacity: 0, transform: 'translateY(-20px)' })),
        ], { optional: true })
      ]),
    ])
  ]
})

export class BaseLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
