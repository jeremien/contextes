module.exports = {
    servers: {
      one: {
        // TODO: set host address, username, and authentication method
        host: '51.75.140.117',
        username: 'root',
        password: 'MCJ2gYfi'
        // pem: '/home/jeremie/.ssh/id_rsa',
        // opts: {
        //   port: 54678
        // }
        // password: 'server-password'
        // or neither for authenticate from ssh-agent
      }
    },
  
    app: {
      // TODO: change app name and path
      name: 'contextes',
      path: '../',
       // pour stocker les images
  
      //  volumes:{
      //   '/srv/contexte/data/images':'/srv/contexte/data/images'
      // },
  
      // deployCheckPort: 3000,
  
  
      servers: {
        one: {},
      },
  
      docker: {
        buildInstructions: [
          'RUN apt-get update && apt-get install -y graphicsmagick'
        ]
      },
  
      buildOptions: {
        serverOnly: true,
        
      },
      // stopAppDuringPrepareBundle: true,
     
      env: {
        // TODO: Change to your app's url
        // If you are using ssl, it needs to start with https://
        ROOT_URL: 'http://vps615848.ovh.net',
        MONGO_URL: 'mongodb://mongodb/meteor',
        MONGO_OPLOG_URL: 'mongodb://mongodb/local',
        PORT: 80
      },
  
      docker: {
        // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
        // image: 'abernix/meteord:node-8.4.0-base',
        // image: "joshjoe/meteor-graphicsmagick",
        // image: 'appworkshop/meteord-graphicsmagick-pdftk-node8:node-8.8.1-base',
        image: 'appworkshop/meteord-graphicsmagick-pdftk-node8:node-8.11.4-base',
      },
  
      // Show progress bar while uploading bundle to server
      // You might need to disable it on CI servers
      enableUploadProgressBar: true
    },
  
    mongo: {
      version: '3.4.1',
      servers: {
        one: {}
      }
    },
  
    // (Optional)
    // Use the proxy to setup ssl or to route requests to the correct
    // app when there are several apps
  
    // proxy: {
    //   domains: 'mywebsite.com,www.mywebsite.com',
  
    //   ssl: {
    //     // Enable Let's Encrypt
    //     letsEncryptEmail: 'email@domain.com'
    //   }
    // }
  };