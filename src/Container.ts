import {Binding} from './Binding';
import {
  CircularDependencyError,
  DependencyResolutionError,
  MissingDependencyError,
} from './DependencyResolutionError';
import {Injectable} from './Injectable';
import {Module} from './Module';

export class Container<Service> {
  static create(): Container<never> {
    return new Container([], []);
  }

  private constructor(
    private readonly resolutions: Array<Resolution<Service>>,
    private readonly chain: Array<Resolution<Service>>,
  ) {}

  bindFactory<S>(
    {Tag: tag}: Binding<S>,
    factory: Resolution<S>['factory'],
    factoryName?: string,
  ): Container<Service | S> {
    const name =
      factoryName ||
      (factory.name === '' || factory.name === 'anonymous'
        ? undefined
        : factory.name);
    const resolution: Resolution<S> = {name, tag, factory};
    return new Container<Service | S>(
      [resolution, ...this.resolutions],
      this.chain,
    );
  }

  bindSingletonFactory<S>(
    binding: Binding<S>,
    factory: Resolution<S>['factory'],
    factoryName?: string,
  ): Container<Service | S> {
    let cache: Promise<S> | S | undefined;

    return this.bindFactory(
      binding,
      c => (cache === undefined ? (cache = factory(c)) : cache),
      factoryName,
    );
  }

  bindConstant<S>(
    binding: Binding<S>,
    value: S | Promise<S>,
  ): Container<Service | S> {
    return this.bindFactory(binding, () => value, 'Constant');
  }

  bindService<S>(
    binding: Binding<S>,
    service: Injectable<S, any>,
  ): Container<Service | S> {
    let cache: Promise<S> | undefined;

    return this.bindFactory(
      binding,
      c => {
        if (cache === undefined) {
          const dependencies = (service.Inject || []).map(tag =>
            c.resolve(tag),
          );
          cache = Promise.all(dependencies).then(
            resolvedDependencies => new service(...resolvedDependencies),
          );
        }
        return cache;
      },
      service.name,
    );
  }

  importModule<Export>(module: Module<Export>): Container<Service | Export> {
    const resolutions: Array<Resolution<Service | Export>> = [
      ...module.resolutions,
      ...this.resolutions,
    ];
    return new Container(resolutions, []);
  }

  async resolve<S extends Service>({Tag}: Binding<S>): Promise<S> {
    const matchTag = (r: Resolution<Service>): r is Resolution<S> =>
      r.tag === Tag;

    const resolution = this.resolutions.find(matchTag);

    if (resolution === undefined) {
      throw new MissingDependencyError(Tag, this.chain);
    }

    const chain = [...this.chain, resolution];

    if (this.chain.findIndex(matchTag) !== -1) {
      throw new CircularDependencyError(Tag, chain);
    } else {
      try {
        return await resolution.factory(new Container(this.resolutions, chain));
      } catch (error) {
        if (error instanceof DependencyResolutionError) {
          throw error;
        } else {
          throw new DependencyResolutionError(error, chain);
        }
      }
    }
  }
}

export interface Resolution<Service> {
  name?: string;
  tag: Binding.Tag<Service>;
  factory: (container: Container<any>) => Service | Promise<Service>;
}
