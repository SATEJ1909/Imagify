
import assets from '../assets/assets'

const Footer = () => {
  return (
    <footer className='py-12'>
      <div className='flex flex-col items-center gap-4'>
        <img src={assets.logo} alt='' width={150} />
        <div className='flex gap-3'>
          <img src={assets.facebook_icon} alt='' width={28}/>
          <img src={assets.twitter_icon} alt='' width={28}/>
          <img src={assets.instagram_icon} alt='' width={28}/>
        </div>
        <p className='text-sm text-gray-500'>© {new Date().getFullYear()} Satej.dev — All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
