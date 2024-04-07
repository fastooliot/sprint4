const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { useState, useEffect } = React

import { AppNav } from './cmps/AppNav.jsx'
import { StoryIndex } from './pages/StoryIndex.jsx'
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

            <main className="full main-layout">
                <Routes>
                    <Route path="/" element={<StoryIndex />} />
                </Routes>
            </main>
        </section>
    </Router>
}