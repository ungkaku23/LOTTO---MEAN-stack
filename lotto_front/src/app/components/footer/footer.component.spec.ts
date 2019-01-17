import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FooterComponent } from "./footer.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("FooterComponent", () => {

  let fixture: ComponentFixture<FooterComponent>;
  let component: FooterComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [FooterComponent]
    });

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
