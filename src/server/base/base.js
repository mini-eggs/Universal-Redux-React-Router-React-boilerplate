// @flow

export default `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta content="initial-scale=1,maximum-scale=1,user-scalable=no,width=device-width" name="viewport">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="google-site-verification" content="SkfcZ85-zmM2yiIU3nfbnsNBdVORGaRNfeY_4M3dsmI" />
      <title>Evan Jones</title>
      <link rel="icon" href="http://evanjones.xyz/evansapps.ico?v=1.1.0">
      <link href="/styles/bundle.css" rel="stylesheet" />
    </head>
    <body>
      <div id="root">{{HTML}}</div>
      <script>
        window.__PRELOADED_STATE__ = {{STATE}}
      </script>
      <script defer src="/scripts/bundle.js"></script>
    </body>
  </html>
`;
