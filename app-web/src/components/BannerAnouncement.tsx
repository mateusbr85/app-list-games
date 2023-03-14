import React from "react"
import { MagnifyingGlassPlus } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog';

export function BannerAnouncement () {
    return(
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed">
            <Dialog.Content className="fixed 
            bg-[#2A2634] py-8 px-10 
            text-white top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 
            rounded-lg w-[480px] ">
              <Dialog.Title className="text-3xl font-black">Anuncios Existentes</Dialog.Title>
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
                    Encontrar Duo
                  </button>
                </footer>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
    )
}