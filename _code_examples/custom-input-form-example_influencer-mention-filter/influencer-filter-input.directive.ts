import { Directive, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'input[influencerFilterInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InfluencerFilterInputDirective),
      multi: true,
    },
  ],
})
export class InfluencerFilterInputDirective implements ControlValueAccessor {
  private _value: number | null;

  constructor(private elementRef: ElementRef) {}

  public get value(): number | null {
    return this._value;
  }

  @Input()
  public set value(value: number | null) {
    this.setUpValue(value);
    this.formatValue(this._value);
  }

  @Input() public displayFunction: (value: unknown) => string;
  @Input() public regExpMask: RegExp = /[^\d]/g;
  @Input() public maxInputLength: number = null;

  private formatValue(value: number | null) {
    if (value !== null) {
      const formattedValue = this.displayFunction ? this.displayFunction(value) : value.toString();
      this.elementRef.nativeElement.value = formattedValue;
    } else {
      this.elementRef.nativeElement.value = null;
    }
  }

  private unFormatValue() {
    if (this.value) {
      this.elementRef.nativeElement.value = this.value;
    } else {
      this.elementRef.nativeElement.value = null;
    }
  }

  @HostListener('input', ['$event.target.value'])
  public onInput(value) {
    this.setUpValue(value);
    this._onChange(this._value);
  }

  @HostListener('blur')
  public _onBlur() {
    this.formatValue(this._value);
  }

  @HostListener('focus')
  public onFocus() {
    this.unFormatValue();
  }

  public _onChange(value: number): void {}

  public writeValue(value: string | number) {
    this.setUpValue(value);
    this.formatValue(this._value);
  }

  public registerOnChange(fn: (value: number) => void) {
    this._onChange = fn;
  }

  public registerOnTouched() {}

  private setUpValue(value: string | number) {
    if (value !== null && value !== '') {
      const validValue = value
        .toString()
        .replace(this.regExpMask, '')
        .slice(0, this.maxInputLength || undefined);
      this.elementRef.nativeElement.value = validValue;
      const resultValue = Number(validValue);
      this._value = isNaN(resultValue) ? null : resultValue;
    } else {
      this._value = null;
    }
  }
}
