enum ChangeDetectionStrategy {
  Default = 1,
  OnPush
}

interface ComponentProperties {
  selector: string;
  templateUrl: string;
  styleUrls: string[];
  changeDetection: ChangeDetectionStrategy;
}

function Component(properties: ComponentProperties) {
  return function(constructor: Function) {
    const changeDetection = ChangeDetectionStrategy[properties.changeDetection];
    console.log(
      `[Before Instantiation] Properties passed: ${JSON.stringify(properties)}`
    );
    console.log(
      `[Before Instantiation] Change Detection Type: ${changeDetection}`
    );
  };
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
class AppComponent {
  ready = true;
}

const appComponent = new AppComponent();
console.log(`[After Instantiation] Ready? ${appComponent.ready}`);
