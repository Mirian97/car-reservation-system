import { NgClass } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-debounced-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './debounced-input.component.html',
})
export class DebouncedInputComponent implements OnInit {
  searchControl = new FormControl('');
  @Input() debounceTime: number = 500;
  @Input() value: string = '';
  @Input() name?: string = '';
  @Input() className?: string = '';
  @Input() placeholder?: string = '';
  @Output() onChange = new EventEmitter<string>();

  constructor(private destroyRef: DestroyRef) {}

  ngOnInit() {
    this.searchControl.setValue(this.value, { emitEvent: false });
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        this.onChange.emit(value || '');
      });
  }
}
