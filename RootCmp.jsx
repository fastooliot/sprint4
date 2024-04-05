const Router = ReactRouterDOM.HashRouter
const {Route, Routes} = ReactRouterDOM
const {useState, useEffect} = React

import { AppNav } from './cmps/AppNav.jsx'
// import { Home } from './pages/Home.jsx'
// import { User } from './pages/User.jsx'
// import { Notifications } from './pages/Notifications.jsx'
// import { UserProfile } from './pages/UserProfile.jsx'
// import { Messages } from './pages/Messages.jsx'
// import { Reels } from './pages/Reels.jsx'
// import { Explore} from './pages/Explore.jsx'

export function RootCmp() {
    const userLoggedIn = useState(false)

    return <Router>
        <section className='app main-layout'>
            <AppNav />
        </section>
    </Router>    
}