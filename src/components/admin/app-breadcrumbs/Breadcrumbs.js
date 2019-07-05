export const breadcrumbs = {
  root: {
    name: '/',
    displayName: 'Home'
  },
  routes: [
    {
      name: 'admin__products',
      displayName: 'menu.dashboard'
    },
    //= ====== ADMIN SECTION ========
    {
      name: 'admin__admins',
      displayName: 'admin__admin.admins',
      children: [
        {
          name: 'admin__admin.create',
          displayName: 'admin.create'
        },
        {
          name: 'admin__admin-page',
          displayName: 'admin.admin',
          children: [
            {
              name: 'admin__admin.info',
              displayName: 'admin.info'
            },
            {
              name: 'admin__admin.logs',
              displayName: 'admin.logs'
            },
            {
              name: 'admin__admin.edit',
              displayName: 'admin.edit'
            }
          ]
        }
      ]
    },
    {
      name: 'admin__admin.create',
      displayName: 'admin.create'
    },
    {
      name: 'admin__admin-logs',
      displayName: 'adminLog.adminLogs'
    },
    //= === USER SECTION =========
    {
      name: 'admin__users',
      displayName: 'user.users',
      children: [
        {
          name: 'admin__user.create',
          displayName: 'user.create'
        },
        {
          name: 'admin__user-page',
          displayName: 'user.user',
          children: [
            {
              name: 'admin__user.profile',
              displayName: 'user.profile'
            },
            {
              name: 'admin__user.edit',
              displayName: 'user.edit'
            },
            {
              name: 'admin__user.sessions',
              displayName: 'user.sessions'
            },
            {
              name: 'admin__user.invoices',
              displayName: 'user.invoices'
            },
            {
              name: 'admin__user.logs',
              displayName: 'user.logs'
            }
          ]
        }
      ]
    },
    {
      name: 'admin__user-logs',
      displayName: 'userLog.userLogs'
    },
    //= ===== GROUP SECTION ======
    {
      name: 'admin__groups',
      displayName: 'group.groups',
      children: [
        {
          name: 'admin__group.create',
          displayName: 'group.create'
        },
        {
          name: 'admin__group-page',
          displayName: 'group.group',
          children: [
            {
              name: 'admin__group.info',
              displayName: 'group.info'
            },
            {
              name: 'admin__group.edit',
              displayName: 'group.edit'
            }
          ]
        }
      ]
    },

    //= ====== HALL SECTION ======
    {
      name: 'admin__halls',
      displayName: 'hall.halls',
      children: [
        {
          name: 'admin__hall.create',
          displayName: 'hall.create'
        },
        {
          name: 'admin__hall-page',
          displayName: 'hall.hall',
          children: [
            {
              name: 'admin__hall.info',
              displayName: 'hall.info'
            },
            {
              name: 'admin__hall.edit',
              displayName: 'hall.edit'
            }
          ]
        }
      ]
    },
    //= ====== CONFIG SECTION ======
    {
      name: 'admin__configs',
      displayName: 'config.configs',
      children: [
        {
          name: 'admin__config.create',
          displayName: 'config.create'
        },
        {
          name: 'admin__config-page',
          displayName: 'config.config',
          children: [
            {
              name: 'admin__config.info',
              displayName: 'config.info'
            },
            {
              name: 'admin__config.edit',
              displayName: 'config.edit'
            }
          ]
        }
      ]
    },
    //= ====== REEL SECTION ======
    {
      name: 'admin__reels',
      displayName: 'reel.reels',
      children: [
        {
          name: 'admin__reel.create',
          displayName: 'reel.create'
        },
        {
          name: 'admin__reel-page',
          displayName: 'reel.page',
          children: [
            {
              name: 'admin__reel.info',
              displayName: 'reel.info'
            },
            {
              name: 'admin__reel.edit',
              displayName: 'reel.edit'
            }
          ]
        }
      ]
    },

    //= ====== GAME SECTION ======
    {
      name: 'admin__games',
      displayName: 'game.games',
      children: [
        {
          name: 'admin__game.create',
          displayName: 'game.create'
        },
        {
          name: 'admin__game-page',
          displayName: 'game.page',
          children: [
            {
              name: 'admin__game.info',
              displayName: 'Info'
            },
            {
              name: 'admin__game.edit',
              displayName: 'Edit'
            }
          ]
        }
      ]
    },

    //= ====== SLOT SECTION ======
    {
      name: 'admin__slots',
      displayName: 'slot.slots',
      children: [
        {
          name: 'admin__slot.create',
          displayName: 'slot.create'
        },
        {
          name: 'admin__slot-page',
          displayName: 'slot.slot',
          children: [
            {
              name: 'admin__slot.info',
              displayName: 'slot.info'
            },
            {
              name: 'admin__slot.edit',
              displayName: 'slot.edit'
            },
            {
              name: 'admin__slot.stats',
              displayName: 'slot.stats'
            },
            {
              name: 'admin__slot.sessions',
              displayName: 'slot.sessions'
            },
            {
              name: 'admin__slot.logs',
              displayName: 'slot.logs'
            }
          ]
        }
      ]
    },
    //= ====== VGM SECTION ======
    {
      name: 'admin__vgms',
      displayName: 'vgm.vgms',
      children: [
        {
          name: 'admin__vgm.create',
          displayName: 'vgm.create'
        },
        {
          name: 'admin__vgm-page',
          displayName: 'vgm.vgm',
          children: [
            {
              name: 'admin__vgm.info',
              displayName: 'vgm.info'
            },
            {
              name: 'admin__vgm.edit',
              displayName: 'vgm.edit'
            },
            {
              name: 'admin__vgm.stats',
              displayName: 'vgm.stats'
            },
            {
              name: 'admin__vgm.slots',
              displayName: 'vgm.slots'
            },
            {
              name: 'admin__vgm.sessions',
              displayName: 'vgm.sessions'
            },
            {
              name: 'admin__vgm.invoices',
              displayName: 'Vgm Invoices'
            },
            {
              name: 'admin__vgm.clone',
              displayName: 'Clone Vgm'
            }
          ]
        }
      ]
    },

    //= ====== INVOICE SECTION =====
    {
      name: 'admin__invoices',
      displayName: 'invoice.invoices',
      children: [
        {
          name: 'admin__invoice-page',
          displayName: 'invoice.invoice',
          children: [
            {
              name: 'admin__invoice.info',
              displayName: 'Info'
            }
          ]
        }
      ]
    },

    //= ====== SESSION SECTION =====
    {
      name: 'admin__session-page',
      displayName: 'session.session',
      children: [
        {
          name: 'admin__session.info',
          displayName: 'slot.info'
        },
        {
          name: 'admin__session.stats',
          displayName: 'session.stats'
        },
        {
          name: 'admin__session.logs',
          displayName: 'session.logs'
        }
      ]
    },

    //= ====== SECURITY SECTION =====
    {
      name: 'admin__security',
      displayName: 'security.security',
      children: [
        {
          name: 'admin__security.info',
          displayName: 'security.info'
        },
        {
          name: 'admin__security.adminlogs',
          displayName: 'security.adminlogs'
        },
        {
          name: 'admin__security.userlogs',
          displayName: 'security.userlogs'
        },
        {
          name: 'admin__security.riskcontrol',
          displayName: 'security.riskcontrol'
        }
      ]
    }
  ]
};
