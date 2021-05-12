import app from './modules/app';

const port = process.env.PORT || 3090;
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;