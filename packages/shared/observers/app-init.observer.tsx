export class AppInitObserver {
  private _listeners: Array<Function> = []
  private _isInitialized: boolean = false
  set isInitialized(value: boolean) {
    this._listeners.forEach(
      async (listener, index) =>
        await listener(value, () => {
          this._listeners.splice(index, 1)
        })
    )
    this._isInitialized = value
  }
  get isInitialized(): boolean {
    return this._isInitialized
  }
  set listener(listFun: Function) {
    this._listeners.push(listFun)
  }
}

