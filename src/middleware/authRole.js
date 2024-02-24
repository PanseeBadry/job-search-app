//middleware to check the Role of the person who logged wether it's User or CompanyHR 

export const authRole = (requiredRole) => (req, res, next) => {
    const { role } = req.user; 
  
    if (role !== requiredRole) {
      return res.json({ error: 'Unauthorized. Insufficient permissions.' });
    }
    next();
  };
