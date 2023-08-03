import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HistoryIcon from '@mui/icons-material/History';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const BottomNav = () => {
  const navigate = useNavigate()

  return (
    <nav className="fixed max-w-screen -bottom-0 -left-0 -right-0 h-10 flex justify-around bg-white z-10">
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIcon className="text-xl" />
        </Button>
        <Button onClick={() => navigate('/recents')}>
          <HistoryIcon className="text-xl" />
        </Button>
        <Button onClick={() => navigate('/favourites')}>
          <StarBorderIcon className="text-xl" />
        </Button>
    </nav>
  );
}

export default BottomNav