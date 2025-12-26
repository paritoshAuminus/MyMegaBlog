import {  useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CgNotes } from 'react-icons/cg'
import { FaNoteSticky } from 'react-icons/fa6'
import authService from '../auth/auth'
import { useEffect } from 'react'

function Home() {
  const status = useSelector((state) => state.auth.status)

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center" bis_skin_checked="1">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center" bis_skin_checked="1">
          <h1 className="title-font sm:text-3xl text-xl mb-4 font-medium text-gray-900">Capture Ideas. Organize Life. Remember
            <br className="hidden lg:inline-block" /><span className='text-blue-800'>Everything</span>
          </h1>
          <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
          <div className="flex justify-center"> 
            <Link to={`${status ? '/mynotes' : '/signup' }`} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">{status ? 'MyNotes' : 'Signup'}</Link>
          </div>
        </div>
        <div className="relative lg:max-w-lg lg:w-full md:w-1/2 w-5/6 text-blue-800 flex justify-center items-center text-9xl">
          <CgNotes />
          <FaNoteSticky className='absolute top-8 right-28'/>
        </div>
      </div>
    </section>

  )
}

export default Home