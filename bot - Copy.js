var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

const Eris = require('eris');
const Discord = require('discord.js')

var oilJson;
var uraniumJson;
var leadJson;
var ironJson;
var braxiteJson;
var gasolineJson;
var munitionsJson;
var steelJson;
var aluminumJson;
var foodJson;
var coalJson;
var count;
var sleeping;
var totalProfit;

// init project
var express = require('express');
var app = express();

var request = require('request');
var fs = require('fs');
var tmp = require('tmp');

const bot = new Eris(process.env.BOT_TOKEN);   // Replace BOT_TOKEN in .env with your bot accounts token <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< read this
												// Note I have seperated the post out into 2 channels. The post for less then 100k profit are spammy so you might want to comment it out and not add a chanel for it.
												// You will have to replace the target message channels
												// 808532274269650995 = replace this for you want the large profit(>100k) message to be posted
												// 808532964300292096 = replace this for the small profit(<100k) chanel
												// 732801684685848646 = replace this where you want the bot to post the current prices when people tell it getprices
												// 808531483601010748 = Regulator chanel that should only be visible to the bot, it is very spammy, used to avoid asynchranus calls the discord libary i am useing causes
												
const http = require('http');

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error .
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

bot.on('ready', () => {                                // When the bot is ready
    console.log('Ready!');  // Log "Ready!"
    var today = new Date();
    console.log(today.getHours());
    count = 0;
    sleeping = 0;
    totalProfit = 0;
    next(); 
});

function next(){
  sleep(3000) // << Use this to slow down/speed up the bot as it can eat api request like mad
  var today = new Date();
  console.log(today.getHours());
  if(today.getHours() > 14 || today.getHours() < 7){  // 15 = 8 am 6 = 11pm  << Controls the time the bot is on to avoid wasteing api request, in pacific standard time
    sleeping = 0;
    if(count == 0){
      fetch0()
      count = 1
    } else if (count == 1){
      fetch1()
      count = 2
    } else if (count == 2){
      fetch2()
      count = 3
    } else if (count == 3){
      fetch3()
      count = 4
    } else if (count == 4){
      fetch4()
      count = 5
    } else if (count == 5){
      fetch5()
      count = 6
    } else if (count == 6){
      fetch6()
      count = 7
    } else if (count ==7){
      fetch7()
      count = 8
    } else if (count == 8){
      fetch8()
      count = 9
    } else if (count == 9){
      fetch9()
      count = 10
    } else if (count == 10){
      fetch10()
      count = 0
    }
  } else {
    if (sleeping == 0){
        sleeping = 1;
        bot.createMessage("462658969324748830", 'Sleeping to save on api calls');
    }
    bot.createMessage("808531483601010748", "fetch0Sleep"); 
  }
}

function fetch0(){
  //bot.createMessage("462658969324748830", '------------------------------------------------------------------------------------------------------------'); 
  console.log('0!');
  coalJson = JSON.parse(Get('https://politicsandwar.com/api/tradeprice/resource=coal&key=APIKEYGOESHERE'));
  coalCheck();
}
function fetch1(){
  console.log('1!');
  oilJson = JSON.parse(Get('https://politicsandwar.com/api/tradeprice/resource=oil&key=APIKEYGOESHERE'));
  oilCheck();
}
function fetch2(){
  console.log('2!');
  uraniumJson = JSON.parse(Get('https://politicsandwar.com/api/tradeprice/resource=uranium&key=APIKEYGOESHERE'));
  uraniumCheck();
}
function fetch3(){
  console.log('3!');
  leadJson = JSON.parse(Get('https://politicsandwar.com/api/tradeprice/resource=lead&key=APIKEYGOESHERE'));
  leadCheck();
}
function fetch4(){
  console.log('4!');
  ironJson = JSON.parse(Get('https://politicsandwar.com/api/tradeprice/resource=iron&key=APIKEYGOESHERE'));
  ironCheck();
}
function fetch5(){
  console.log('5!');
  braxiteJson = JSON.parse(Get('https://politicsandwar.com/api/tradeprice/resource=bauxite&key=APIKEYGOESHERE'));
  braxiteCheck();
}
function fetch6(){
  console.log('6!');
  gasolineJson = JSON.parse(Get('https://politicsandwar.com/api/tradeprice/resource=gasoline&key=APIKEYGOESHERE'));
  gasolineCheck();
}
function fetch7(){
  console.log('7!');
  munitionsJson = JSON.parse(Get('https://politicsandwar.com/api/tradeprice/resource=munitions&key=APIKEYGOESHERE'));
  munitionsCheck();
}
function fetch8(){
  console.log('8!');
  steelJson = JSON.parse(Get('https://politicsandwar.com/api/tradeprice/resource=steel&key=APIKEYGOESHERE'));
  steelCheck();
}
function fetch9(){
  console.log('9!');
  aluminumJson = JSON.parse(Get('https://politicsandwar.com/api/tradeprice/resource=aluminum&key=APIKEYGOESHERE'));
  aluminumCheck();
}
function fetch10(){
  console.log('10!');
  foodJson = JSON.parse(Get('https://politicsandwar.com/api/tradeprice/resource=food&key=APIKEYGOESHERE'));
  foodCheck();
}

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function coalCheck(){
      try {
        if(coalJson.lowestbuy.price < coalJson.highestbuy.price){
          var amount = 0;
          if(parseInt(coalJson.highestbuy.amount) > parseInt(coalJson.lowestbuy.amount)){
             amount = coalJson.lowestbuy.amount;
          } else{
             amount = coalJson.highestbuy.amount;
          }
          var profit = 0;
          profit = (amount * (coalJson.highestbuy.price - coalJson.lowestbuy.price));
          if(profit > 100000){
              bot.createMessage("808532964300292096", 'PROFIT FOR COAL - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=coal&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
          } else if (profit > 0) {
              bot.createMessage("808532274269650995", 'PROFIT FOR COAL - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=coal&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
          }
        } 
        //bot.createMessage("462658969324748830", "Coal- Lowest Selling:" + coalJson.lowestbuy.price + " Highest Buying:" + coalJson.highestbuy.price + " Difference:" + (coalJson.lowestbuy.price - coalJson.highestbuy.price)); 
        bot.createMessage("808531483601010748", "fetch1"); 
      }
      catch(error) {
        //bot.createMessage("462658969324748830", "Coal out of Api"); 
        bot.createMessage("808531483601010748", "fetch1,out of api"); 
      }
} 
function oilCheck(){
      try {
        if(oilJson.lowestbuy.price < oilJson.highestbuy.price){
          var amount = 0;
          if(parseInt(oilJson.highestbuy.amount) > parseInt(oilJson.lowestbuy.amount)){
             amount = oilJson.lowestbuy.amount;
          } else{
             amount = oilJson.highestbuy.amount;
          }
          var profit = 0;
          profit = (amount * (oilJson.highestbuy.price - oilJson.lowestbuy.price));
          if(profit > 100000){
            bot.createMessage("808532964300292096", 'PROFIT FOR OIL - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=oil&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
            totalProfit = totalProfit + profit;
          } else if (profit > 0) {
            bot.createMessage("808532274269650995", 'PROFIT FOR OIL - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=oil&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
            totalProfit = totalProfit + profit;
          }
        } 
        //bot.createMessage("462658969324748830", "Oil- Lowest Selling:" + oilJson.lowestbuy.price + " Highest Buying:" + oilJson.highestbuy.price + " Difference:" + (oilJson.lowestbuy.price - oilJson.highestbuy.price)); 
        bot.createMessage("808531483601010748", "fetch2"); 
      }
      catch(error) {
        //bot.createMessage("462658969324748830", "Oil out of Api"); 
        bot.createMessage("808531483601010748", "fetch2,out of api"); 
      }
} 
function uraniumCheck(){
        try {
          if(uraniumJson.lowestbuy.price < uraniumJson.highestbuy.price){
            var amount = 0;
            if(parseInt(uraniumJson.highestbuy.amount) > parseInt(uraniumJson.lowestbuy.amount)){
               amount = uraniumJson.lowestbuy.amount;
            } else{
               amount = uraniumJson.highestbuy.amount;
            }
            var profit = 0;
            profit = (amount * (uraniumJson.highestbuy.price - uraniumJson.lowestbuy.price));
            if(profit > 100000){
              bot.createMessage("808532964300292096", 'PROFIT FOR URANIUM - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=uranium&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            } else if (profit > 0) {
              bot.createMessage("808532274269650995", 'PROFIT FOR URANIUM - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=uranium&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            }
          } 
          //bot.createMessage("462658969324748830", 'Uranium- Lowest Selling:' + uraniumJson.lowestbuy.price + ' Highest Buying:' + uraniumJson.highestbuy.price + ' Difference:' + (uraniumJson.lowestbuy.price - uraniumJson.highestbuy.price)); 
          bot.createMessage("808531483601010748", "fetch3"); 
      }
      catch(error) {
        //bot.createMessage("462658969324748830", "Uranium out of Api"); 
        bot.createMessage("808531483601010748", "fetch3,out of api"); 
      }

} 

function leadCheck(){
        try {
          if(leadJson.lowestbuy.price < leadJson.highestbuy.price){
            var amount = 0;
            if(parseInt(leadJson.highestbuy.amount) > parseInt(leadJson.lowestbuy.amount)){
               amount = leadJson.lowestbuy.amount;
            } else{
               amount = leadJson.highestbuy.amount;
            }
            var profit = 0;
            profit = (amount * (leadJson.highestbuy.price - leadJson.lowestbuy.price));
            if(profit > 100000){
              bot.createMessage("808532964300292096", 'PROFIT FOR LEAD - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=lead&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            } else if (profit > 0) {
              bot.createMessage("808532274269650995", 'PROFIT FOR LEAD - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=lead&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            }
          } 
          //bot.createMessage("462658969324748830", 'Lead- Lowest Selling:' + leadJson.lowestbuy.price + ' Highest Buying:' + leadJson.highestbuy.price + ' Difference:' + (leadJson.lowestbuy.price - leadJson.highestbuy.price)); 
          bot.createMessage("808531483601010748", "fetch4"); 
      }
      catch(error) {
        //bot.createMessage("462658969324748830", "Lead out of Api"); 
        bot.createMessage("808531483601010748", "fetch4,out of api"); 
      }

} 

function ironCheck(){
        try {
          if(ironJson.lowestbuy.price < ironJson.highestbuy.price){
            var amount = 0;
            if(parseInt(ironJson.highestbuy.amount) > parseInt(ironJson.lowestbuy.amount)){
               amount = ironJson.lowestbuy.amount;
            } else{
               amount = ironJson.highestbuy.amount;
            }
            var profit = 0;
            profit = (amount * (ironJson.highestbuy.price - ironJson.lowestbuy.price));
            if(profit > 100000){
              bot.createMessage("808532964300292096", 'PROFIT FOR IRON - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=iron&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            } else if (profit > 0) {
              bot.createMessage("808532274269650995", 'PROFIT FOR IRON - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=iron&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            }
          } 
          //bot.createMessage("462658969324748830", 'Iron- Lowest Selling:' + ironJson.lowestbuy.price + ' Highest Buying:' + ironJson.highestbuy.price + ' Difference:' + (ironJson.lowestbuy.price - ironJson.highestbuy.price)); 
          bot.createMessage("808531483601010748", "fetch5"); 
      }
      catch(error) {
        //bot.createMessage("462658969324748830", "Iron out of Api"); 
        bot.createMessage("808531483601010748", "fetch5,out of api"); 
      }

}  

function braxiteCheck(){
        try {
          if(braxiteJson.lowestbuy.price < braxiteJson.highestbuy.price){
            var amount = 0;
            if(parseInt(braxiteJson.highestbuy.amount) > parseInt(braxiteJson.lowestbuy.amount)){
               amount = braxiteJson.lowestbuy.amount;
            } else{
               amount = braxiteJson.highestbuy.amount;
            }
            var profit = 0;
            profit = (amount * (braxiteJson.highestbuy.price - braxiteJson.lowestbuy.price));
            if(profit > 100000){
              bot.createMessage("808532964300292096", 'PROFIT FOR BRAXITE - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=26&display=world&resource1=bauxite&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            } else if (profit > 0) {
              bot.createMessage("808532274269650995", 'PROFIT FOR BRAXITE - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=26&display=world&resource1=bauxite&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            }
          } 
          //bot.createMessage("462658969324748830", 'Bauxite- Lowest Selling:' + braxiteJson.lowestbuy.price + ' Highest Buying:' + braxiteJson.highestbuy.price + ' Difference:' + (braxiteJson.lowestbuy.price - braxiteJson.highestbuy.price)); 
          bot.createMessage("808531483601010748", "fetch6"); 
      }
      catch(error) {
        //bot.createMessage("462658969324748830", "Brauxite out of Api"); 
        bot.createMessage("808531483601010748", "fetch6,out of api"); 
      }

}  

function gasolineCheck(){
        try {
          if(gasolineJson.lowestbuy.price < gasolineJson.highestbuy.price){
            var amount = 0;
            if(parseInt(gasolineJson.highestbuy.amount) > parseInt(gasolineJson.lowestbuy.amount)){
               amount = gasolineJson.lowestbuy.amount;
            } else{
               amount = gasolineJson.highestbuy.amount;
            }
            var profit = 0;
            profit = (amount * (gasolineJson.highestbuy.price - gasolineJson.lowestbuy.price));
            if(profit > 100000){
              bot.createMessage("808532964300292096", 'PROFIT FOR GASOLINE - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=gasoline&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            } else if (profit > 0) {
              bot.createMessage("808532274269650995", 'PROFIT FOR GASOLINE - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=gasoline&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            }
          } 
          //bot.createMessage("462658969324748830", 'Gasoline- Lowest Selling:' + gasolineJson.lowestbuy.price + ' Highest Buying:' + gasolineJson.highestbuy.price + ' Difference:' + (gasolineJson.lowestbuy.price - gasolineJson.highestbuy.price)); 
          bot.createMessage("808531483601010748", "fetch7"); 
      }
      catch(error) {
        //bot.createMessage("462658969324748830", "Gasoline out of Api"); 
        bot.createMessage("808531483601010748", "fetch7,out of api"); 
      }

}  

function munitionsCheck(){
        try {
          if(munitionsJson.lowestbuy.price < munitionsJson.highestbuy.price){
            var amount = 0;
            if(parseInt(munitionsJson.highestbuy.amount) > parseInt(munitionsJson.lowestbuy.amount)){
               amount = munitionsJson.lowestbuy.amount;
            } else{
               amount = munitionsJson.highestbuy.amount;
            }
            var profit = 0;
            profit = (amount * (munitionsJson.highestbuy.price - munitionsJson.lowestbuy.price));
            if(profit > 100000){
              bot.createMessage("808532964300292096", 'PROFIT FOR MUNITIONS - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=munitions&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            } else if (profit > 0) {
              bot.createMessage("808532274269650995", 'PROFIT FOR MUNITIONS - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=munitions&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            }  
          } 
          //bot.createMessage("462658969324748830", 'Munitions- Lowest Selling:' + munitionsJson.lowestbuy.price + ' Highest Buying:' + munitionsJson.highestbuy.price + ' Difference:' + (munitionsJson.lowestbuy.price - munitionsJson.highestbuy.price)); 
          bot.createMessage("808531483601010748", "fetch8"); 
      }
      catch(error) {
        //bot.createMessage("462658969324748830", "Munitions out of Api"); 
        bot.createMessage("808531483601010748", "fetch8,out of api"); 
      }
}  

function steelCheck(){
        try {
          if(steelJson.lowestbuy.price < steelJson.highestbuy.price){
            var amount = 0;
            if(parseInt(steelJson.highestbuy.amount) > parseInt(steelJson.lowestbuy.amount)){
               amount = steelJson.lowestbuy.amount;
            } else{
               amount = steelJson.highestbuy.amount;
            }
            var profit = 0;
            profit = (amount * (steelJson.highestbuy.price - steelJson.lowestbuy.price));
            if(profit > 100000){
              bot.createMessage("808532964300292096", 'PROFIT FOR STEEL - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=steel&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            } else if (profit > 0) {
              bot.createMessage("808532274269650995", 'PROFIT FOR STEEL - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=steel&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            }
          } 
          //bot.createMessage("462658969324748830", 'Steel- Lowest Selling:' + steelJson.lowestbuy.price + ' Highest Buying:' + steelJson.highestbuy.price + ' Difference:' + (steelJson.lowestbuy.price - steelJson.highestbuy.price)); 
          bot.createMessage("808531483601010748", "fetch9"); 
      }
      catch(error) {
        //bot.createMessage("462658969324748830", "Steel out of Api"); 
        bot.createMessage("808531483601010748", "fetch9,out of api"); 
      }
}  

function aluminumCheck(){
        try {
          if(aluminumJson.lowestbuy.price < aluminumJson.highestbuy.price){
            var amount = 0;
            if(parseInt(aluminumJson.highestbuy.amount) > parseInt(aluminumJson.lowestbuy.amount)){
               amount = aluminumJson.lowestbuy.amount;
            } else{
               amount = aluminumJson.highestbuy.amount;
            }
            var profit = 0;
            profit = (amount * (aluminumJson.highestbuy.price - aluminumJson.lowestbuy.price));
            if(profit > 100000){
              bot.createMessage("808532964300292096", 'PROFIT FOR ALUMINUM - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=aluminum&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            } else if (profit > 0) {
              bot.createMessage("808532274269650995", 'PROFIT FOR ALUMINUM - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=aluminum&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            }
          } 
          //bot.createMessage("462658969324748830", 'Aluminum- Lowest Selling:' + aluminumJson.lowestbuy.price + ' Highest Buying:' + aluminumJson.highestbuy.price + ' Difference:' + (aluminumJson.lowestbuy.price - aluminumJson.highestbuy.price)); 
          bot.createMessage("808531483601010748", "fetch10"); 
      }
      catch(error) {
        //bot.createMessage("462658969324748830", "Aluminum out of Api"); 
        bot.createMessage("808531483601010748", "fetch10,out of api"); 
      }
}  

function foodCheck(){
        try {
          if(foodJson.lowestbuy.price < foodJson.highestbuy.price){
            var amount = 0;
            if(parseInt(foodJson.highestbuy.amount) > parseInt(foodJson.lowestbuy.amount)){
               amount = foodJson.lowestbuy.amount;
            } else{
               amount = foodJson.highestbuy.amount;
            }
            var profit = 0;
            profit = (amount * (foodJson.highestbuy.price - foodJson.lowestbuy.price));
            if(profit > 100000){
              bot.createMessage("808532964300292096", 'PROFIT FOR FOOD - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=food&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            } else if (profit > 0) {
              bot.createMessage("808532274269650995", 'PROFIT FOR FOOD - ' + " $ " + profit + "https://politicsandwar.com/index.php?id=90&display=world&resource1=food&buysell=sell&ob=price&od=DEF&maximum=15&minimum=0&search=Go");   
              totalProfit = totalProfit + profit;
            }
          } 
          //bot.createMessage("462658969324748830", 'Food- Lowest Selling:' + foodJson.lowestbuy.price + ' Highest Buying:' + foodJson.highestbuy.price + ' Difference:' + (foodJson.lowestbuy.price - foodJson.highestbuy.price)); 
          bot.createMessage("808531483601010748", "fetch0"); 
      }
      catch(error) {
        //bot.createMessage("462658969324748830", "Food out of Api"); 
        bot.createMessage("808531483601010748", "fetch0,out of api"); 
      }

}  

bot.on('messageCreate', (msg) => {    // This is a juri rigged fix I added to avoid asynchranus calls that I had a problem with. Basically create an discord channel invisable to everyone but the bot and let it post this their
    if(msg.content.includes('fetch1')) {
      try {
        next();
      }
      catch(error) {
        bot.createMessage("808531483601010748", "fetch2"); 
      }
    }
    if(msg.content.includes('fetch2')) {
      try {
        next();
      }
      catch(error) {
        bot.createMessage("808531483601010748", "fetch3"); 
      }
    }
    if(msg.content.includes('fetch3')) {
      try {
        next();
      }
      catch(error) {
        bot.createMessage("808531483601010748", "fetch4"); 
      }
    }
    if(msg.content.includes('fetch4')) {
      try {
        next();
      }
      catch(error) {
        bot.createMessage("808531483601010748", "fetch5"); 
      }
    }
    if(msg.content.includes('fetch5')) {
      try {
        next();
      }
      catch(error) {
        bot.createMessage("808531483601010748", "fetch6"); 
      }
    }
    if(msg.content.includes('fetch6')) {
      try {
        next();
      }
      catch(error) {
        bot.createMessage("808531483601010748", "fetch7"); 
      }
    }
    if(msg.content.includes('fetch7')) {
      try {
        next();
      }
      catch(error) {
        bot.createMessage("808531483601010748", "fetch8"); 
      }
    }
    if(msg.content.includes('fetch8')) {
      try {
        next();
      }
      catch(error) {
        bot.createMessage("808531483601010748", "fetch9"); 
      }
    }
    if(msg.content.includes('fetch9')) {
      try {
        next();
      }
      catch(error) {
        bot.createMessage("808531483601010748", "fetch10"); 
      }
    }
    if(msg.content.includes('fetch10')) {
      try {
        next();
      }
      catch(error) {
        bot.createMessage("808531483601010748", "fetch0"); 
      }
    }
    if(msg.content.includes('fetch0')) {
      try {
        next();
      }
      catch(error) {
        bot.createMessage("808531483601010748", "fetch1"); 
      }
    }
    if(msg.content.includes('reset')) {
       bot.createMessage("462711044243062795", "Restarting"); 
       count = 0;
       next();
    }
    if(msg.content.includes('getdata')) {
       bot.createMessage("462711044243062795", "Testing"); 
       getData();
    }
    if(msg.content.includes('getProfit')) {
      bot.createMessage("707795461733613619", totalProfit); 
    }
    if(msg.content.includes('getprices')) {
        try{
          if(sleeping==1){
            bot.createMessage("732801684685848646", "Bot sleeping to conserve API resquest. Values may be out of date by a few hours."); 
          }
        } catch(error) {
            //Do nothing
        }
        try{
          bot.createMessage("732801684685848646", "Coal- Lowest Selling:" + coalJson.lowestbuy.price + " Highest Buying:" + coalJson.highestbuy.price + " Difference:" + (coalJson.lowestbuy.price - coalJson.highestbuy.price)); 
        } catch(error) {
          bot.createMessage("732801684685848646", "Coal out of Api"); 
        }
        try{
          bot.createMessage("732801684685848646", "Oil- Lowest Selling:" + oilJson.lowestbuy.price + " Highest Buying:" + oilJson.highestbuy.price + " Difference:" + (oilJson.lowestbuy.price - oilJson.highestbuy.price)); 
        } catch(error) {
          bot.createMessage("732801684685848646", "Oil out of Api"); 
        }
        try{
          bot.createMessage("732801684685848646", 'Uranium- Lowest Selling:' + uraniumJson.lowestbuy.price + ' Highest Buying:' + uraniumJson.highestbuy.price + ' Difference:' + (uraniumJson.lowestbuy.price - uraniumJson.highestbuy.price)); 
        } catch(error) {
          bot.createMessage("732801684685848646", "Uranium out of Api"); 
        }
        try{
          bot.createMessage("732801684685848646", 'Lead- Lowest Selling:' + leadJson.lowestbuy.price + ' Highest Buying:' + leadJson.highestbuy.price + ' Difference:' + (leadJson.lowestbuy.price - leadJson.highestbuy.price)); 
        } catch(error) {
          bot.createMessage("732801684685848646", "Lead out of Api"); 
        }
        try{
          bot.createMessage("732801684685848646", 'Iron- Lowest Selling:' + ironJson.lowestbuy.price + ' Highest Buying:' + ironJson.highestbuy.price + ' Difference:' + (ironJson.lowestbuy.price - ironJson.highestbuy.price)); 
        } catch(error) {
          bot.createMessage("732801684685848646", "Iron out of Api"); 
        }
        try{
          bot.createMessage("732801684685848646", 'Bauxite- Lowest Selling:' + braxiteJson.lowestbuy.price + ' Highest Buying:' + braxiteJson.highestbuy.price + ' Difference:' + (braxiteJson.lowestbuy.price - braxiteJson.highestbuy.price)); 
        } catch(error) {
          bot.createMessage("732801684685848646", "Brauxite out of Api"); 
        }
        try{
          bot.createMessage("732801684685848646", 'Gasoline- Lowest Selling:' + gasolineJson.lowestbuy.price + ' Highest Buying:' + gasolineJson.highestbuy.price + ' Difference:' + (gasolineJson.lowestbuy.price - gasolineJson.highestbuy.price)); 
        } catch(error) {
          bot.createMessage("732801684685848646", "Gasoline out of Api"); 
        }
        try{
         bot.createMessage("732801684685848646", 'Munitions- Lowest Selling:' + munitionsJson.lowestbuy.price + ' Highest Buying:' + munitionsJson.highestbuy.price + ' Difference:' + (munitionsJson.lowestbuy.price - munitionsJson.highestbuy.price)); 
        } catch(error) {
         bot.createMessage("732801684685848646", "Munitions out of Api"); 
        }
        try{
          bot.createMessage("732801684685848646", 'Steel- Lowest Selling:' + steelJson.lowestbuy.price + ' Highest Buying:' + steelJson.highestbuy.price + ' Difference:' + (steelJson.lowestbuy.price - steelJson.highestbuy.price)); 
        } catch(error) {
          bot.createMessage("732801684685848646", "Steel out of Api"); 
        }
        try{
          bot.createMessage("732801684685848646", 'Aluminum- Lowest Selling:' + aluminumJson.lowestbuy.price + ' Highest Buying:' + aluminumJson.highestbuy.price + ' Difference:' + (aluminumJson.lowestbuy.price - aluminumJson.highestbuy.price)); 
        } catch(error) {
          bot.createMessage("732801684685848646", "Aluminum out of Api"); 
        }
        try{
          bot.createMessage("732801684685848646", 'Food- Lowest Selling:' + foodJson.lowestbuy.price + ' Highest Buying:' + foodJson.highestbuy.price + ' Difference:' + (foodJson.lowestbuy.price - foodJson.highestbuy.price)); 
        } catch(error) {
          bot.createMessage("732801684685848646", "Food out of Api"); 
        }
    }
});

bot.connect();                                         // Get the bot to connect to Discord

function pastaData(){
      $.getJSON('/data', function (data) {
      
      // Basic table rendering
      // http://stackoverflow.com/questions/17066636/parsing-json-objects-for-html-table
      // Take it an extra mile with some styling or filters...
      var table = $('<table>');
      data.forEach(function(row) {
          var tr = $('<tr/>');
          row.forEach(function(col) {
            tr.append("<td>" + col + "</td>");
          });
          table.append(tr);
      });
      $('#data-container').html(table);
      
      // Mad libs....
      // Rudimentary "templating" using jQuery,
      // It gets the job done, but something like 
      // React, Knockout, etc., would be cooler.
      var madlibs = $('#madlibs').html('');
      data.slice(1).forEach(function(row) {
          var html = "<p> I once met a " + row[0] + " who most preferred " + row[1] + " casserole and " + row[2] + " desserts with tea.</p>";
          madlibs.append(html);
      });
    });
}

function getData(){
  app.get("/data", function (_, response) {
      // Or use something fancier like Dropbox.
      // > Use any Dropbox public 'share' link for an xlsx file, 
      // > and be sure to add "?dl=1" to the end to make it direct.
      var dropboxUrl = "https://www.dropbox.com/s/ttaohrjzc6zxedq/test.xlsx?dl=1";

      // We'll use this dropbox url by default.
      var url = dropboxUrl;

      var r = request(url);
      r.on('response', (res) => {
        // Our excel parsing library expects to read from a file,
        // So we do a little bit of temp file dance to wire it up.
        // For the moment it only support .xlsx files,
        // but .csv, .xls, etc., are fairly easy extensions.

        var tmpobj = tmp.fileSync({postfix:'.xlsx'});

        var fileName = tmpobj.name;

        res.pipe(fs.createWriteStream(fileName));

        var parseXlsx = require('excel');
        parseXlsx(fileName, (err, data) => {
          if(err) throw err;
          response.send(data);
        });
      });
      r.on('error', (err) => {
          throw err;
      });
  });
}

function sleep(milliseconds) { 
  let timeStart = new Date().getTime(); 
  while (true) { 
      let elapsedTime = new Date().getTime() - timeStart; 
      if (elapsedTime > milliseconds) { 
          break; 
      } 
  } 
} 

