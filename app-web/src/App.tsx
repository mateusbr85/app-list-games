import './styles/main.css';
import logoImg from '@/assets/logo-nlw-esport.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import React, {useState, useEffect} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from 'phosphor-react';
import { Input } from './components/Form/Input';
import { CreateAdModal } from './components/CreateAdModal';
import 'react-toastify/dist/ReactToastify.css';
import { BannerAnouncement } from './components/BannerAnouncement';


interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    announcements: number;
  }
}


function App() {
  const [games, setGames] = useState<Game[]>([])


  useEffect(() => {
    fetch('http://localhost:3000/games')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setGames(data);
      })
  },[])

  const renderBanner = () => {
    return(
      games.map(game => {   
        return(
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl} 
            title={game.title} 
            amountAds={game._count.announcements}
          />   
        )
      })
    )
  }

  return (<>
    <div className="max-w-[1260px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="Imagem de logo da pagina"/>

      <h1 className="text-6xl text-white font-black mt-20">Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.</h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {renderBanner()}
      </div>
      <Dialog.Root>
        <CreateAdBanner/>
        <CreateAdModal/>
      </Dialog.Root>
    </div>
  </>)
}

export default App
