import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("HeaderComponent", () => {

  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [HeaderComponent]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
