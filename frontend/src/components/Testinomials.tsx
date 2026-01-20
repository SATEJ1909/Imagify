import assets, { testimonialsData } from "../assets/assets"

import {motion} from 'framer-motion'

const Testinomials = () => {
  return (
    <motion.section 
    initial={{opacity:0.2 , y : 100}}
    transition={{duration : 1}}
    whileInView={{opacity : 1 ,  y : 0}}
    viewport={{once : true}}
    
    className="my-24">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold">What users say</h2>
        <p className="text-gray-500 mt-2">Real stories from our community</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonialsData.map((testinomial , index)=>(
                <div key={index} className="bg-white p-8 rounded-xl border shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col items-center text-center">
                        <img src={testinomial.image} alt="" className="rounded-full w-14 h-14 object-cover"  />
                        <h3 className="mt-2 font-semibold">{testinomial.name}</h3>
                        <p className="text-gray-500 mb-3 text-sm">{testinomial.role}</p>
                        <div className="flex mb-3">
                            {Array(testinomial.stars).fill(0).map((_, i) =>(
                                <img key={i} src={assets.rating_star} alt="" />
                            ))}
                        </div>
                        <p className="text-gray-600 text-sm">{testinomial.text}</p>
                    </div>
                </div>
        ))}
      </div>
    </motion.section>
  )
}

export default Testinomials
