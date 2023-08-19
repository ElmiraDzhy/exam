const yup = require('yup');

module.exports.registrationSchem = yup.object().shape({
  firstName: yup.string().required().min(1),
  lastName: yup.string().required().min(1),
  displayName: yup.string().required().min(1),
  email: yup.string().email().required().min(4),
  password: yup.string().required().min(1),
  role: yup.string().matches(/(customer|creator)/).required(),
});

module.exports.loginSchem = yup.object().shape({
  email: yup.string().email().required().min(4),
  password: yup.string().required().min(1),
});

module.exports.contestSchem = yup.object().shape({
  contestType: yup.string().matches(/(name|logo|tagline)/).required(),
  fileName: yup.string(),
  originalFileName: yup.string(),
  title: yup.string().required(),
  typeOfName: yup.string(),
  industry: yup.string().required(),
  focusOfWork: yup.string().required(),
  targetCustomer: yup.string().required(),
  styleName: yup.string(),
  nameVenture: yup.string().nullable(),
  typeOfTagline: yup.string(),
  brandStyle: yup.string(),
});


