import JtockAuth from 'j-tockauth'

const Authentication = new JtockAuth({
    host: "http://localhost:3001",
    prefixUrl: "/api",
    debug: false
  });

export default Authentication