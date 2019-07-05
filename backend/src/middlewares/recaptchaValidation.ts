import fetch from 'node-fetch';

const validateRecaptcha = () => {
  return (req: any, res: any, next: any) => {
    const secretKey = process.env.GOOGLE_RECAPTCHA_SECRET_KEY || null;
    if (!secretKey) {
      return next();
    }
    const token = req.body.recaptcha;
    fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, { method: 'POST' })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          return next();
        } else {
          return res.status(400).send('Bots are not welcome.');
        }
      });
  };
};

export default validateRecaptcha;
