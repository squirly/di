import {Binding} from './Binding';
import {Container, Resolution} from './Container';

export class Module<Export, Service = any> {
  static create<Service>(
    container: Container<Service>,
  ): Module<never, Service> {
    return new Module([], container);
  }

  private constructor(
    public readonly resolutions: ReadonlyArray<Resolution<Export>>,
    private readonly container: Container<Service>,
  ) {}

  export<S extends Service>(binding: Binding<S>): Module<Export | S, Service> {
    const resolution: Resolution<S> = {
      tag: binding.Tag,
      factory: () => this.container.resolve(binding),
    };
    return new Module<Export | S, Service>(
      [resolution, ...this.resolutions],
      this.container,
    );
  }
}
