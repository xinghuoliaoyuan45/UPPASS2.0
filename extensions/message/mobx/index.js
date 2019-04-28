import MessageStore from './MessageStore';

class RootStore {
    constructor(props) {
        this.MessageStore = new MessageStore(props);
    }
}

export default RootStore;
