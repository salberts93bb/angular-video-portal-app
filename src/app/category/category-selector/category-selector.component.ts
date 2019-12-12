import { Component, OnInit, EventEmitter, Output, Input, forwardRef, Injector, DoCheck, HostBinding, ViewChild } from '@angular/core';
import { Category } from '../../shared/models/category';
import { CategoryService } from '../../shared/services/category.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatFormFieldControl, MatSelect } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-category-selector',
    templateUrl: './category-selector.component.html',
    styleUrls: ['./category-selector.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CategorySelectorComponent),
        multi: true
    },
    {
        provide: MatFormFieldControl,
        useExisting: CategorySelectorComponent
    }
    ]
})
export class CategorySelectorComponent implements OnInit, DoCheck, ControlValueAccessor, MatFormFieldControl<Category> {
    id: string;

    set value(category: Category) {
        this.stateChanges.next();
    }

    @Input() placeholder: string;
    ngControl: NgControl;
    focused: boolean = false;
    get empty(): boolean {
        return this.selectedCategory === undefined;
    }

    get shouldLabelFloat(): boolean {
        return !this.empty;
    }

    @Input() required: boolean;
    disabled: boolean;
    isTouched: boolean = false;
    errorState: boolean = false;

    controlType?: string;
    autofilled?: boolean;

    @ViewChild('select', { static: true })
    select: MatSelect;

    categories: Category[];
    @Output() categorySelectionChanged: EventEmitter<Category> = new EventEmitter<Category>();
    stateChanges = new Subject<void>();
    @Input() selectedCategory: Category;

    constructor(private categoryService: CategoryService, private errorHandlerService: ErrorHandlerService, private injector: Injector) { }

    ngOnInit() {
        this.ngControl = this.injector.get(NgControl);
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }

        this.categoryService.getAll()
            .subscribe((data: Category[]) => {
                this.categories = data;
            },
                (error: any) => this.errorHandlerService.handleError(error));
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }

    ngDoCheck() {
        if (this.ngControl) {
            this.errorState = this.ngControl.invalid && this.isTouched;
            this.stateChanges.next();
        }
    }

    onChange(category: Category) {
        this.categorySelectionChanged.emit(category);
    }

    onBlur() {
        this.isTouched = true;
    }

    compareCategories(category1: Category, category2: Category): boolean {
        if (!category1 || !category2) {
            return false;
        }
        return category1.name === category2.name && category1.id === category2.id;
    }

    propagateChange = (_: any) => { };

    writeValue(obj: any): void {
        if (obj !== undefined) {
            this.value = obj;
        }
    }

    registerOnChange(fn: any): void {
        this.select.registerOnChange(fn);
    }

    registerOnTouched(fn: any): void {
        this.select.registerOnTouched(fn);
    }

    setDisabledState?(isDisabled: boolean): void {
    }
    setDescribedByIds(ids: string[]): void {
    }
    onContainerClick(event: MouseEvent): void {
    }
}
