import assets from "../assets/assets"
import {motion} from 'framer-motion'
const Description = () => {
  return (
    <motion.section 
    initial={{opacity:0.2 , y : 100}}
    transition={{duration : 1}}
    whileInView={{opacity : 1 ,  y : 0}}
    viewport={{once : true}}
    
    className="my-24">
       <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold">Create AI images</h2>
          <p className="text-gray-500 text-lg mt-2">Turn your imagination into visual art in seconds</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img src={assets.sample_img_1} alt=""  className="w-full max-w-xl rounded-xl shadow-sm"/>

        <div>
            <h3 className="text-2xl font-semibold mb-3">Introducing the future of image creation</h3>
            <p className="text-gray-600 mb-4">Unleash your imagination like never before with the power of AI. Whether you're dreaming up fantasy worlds, futuristic cities, or surreal concepts, our AI transforms your words into stunning visual art within seconds. No design skills needed — just type your idea, and watch as creativity meets technology to bring your vision to life.</p>

            <p className="text-gray-600">From playful sketches to breathtaking masterpieces, your imagination is the only limit. Let your thoughts take form and experience the magic of instant artistic expression.</p>
        </div>
       </div>
    </motion.section>
  )
}

export default Description
