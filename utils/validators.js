import Joi from 'joi';

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateProfileUpdate = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3),
    email: Joi.string().email(),
    password: Joi.string().min(6),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateGetAllCategories = (req, res, next) => {
  next(); 
};

export const validateGetQuestionsByCategory = (req, res, next) => {
  const schema = Joi.object({
    categoryId: Joi.string().hex().length(24).required(),
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
