import App from './App.vue';

//import Playlists from './components/Playlists.vue';

const Playlists = resolve => {
    require.ensure(['./components/Playlists.vue'], () => {
        resolve(require('./components/Playlists.vue'));
    }, 'playlists')
}

const PlaylistDetails = resolve => {
    require.ensure(['./components/PlaylistDetails.vue'], () => {
        resolve(require('./components/PlaylistDetails.vue'));
    }, 'playlists')
}

const MoodNavigation = resolve => {
    require.ensure(['./components/MoodNavigation.vue'], () => {
        resolve(require('./components/MoodNavigation.vue'));
    }, 'mood_navigation')
}

const Nav = resolve => {
    require.ensure(['./components/Nav.vue'], () => {
        resolve(require('./components/Nav.vue'));
    }, 'nav')
}

const Charts = resolve => {
    require.ensure(['./components/Charts.vue'], () => {
        resolve(require('./components/Charts.vue'));
    }, 'charts')
}

const NewReleases = resolve => {
    require.ensure(['./components/NewReleases.vue'], () => {
        resolve(require('./components/NewReleases.vue'));
    }, 'new-releases')
}

const NewReleasesDetails = resolve => {
    require.ensure(['./components/NewReleasesDetails.vue'], () => {
        resolve(require('./components/NewReleasesDetails.vue'));
    }, 'new-releases')
}

export const routes = [
    {
        path: '', default: App, components: {
            default:MoodNavigation, 
            'navigation': Nav
        }, props: true
    },
    {
        path: '/charts', components: { default: Charts,'navigation': Nav}, props: true
    },
    {
        path: '/new-releases', components: { default:NewReleases, 'navigation': Nav} , props: true
    },
    {
        path: '/new-releases/:releaseId', component: NewReleasesDetails, props: true
    },             
    {
        path: '/categories/:id/playlists', props: true, name: "playlists", component: Playlists,
    },
    { path: '/categories/:id/details/:detailsId', component: PlaylistDetails, props: true, beforeEnter: (to, from, next) => {
        next();
    }
    },
    { 
        path: '*', 
        redirect: '/'
    }
]