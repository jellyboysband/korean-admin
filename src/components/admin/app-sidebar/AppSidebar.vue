<template>
  <vuestic-sidebar :isHidden="!isOpen">
    <template slot="menu">
      <sidebar-link :to="{ name: 'admin__brands' }">
        <span slot="title">
          <!-- <span class="sidebar-menu-item-icon fontello fontello-vgms"></span> -->
          <span>{{ $t('menu.brands') }}</span>
        </span>
      </sidebar-link>
      <sidebar-link :to="{ name: 'admin__products' }">
        <span slot="title">
          <!-- <span class="sidebar-menu-item-icon fontello fontello-slots"></span> -->
          <span>{{ $t('menu.products') }}</span>
        </span>
      </sidebar-link>
      <sidebar-link :to="{ name: 'admin__orders' }">
        <span slot="title">
          <!-- <span class="sidebar-menu-item-icon fontello fontello-slots"></span> -->
          <span>{{ $t('menu.orders') }}</span>
        </span>
      </sidebar-link>
    </template>
  </vuestic-sidebar>
</template>

<script>
import VuesticSidebar from 'vuestic-components/vuestic-sidebar/VuesticSidebar';
import SidebarLink from './components/SidebarLink';
import SidebarLinkGroup from './components/SidebarLinkGroup';

export default {
  name: 'app-sidebar',
  components: {
    VuesticSidebar,
    SidebarLink,
    SidebarLinkGroup
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  }
};
</script>
