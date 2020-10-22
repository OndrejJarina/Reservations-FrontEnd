export class Film {

  constructor(private _id: string,
              private _name: string,
              private _runtime: number,
              private _description: string) {
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get runtime(): number {
    return this._runtime;
  }

  set runtime(value: number) {
    this._runtime = value;
  }
}
