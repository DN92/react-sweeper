const router = require("express").Router();

module.exports = router;

//  custom middleware puts user model instance on all api requests via JWT token. used by 'next' routes as req.user
// router.use(async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     const user = await User.findByToken(token);
//     if(user) {
//       req.user = user;
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
