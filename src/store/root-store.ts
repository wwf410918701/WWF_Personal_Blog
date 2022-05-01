import globalUiStore from "./global-ui-store";
import userStore from "./user-store";

class RootStore {
  userStore
  globalUiStore

  constructor() {
    this.userStore = new userStore(this)
    this.globalUiStore = new globalUiStore(this)
  }
}

export default RootStore;