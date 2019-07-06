import Breadcrumbs from './vuestic-components/vuestic-breadcrumbs/VuesticBreadcrumbs.vue';
import Modal from './vuestic-components/vuestic-modal/VuesticModal.vue';
import Scrollbar from './vuestic-components/vuestic-scrollbar/VuesticScrollbar.vue';
import Switch from './vuestic-components/vuestic-switch/VuesticSwitch.vue';
import SimpleSelect from './vuestic-components/vuestic-simple-select/VuesticSimpleSelect.vue';
import Tabs from './vuestic-components/vuestic-tabs/VuesticTabs.vue';
import Widget from './vuestic-components/vuestic-widget/VuesticWidget.vue';
import FileUpload from './vuestic-components/vuestic-file-upload/VuesticFileUpload';

import VuesticDropdown from './vuestic-components/vuestic-dropdown/VuesticDropdown';
import { installQuasarPlatform } from './vuestic-components/vuestic-popup/quasar/install';

// At the moment we use quasar platform install to make its components work.
// Ideally we want to create similar vuestic platform object that holds needed values.
installQuasarPlatform();

const VuesticPlugin = {
  install(Vue, options) {
    [Breadcrumbs, FileUpload, Modal, Scrollbar, Switch, SimpleSelect, Tabs, Widget, VuesticDropdown].forEach(component => {
      Vue.component(component.name, component);
    });
  }
};

export default VuesticPlugin;
