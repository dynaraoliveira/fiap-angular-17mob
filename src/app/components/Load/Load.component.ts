import { Component, Input } from '@angular/core'

@Component({
    selector: 'load-component',
    templateUrl: './Load.component.html',
    styleUrls: ['./Load.component.css']
})

export class LoadComponent {
    @Input() show: boolean = false;
}