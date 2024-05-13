import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CurrSelectorItemComponent} from './curr-selector-item.component';

describe('CurrSelectorItemComponent', () => {
	let component: CurrSelectorItemComponent;
	let fixture: ComponentFixture<CurrSelectorItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CurrSelectorItemComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(CurrSelectorItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
