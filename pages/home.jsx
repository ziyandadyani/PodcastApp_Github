import { Route, Routes } from 'react-router-dom';
import { PlayerProvider } from '../../Context/PlayerProvider';
import TopNav from '../../Components/Nav/TopNav';
import BottomNav from '../../Components/Nav/BottomNav';
import EpisodePlayer from '../../Components/Nav/EpisodePlayer';
import ShowList from '../../Components/ShowList/ShowList';
import EpisodeList from '../../Components/EpisodeList/EpisodeList'
import Favourites from '../Favourites/Favourites';
import Recents from '../recents/recents'
import ConfirmClosePage from '../ConfirmClosePage/ConfirmClosePage'

const Home = () => {
  return (
    <PlayerProvider>
      <TopNav />
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/:showId/episodes" element={<EpisodeList />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/recents" element={<Recents />} />
      </Routes>
      <EpisodePlayer />
      <BottomNav />
      <ConfirmClosePage />
    </PlayerProvider>
  );
}

export default Home