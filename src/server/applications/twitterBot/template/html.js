export default `
  <html>
    <head>
      <title>Twitter Bot</title>
      <meta content="initial-scale=1,maximum-scale=1,user-scalable=no,width=device-width" name="viewport">
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body {
          margin:0;
          background-color: #f1f1f1;
          font-family: sans-serif;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        *, 
        code {
          color: #4e4e4e;
        }
        article {
          padding: 50px 0;
        }
        form {
          width: 100%;
          margin: 0 auto;
          /*position: fixed;
          top:50%;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          -moz-transform:    translate(-50%, -50%);
          -ms-transform:     translate(-50%, -50%);
          -o-transform:      translate(-50%, -50%);
          transform:         translate(-50%, -50%);*/
        }
        h1 {
          font-size: 24px;
          margin:0;
        }
        p {
          margin:20px 0 25px;
          font-size: 14px;
        }
        code {
          font-size: 14px;
          background-color: white;
          display: block;
          padding: 5px 10px 10px;
        }
        b {
          font-size: 14px;
          line-height: 200%;
        }
        input,
        textarea {
          border-radius: 0;
          font-size: 16px;
          display: block;
          width: 100%;
          padding: 10px;
          border-width: 0;
          margin-bottom: 15px;
        }
        #page-wrap {
          max-width: 600px;
          margin: 0 auto;
        }
        textarea {
          height: 20vh;
          resize: none;
          text-align: left;
        }
        input[type="submit"] {
          cursor: pointer;
          color: white;
          background-color: #4e4e4e;
          -webkit-appearance: none;
          -webkit-border-radius: 0;
        }
        *:focus {
          outline: none;
        }
        #loading {
          display: none;
          position: fixed;
          top:0;
          left:0;
          height: 100%;
          width: 100%;
          background-color: rgba(255,255,255,0.95);
          text-align: center;
          color: white;
          font-size: 18px;
        }
        #loading img {
          position: relative;
          top:50%;
          margin-top: -82px;
        }
        .form-data {
          padding: 0 7.5px;
        }
        .form-data:first-child {
          padding-left: 0;
        }
        .form-data:nth-child(2) {
          padding-right: 0;
        }
        @media (max-width: 748px) {
          .form-data:first-child {
            padding: 0px;
          }
          .form-data:nth-child(2) {
            padding: 0px;
          }
          body {
            padding-bottom: 100px;
          }
        }
      </style>
    </head>
    <body>
      <div id="page-wrap" class="container">
        <article>
          <h1>Tweet Generator</h1>
          <p>
            Enter a Twitter screen name and generate a single tweet.
            This uses the Twitter API to read all tweets on an account then processes
            each through the Markov chain algorithm. More data (tweets) produces better results.
            We recommend using on an account with at least 2,000 tweets.
            Twitter accounts with very few tweets will return exact tweets the account has previously posted.
          </p>
          <code>
            <b>Markov chain</b>
            <br/>
            A stochastic model describing a sequence of possible events in which the probability of each event depends only on the state attained in the previous event.
          </code>
        </article>
        <form
          id="main-form"
        >
          <div class="form-data col-xs-12 col-sm-6">
            <input
              placeholder="screen name"
              id="main-input"
              type="text"
            />
          </div>
          <div class="form-data col-xs-12 col-sm-6">
            <input 
              type="submit"
              value="submit"
            />
          </div>
          <textarea
            placeholder="result"
            id="result"
          ></textarea>
        </form>
      </div>
      <div id="loading">
        <img 
          src="http://i.imgur.com/chnAKoR.gif"
        />
      </div>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
      ></script>
      <script 
        src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js"
      ></script>
      <script>

        var socket = io()
        var form = $('#main-form')
        var input = $('#main-input')
        var loader = $('#loading')
        var result = $('#result')

        function error() {
          loader.fadeOut()
          result.val('error')
        }

        form.on('submit', function(event) {
          event.preventDefault()
          input.blur()
          var value = input.val()  
          if(value.length > 0) {
            loader.fadeIn()
            socket.emit('twitterBot/createPost', {
              screen_name: input.val()
            });
          }
        })

        socket.on('twitterBot/createPost/error', error);

        socket.on('twitterBot/createPost/complete', function(data) {
          if(data.sentence.length > 0) {
            loader.fadeOut()
            result.val(data.sentence)
          }
          else {
            error()
          }
        });

        input.focus()

      </script>
    </body>
  </html>
`;
