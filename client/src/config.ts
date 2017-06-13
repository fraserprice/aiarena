const production_settings = {
  hostname: 'https://ai-fights.herokuapp.com'
}

const dev_settings = {
  hostname: 'http://localhost:3000'
}

function Config() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return production_settings;
    default:
      return dev_settings;
  }
}

export default Config;
