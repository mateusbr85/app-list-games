import React from 'react';
import { BannerAnouncement } from './BannerAnouncement';

interface GameBannerProps {
    bannerUrl: string,
    title: string,
    amountAds: number,
}

const openBanneAnouncement = () => {

}

export function GameBanner (props: GameBannerProps) {
    return(
      <>
          <a className="relative rounded-lg overflow-hidden">
            <img src={props.bannerUrl} alt=""/>

            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
              <strong className="font-bold text-white block">{props.title}</strong>
              <span className="text-zinc-300 text-sm block">{props.amountAds} anúncios</span>
              <button className="bg-violet-900 rounded w-32 mt-2 text-white ">Abrir Anúncios</button>
            </div>

          </a>
      </>
    )
}