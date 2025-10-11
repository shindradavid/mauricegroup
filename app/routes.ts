import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('./components/RootLayout/index.tsx', [
    index('./pages/HomePage/index.tsx'),
    route('/events', './pages/EventsPage/index.tsx'),
    route('/events/categories/:slug', './pages/EventCategoryDetailsPage/index.tsx'),
    route('/events/photos/:slug', './pages/EventPhotoDetailsPage/index.tsx'),
    route('/cakes', './pages/CakesPage/index.tsx'),
    route('/cakes/categories', './pages/CakeCategoriesPage/index.tsx'),
    route('/cakes/categories/:slug', './pages/CakeCategoryDetailsPage/index.tsx'),
    route('/baking-school', './pages/BakingSchoolPage/index.tsx'),
    route('/feedbacks', './pages/FeedbacksPage/index.tsx'),
  ]),
  layout('./components/SecondaryLayout/index.tsx', [
    route('/cakes/custom-order', './pages/CustomOrderPage/index.tsx'),
    route('/cakes/:cakeId', './pages/CakeDetailsPage/index.tsx'),
    route('/my-orders', './pages/MyOrdersPage/index.tsx'),
    route('/my-orders/:id', './pages/CakeOrderDetailsPage/index.tsx'),
  ]),
] satisfies RouteConfig;
