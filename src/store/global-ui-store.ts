import { makeAutoObservable } from "mobx";
import RootStore from "./root-store";

class globalUiStore {
  openDrawer = false
  rootStore: RootStore | null = null

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false }, { autoBind: true })
    this.rootStore = rootStore
  }
}

export default globalUiStore;