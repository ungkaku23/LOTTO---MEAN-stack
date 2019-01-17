// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // base_url: 'http://192.168.1.107:8080/',
  base_url: 'http://localhost:8080/',
  google_clientid: '363541439930-acoosdllh05c7fd4rc6u6huc59jakpuk.apps.googleusercontent.com',
  google_secret: 'jl056qpNyMN2vmhuDTWxNYEu',

  facebook_appid: '211038032904091',

  firebaseConfig: {
      apiKey: "AIzaSyAaj0ctZZok5d2AntGTF_L0k9_yrlaw8n0",
      authDomain: "loto-twitter-auth.firebaseapp.com",
      databaseURL: "https://loto-twitter-auth.firebaseio.com",
      projectId: "loto-twitter-auth",
      storageBucket: "loto-twitter-auth.appspot.com",
      messagingSenderId: "554537201299"
  },
  /*timeleft_socket_server: 'http://192.168.1.107:3000',
  lottery_result_socket_server: 'http://192.168.1.107:3001'*/

  timeleft_socket_server: 'http://localhost:3000',
  lottery_result_socket_server: 'http://localhost:3001'
};
