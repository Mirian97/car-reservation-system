import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-debounced-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './debounced-input.component.html',
})
export class DebouncedInputComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  @Input() debounceTime: number = 500;
  @Input() name?: string = '';
  @Input() className?: string = '';
  @Input() placeholder?: string = '';
  @Output() onChange = new EventEmitter<string>();
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe((value) => {
        this.onChange.emit(value || '');
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
