import MainStore from './MainStore';
import TestStore from './TestStore';
import CommunitiesStore from './CommunitiesStore';
import CompaniesStore from './CompaniesStore';
import SegmentedStore from './SegmentedStore';
import UploadStore from './UploadStore';
import CheckoutStore from './CheckoutStore';
import GameStore from './GameStore';
class RootStore {
    constructor(props) {
        this.MainStore = new MainStore(props);
        this.TestStore = new TestStore(props);
        this.CommunitiesStore = new CommunitiesStore(props);
        this.CompaniesStore = new CompaniesStore(props);
        this.SegmentedStore = new SegmentedStore(props);
        this.UploadStore = new UploadStore(props);
        this.CheckoutStore = new CheckoutStore(props);
        this.GameStore = new GameStore(props);
    }
}

export default RootStore;
