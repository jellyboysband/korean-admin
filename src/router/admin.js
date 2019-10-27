const ADMIN_ROUTES = [
  {
    name: 'Admin',
    path: '/admin',
    component: () => import('components/admin/AppLayout'),
    meta: {
      requiresAuth: true
    },
    children: [
      //= == recipe SECTION ===
      {
        name: 'admin__products',
        path: 'product/list',
        component: () => import('../views/Product/Products'),
        props: true
      },
      {
        name: 'admin__product.create',
        path: 'product/create',
        component: () => import('../views/Product/ProductCreate')
      },
      {
        name: 'admin__product.edit',
        path: 'product/:productId/edit',
        props: route => {
          return {
            productId: Number(route.params.productId)
          };
        },
        component: () => import('../views/Product/ProductEdit')
      },

      {
        name: 'admin__orders',
        path: 'order/list',
        component: () => import('../views/Order/Orders'),
        props: true
      },
      {
        name: 'admin__order.edit',
        path: 'order/:orderId/edit',
        props: route => {
          return {
            orderId: Number(route.params.orderId)
          };
        },
        component: () => import('../views/Order/OrderEdit')
      },

      //= == ingredient SECTION ===
      {
        name: 'admin__brands',
        path: 'brand/list',
        component: () => import('../views/Brand/Brands'),
        props: true
      },
      {
        name: 'admin__brand.create',
        path: 'brand/create',
        component: () => import('../views/Brand/BrandCreate')
      }
    ]
  }
];

export default ADMIN_ROUTES;
