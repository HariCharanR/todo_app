'use client'
import { useBoardStore } from '@/store/BoardStore'
import fetchSuggestion from '@/utils/fetchSuggestion'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'

function Header() {
    const [board,searchString , setSearchString] = useBoardStore(state => [state.board,state.searchString , state.setSs]);

    const [loading , setLoading] = useState<boolean>(false);
    const [suggestion , setSuggestion] = useState<string>("");


    useEffect(()=>{

        if(board.columns.size === 0) return;
        // setLoading(true);

        // const fetchSuggestionFunc = async () => {
        //     // const sug = await fetchSuggestion(board);
        //     // setSuggestion(sug);
        //     setLoading(false);
        // };

        // fetchSuggestionFunc();
    },[board]);

    return (
        <header>

            <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">

                <div className='absolute top-0 left-0 w-full h-96  bg-gradient-to-br from-red-500 to-blue-400 rounded-md filter blur-3xl opacity-50 -z-50' />
                <Image src="https://links.papareact.com/c2cdd5" alt='Trello based todo app'
                    width={300}
                    height={100}
                    className='w-64 md:w-56 pb-10 md:pb-0 object-contain'
                />

                {/* Search Box */}
                <div className="flex items-center space-x-5 flex-1 justify-end w-full  ">
                    <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
                        <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
                        <input type="text" placeholder='search' className='flex-1 outline-none p-2' 
                        value={searchString}
                        onChange={e=> setSearchString(e.target.value)}/>
                        <button type="submit" hidden> Search</button>
                    </form>

                    {/* Avatar */}
                    <Avatar name="Haricharan" round size="50" color="#0055D1"  />
                </div>



            </div>
            <div className="flex items-center justify-center px-5 md:py-5 ">
                {/* <p className='flex items-center p-5 text-sm font-light pr-5 shadow-xl bg-white rounded-md'>
                    <UserCircleIcon className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${loading && "animate-spin"} `}  />
                    {suggestion && !loading ? suggestion : "GPT is summerising your todos "}
                </p> */}
            </div>

        </header>
    )
}

export default Header