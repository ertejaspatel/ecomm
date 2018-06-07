import { observable } from 'mobx';

class UserStore {
  @observable username = 'DP';
  @observable sessionID = '';


}

export default UserStore;
