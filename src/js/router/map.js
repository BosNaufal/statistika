
/**
  Refs:
  - https://github.com/reactjs/react-router/issues/2779
  - https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md
*/

const routes = {

  path: '/',
  component: require('../pages/App.js').default,
  indexRoute: {
    component: require('../pages/Home/').default
  },

  childRoutes: [
    {
      path: 'jarak-tunggal',
      component: require('../pages/Jarak/').default,
    },
    {
      path: 'jarak-kelompok',
      component: require('../pages/Jarak/Kelompok').default,
    },
    {
      path: 'kuartil-tunggal',
      component: require('../pages/Kuartil/').default,
    },
    {
      path: 'simpangan-tunggal',
      component: require('../pages/Simpangan/').default,
    },
    {
      path: 'simpangan-kelompok',
      component: require('../pages/Simpangan/Kelompok').default,
    },
    {
      path: 'mean-tunggal',
      component: require('../pages/Mean/').default,
    },
    {
      path: 'mean-kelompok',
      component: require('../pages/Mean/Kelompok.js').default,
    },
    {
      path: 'agregratif-sederhana',
      component: require('../pages/AngkaIndeks/').default,
    },
    {
      path: 'tabel-hitung',
      component: require('../pages/TabelHitung/').default,
    },
  ]

}

export default routes
