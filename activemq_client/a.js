//import { send } from 'process';

const stompit = require('stompit');
const { getEnvironmentData } = require('worker_threads');

var connectParams = {
                      host: 'localhost',
                      port: 61613,
                      connectHeaders:{
                          host: 'localhost',
                          login: 'admin',
                          passcode: 'password'
                      }
                    };


function sendMessage(queueName, sender, message){
  
  stompit.connect(connectParams, function(error, client){
    
    if(error){
        console.log('Unable to connect: ' + error.message);
        return;
    }
    
    var sendParams = {
        'destination': '/queue/' + queueName,
        'content-type': 'application/json'
    };
    
    var frame = client.send(sendParams);
    
    frame.end(JSON.stringify({
        sender: sender,
        message: message
    }));
    
    client.disconnect(function(error){
        if(error){
            console.log('Error while disconnecting: ' + error.message);
            return;
        }
        console.log('Sent message');
    });
});

}

function receiveMessage(queueName){
  var connectParams = {
    host: 'localhost',
    port: 61613,
    connectHeaders:{
        host: 'localhost',
        login: 'admin',
        passcode: 'password'
    }
  };

  stompit.connect(connectParams, function(error, client){
    
    if(error){
        console.log('Unable to connect: ' + error.message);
        return;
    }
    
    var subscribeParams = {
       'destination': '/queue/'+queueName,
       'ack': 'client-individual'
    };
    
    var consuming = false;
    
    client.subscribe(subscribeParams, function(error, message){
        
        // Don't consume more than one message
        if(consuming){
            return;
        }
        
        consuming = true;
        
        var read = function(){
            var chunk;
            while(null !== (chunk = message.read())){
                process.stdout.write(chunk);
                console.log(chunk);
            }
        };
        
        message.on('readable', read);
        
        message.on('end', function(){
            client.ack(message);
            client.disconnect();
            console.log("Disconnect")
        });
    });
  });
}


//Test

sendMessage("test1", "Diego", "hola");
console.log("Enviado");
receiveMessage("test1");