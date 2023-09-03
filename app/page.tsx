import Board from '@/components/Board'
import Header from '@/components/Header'
import Image from 'next/image'



// even in the components folder each file is taken as the server components 
export default function Home() {
  return (
    <main className="">
     {/* Header  */}
      <Header/>
      
     {/* Board  */}
     <Board />
    </main>
  )
}
