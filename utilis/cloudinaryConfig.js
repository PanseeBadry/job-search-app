import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dqjbcahpr', 
  api_key: '898329723329867', 
  api_secret: process.env.API_SECRET 
});

export default cloudinary