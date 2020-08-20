//Create variables here
var dog,happyDog,database,foodS,foodStock

function preload()
{
  //load images here
  dogStanding=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1400,800);
  database=firebase.database();
  dog=createSprite(250,250,20,20);
  dog.addImage(dogStanding);
  dog.scale=0.2
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
}

textSize(15);
fill('White');
stroke(1);
text('Note: Press the UP_ARROW Key To Feed Drago Milk!',30,50);
drawSprites();
text('Food Remaining:'+foodS,100,120)

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
lastFed=data.val();
});

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed: "+ lastFed%12 + "PM", 350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
} else{
  text("Last Feed : "+lastFed+ " AM", 350,30)
}
}




function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if (x<=0){
x=0;
  } else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })

}

//function to update food stock and the last fed time

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}