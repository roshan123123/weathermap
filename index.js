const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));//to use body parser




  app.get("/",function(req,res)//when get req from browser TO /  route
  //here route is root
  {
    res.sendFile(__dirname+"/index.html");
  });



app.post("/",function (req,res)//to respond to req from form
{


  const city=req.body.city;
  const aid="e37b2d7b13209bcbbfca6cf86ce5da8c";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+aid
     https.get(url,function(response)
   {
     console.log(response.statusCode);

     response.on("data",function(data)
   {
     const parsedata=JSON.parse(data);//parsing
     // console.log(parsedata);
     // const stringifydata=JSON.stringify(data);//stringify
     // console.log(stringifydata);
     // console.log(parsedata.weather[0].id);//accesssing parsed data
     const temp=parsedata.main.temp;//right temp  is for the temoerature
     res.write("<h1>The temperature in  " +city+ " is "+temp+" K</h1>");//we can have many res .write and pass html elements in string
                          //only h1 works in res.write and p an
     res.send();//we can have only one res.send in a get
   });
 });//works without ; also


});



// app.post("/",function (req,res)//to respond to req from form
// {
//
//
//   const city=req.body.city;
//   const aid="e37b2d7b13209bcbbfca6cf86ce5da8c";
//     const url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+aid
//      https.get(url,function(response)
//    {
//      console.log(response.statusCode);
//
//      response.on("data",function(data)
//    {
//      const parsedata=JSON.parse(data);//parsing
//      // console.log(parsedata);
//      // const stringifydata=JSON.stringify(data);//stringify
//      // console.log(stringifydata);
//      // console.log(parsedata.weather[0].id);//accesssing parsed data
//      const temp=parsedata.main.temp;//right temp  is for the temoerature
//      res.write("<h1>The temperature in  " +city+ " is "+temp+" K</h1>");//we can have many res .write and pass html elements in string
//                           //only h1 works in res.write and p an
//      res.send();//we can have only one res.send in a get
//    });
//  });//works without ; also
//
//
// });
app.listen(process.env.PORT|| 3000,function()
{
  console.log("server working");
});
