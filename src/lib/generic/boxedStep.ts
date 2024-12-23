import { test } from "../generic/fixtures";

export function boxedStep(target: Function, context: ClassMethodDecoratorContext) {
  return function(...args: any) {
    const name = `${this.constructor.name}.${String(context.name)}`;
    return test.step(name, async () => target.call(this, ...args), { box: true });
  };
}