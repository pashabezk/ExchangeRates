import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CurrSelectorComponent} from './curr-selector.component';

describe('CurrSelectorComponent', () => {
	let component: CurrSelectorComponent;
	let fixture: ComponentFixture<CurrSelectorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CurrSelectorComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(CurrSelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
