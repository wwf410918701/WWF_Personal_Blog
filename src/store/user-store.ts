import { makeAutoObservable } from "mobx";
import RootStore from "./root-store";

class userStore {
  userID: string | null = null;
  userEmail: string | null = null
  userName: string | null = null
  rootStore: RootStore | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false }, { autoBind: true })
    this.rootStore = rootStore
  }

  userLogin(userID: string, userName: string, userEmail: string) {
    this.userID = userID
    this.userName = userName
    this.userEmail = userEmail
  }

  userLogout() {
    this.userID = null;
    this.userName = null;
    this.userEmail = null;
  }

  updateUserEmail(userEmail: string) {
    this.userEmail = userEmail
  }

  updateUserName(userName: string) {
    this.userName = userName
  }
}

export default userStore;