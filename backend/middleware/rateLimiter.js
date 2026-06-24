// import { ratelimiter } from '../config/upstash.js'

// const rateLimiter = async (req, res, next) => {
//   try {
//     // const ip = req.ip; // Get client's IP address
//     // Limit the number of requests for the client's IP address
//     const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

//     const { success } = await ratelimiter.limit(ip)
    
//     res.set
//     if (!success) {
//       return res.status(429).json({ 
//         message: "Too many requests. Try again later." 
//       })
//     }
//     next();
    
//   } catch (error) {
//     console.log("Rate limit error", error)
//     next(error)
//   }
// }

// export default rateLimiter;


import { ratelimiter } from '../config/upstash.js'

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log("Rate limiter running for IP:", ip);
    
    const { success, remaining } = await ratelimiter.limit(ip);
    console.log("Success:", success, "Remaining:", remaining);
    
    if (!success) {
      return res.status(429).json({ 
        message: "Too many requests. Try again later." 
      });
    }
    next();
    
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
}
export default rateLimiter;



// const rateLimit = async (req, res, next) => {
//     try {
//         const ip = req.ip;
//         const now = Date.now();
//         const windowTime = 60 * 1000; // 1 minute
//         const maxRequests = 100; // Max requests per window
//         if (!global.rateLimitStore) {
//             global.rateLimitStore = {};
//         } else {
//             // Clean up old entries
//             for (const key in global.rateLimitStore) {
//                 if (global.rateLimitStore[key].timestamp + windowTime < now) {
//                     delete global.rateLimitStore[key];
//                 }
//             }
//         }
//         next();
//     } catch (error) {
//         console.error('Rate limiting error:', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };

// export default rateLimit;