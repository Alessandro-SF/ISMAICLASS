import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Events from './pages/Events.jsx'
import EventDetail from './pages/EventDetail.jsx'
import Results from './pages/Results.jsx'
import Fighters from './pages/Fighters.jsx'
import FighterProfile from './pages/FighterProfile.jsx'
import Compare from './pages/Compare.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="upcoming" element={<Events mode="upcoming" />} />
        <Route path="results" element={<Results />} />
        <Route path="events/:eventId" element={<EventDetail />} />
        <Route path="fighters" element={<Fighters />} />
        <Route path="fighters/:slug" element={<FighterProfile />} />
        <Route path="compare" element={<Compare />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
