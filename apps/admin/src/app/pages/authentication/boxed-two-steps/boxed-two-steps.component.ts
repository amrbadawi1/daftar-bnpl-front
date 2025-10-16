import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-boxed-two-steps',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './boxed-two-steps.component.html',
})
export class AppBoxedTwoStepsComponent {
  options: any;
  
  constructor(private settings: CoreService) {
    this.options = this.settings.getOptions();
  }
}
