import { ClassTransformOptions, instanceToPlain } from 'class-transformer';

export class AppTransformer {
  static instanceToPlain<T>(instance: T, options?: ClassTransformOptions) {
    return instanceToPlain(instance, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
      excludePrefixes: ['password'],
      ...options,
    }) as T;
  }
}
