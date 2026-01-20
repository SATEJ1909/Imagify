
import { stepsData } from '../assets/assets'
import {motion} from 'framer-motion'

const Steps = () => {
  return (
    <motion.section 
    initial={{opacity:0.2 , y : 100}}
    transition={{duration : 1}}
    whileInView={{opacity : 1 ,  y : 0}}
    viewport={{once : true}}
    
    className='my-24'>
      <div className='text-center mb-10'>
        <h2 className='text-3xl sm:text-4xl font-semibold'>How it works</h2>
        <p className='text-lg text-gray-500 mt-2'>Transform words into images</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
         {stepsData.map((item , index) =>(
          <div key={index}  className='flex items-start gap-4 p-6 bg-white rounded-xl border shadow-sm hover:shadow-md transition-all'>
            <img src={item.icon} alt='' className='w-10 h-10'/>
            <div>
              <h3 className='text-lg font-medium'>{item.title}</h3>
              <p className='text-gray-600 mt-1'>{item.description}</p>
            </div>
          </div>
         ))}
      </div>
    </motion.section>
  )
}

export default Steps
