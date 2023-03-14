import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Select from '@radix-ui/react-select';
import { Input } from './Form/Input';
import { Check, GameController } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

interface Game {
  id: string,
  title: string,
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays ] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel ] = useState(false)

  
  useEffect(() => {
    axios('http://localhost:3000/games')
    .then((res) => {
      setGames(res.data);
    })
    },[])
    
  const handleCreatedAd = async (event: FormEvent) => {
    event.preventDefault();
    
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log({data})
    if(!data.announcement_name){
      return
    }
    try{
      await axios
        .post (`http://localhost:3000/games/${data.announcement_fk_game_id}/ads`, {
          announcement_name: data.announcement_name,
          announcement_week_days: weekDays.map(Number),
          announcement_voice_channel: useVoiceChannel,
          announcement_yers_paying: Number(data.announcement_yers_paying),
          announcement_hour_start: data.announcement_hour_start,
          announcement_hour_end: data.announcement_hour_end,
          announcement_discord: data.announcement_discord
        })
        toast('Anuncio criado com sucesso');

    }catch (err) {
      toast("Erro ao criar Anuncio ")
    }
  }


    return(
        <Dialog.Portal>
          <ToastContainer />
          <Dialog.Overlay className="bg-black/60 inset-0 fixed">
            <Dialog.Content className="fixed 
            bg-[#2A2634] py-8 px-10 
            text-white top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 
            rounded-lg w-[480px] ">
              <Dialog.Title className="text-3xl font-black">Publique um Anúncio</Dialog.Title>
              <form onSubmit={handleCreatedAd} className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="announcement_fk_game_id" className="font-semibold">Qual o game?</label>
                  <select
                    className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                     id="announcement_fk_game_id" 
                     name="announcement_fk_game_id"
                    defaultValue=""
                  >
                    <option >Selecione qual o game que deseja jogar</option>

                    {games.map(game => {
                      return(
                        <option key={game.id} value={game.id}>{game.title}</option>
                      )
                    })}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="announcement_name">Seu nome (ou nickname)</label>
                  <Input name="announcement_name" id="announcement_name" placeholder="Qual seu nome dentro do game?"/>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="announcement_yers_paying">Joga a quantos anos?</label>
                    <Input name="announcement_yers_paying" id="announcement_yers_paying" type="number" placeholder="Tudo bem ser zero ou nuub"/>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="announcement_discord">Qual o seu Discord?</label>
                    <Input name="announcement_discord" id="announcement_discord" type="text" placeholder="Usuario#0000"/>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="announcement_week_days">Quais dias você costuma jogar?</label>
                   
                      <ToggleGroup.Root 
                        type="multiple" 
                        className="grid grid-cols-4 gap-2"
                        value={weekDays}
                        onValueChange={setWeekDays}
                        >
                      <ToggleGroup.Item
                        value="0"
                        className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes("0") ? 'bg-violet-700' : ''}`}
                        title="Domingo"
                       >D</ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="1"
                        className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes("1") ? 'bg-violet-700' : ''}`}
                        title="Segunda"
                       >S</ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="2"
                        className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes("2") ? 'bg-violet-700' : ''}`}
                        title="Terça">T
                       </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="3"
                        className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes("3") ? 'bg-violet-700' : ''}`}
                        title="Quarta">
                        Q</ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="4"
                        className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes("4") ? 'bg-violet-700' : ''}`}
                        title="Quinta">
                        Q</ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="5"
                        className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes("5") ? 'bg-violet-700' : ''}`}
                        title="Sexta">S
                       </ToggleGroup.Item>
                      <ToggleGroup.Item
                        value="6"
                        className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes("6") ? 'bg-violet-700' : ''}`}
                        title="Sabádo">
                        S</ToggleGroup.Item>
                      </ToggleGroup.Root>
                  </div>
                  <div className="flex flex-col gap-2" flex-1>
                    <label htmlFor="announcement_hour_start">Qual o horário do dia?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input name="announcement_hour_start" id="announcement_hour_start" type="time" placeholder="De"/>
                      <Input name="announcement_hour_end" id="announcement_hour_end" type="time" placeholder="Até"/>
                    </div>
                  </div>
                </div>

                <label className="mt-2 flex items-center gap-2 text-sm">
                  <Checkbox.Root 
                    className="w-6 h-6 p-1 rounded bg-zinc-900"
                    checked={useVoiceChannel}
                    onCheckedChange={(checked) => {
                      if(checked === true){
                        setUseVoiceChannel(true)
                      }else{
                        setUseVoiceChannel(false)
                      }
                    }}
                    >
                    <Checkbox.Indicator>
                      <Check className="w-4 h-4 text-emerald-400"/>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  Costumo me conectar ao chat de voz
                </label>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close 
                    className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                  >
                    Cancelar
                  </Dialog.Close>
                  <button 
                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600" 
                    type="submit"
                  >
                    <GameController className="w-6 h-6"/>
                    Encontrar Duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
    );
}