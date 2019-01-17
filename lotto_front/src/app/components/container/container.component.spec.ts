import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ContainerComponent } from "./container.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ContainerComponent", () => {

  let fixture: ComponentFixture<ContainerComponent>;
  let component: ContainerComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ContainerComponent]
    });

    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
