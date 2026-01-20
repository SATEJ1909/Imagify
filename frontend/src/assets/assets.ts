import logo from './logo.svg';
import logo_icon from './logo_icon.svg';
import facebook_icon from './facebook_icon.svg';
import instagram_icon from './instagram_icon.svg';
import twitter_icon from './twitter_icon.svg';
import star_icon from './star_icon.svg';
import rating_star from './rating_star.svg';
import sample_img_1 from './sample_img_1.png';
import sample_img_2 from './sample_img_2.png';
import profile_img_1 from './profile_img_1.png';
import profile_img_2 from './profile_img_2.png';
import step_icon_1 from './step_icon_1.svg';
import step_icon_2 from './step_icon_2.svg';
import step_icon_3 from './step_icon_3.svg';
import email_icon from './email_icon.svg';
import lock_icon from './lock_icon.svg';
import cross_icon from './cross_icon.svg';
import star_group from './star_group.png';
import credit_star from './credit_star.svg';
import profile_icon from './profile_icon.png';

const assets = {
  logo,
  logo_icon,
  facebook_icon,
  instagram_icon,
  twitter_icon,
  star_icon,
  rating_star,
  sample_img_1,
  sample_img_2,
  email_icon,
  lock_icon,
  cross_icon,
  star_group,
  credit_star,
  profile_icon,
};

export default assets;

export const stepsData = [
  {
    title: 'Describe Your Vision',
    description:
      'Type a phrase, sentence, or paragraph that describes the image you want to create.',
    icon: step_icon_1,
  },
  {
    title: 'Watch the Magic',
    description:
      'Our AI-powered engine will transform your text into a high-quality, unique image in seconds.',
    icon: step_icon_2,
  },
  {
    title: 'Download & Share',
    description:
      'Instantly download your creation or share it with the world directly from our platform.',
    icon: step_icon_3,
  },
];

export const testimonialsData = [
  {
    image: profile_img_1,
    name: 'Sarah Johnson',
    role: 'Digital Marketer',
    stars: 5,
    text: `Imaginetix has completely transformed my content creation workflow. I can now generate stunning visuals for my campaigns in seconds instead of hours. The quality is outstanding!`,
  },
  {
    image: profile_img_2,
    name: 'Michael Chen',
    role: 'Indie Game Developer',
    stars: 5,
    text: `As a solo developer, I needed quick concept art for my game. Imaginetix delivers exactly what I envision every time. It's like having a professional artist on demand.`,
  },
  {
    image: profile_img_1,
    name: 'Emily Rodriguez',
    role: 'Content Creator',
    stars: 5,
    text: `The variety of styles available is amazing! Whether I need realistic photos or anime-style artwork, Imaginetix handles it beautifully. My followers love the unique content.`,
  },
];

export const plans = [
  {
    id: 'Basic',
    price: 99,
    credits: 100,
    desc: 'Perfect for trying out AI image generation.',
  },
  {
    id: 'Advanced',
    price: 449,
    credits: 500,
    desc: 'Great for regular creators and small projects.',
  },
  {
    id: 'Business',
    price: 1999,
    credits: 5000,
    desc: 'Best value for professionals and teams.',
  },
];