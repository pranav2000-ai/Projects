var cols=35;
var rows=35;
var grid=new Array(cols);
var openSet=[];
var closedSet=[];
var start,end;
var w, h;
var path=[];

function removeFromArray(arr,elt) {
 for(var i=arr.length-1;i>=0;i--)
 {
   if(arr[i]==elt)
     arr.splice(i,1);
 }
   
}
function heuristic(a,b){
    var d= dist(a.i,a.j,b.i,b.j);
  return d;
}


function Spot(i,j){
  
  this.i=i;
  this.j=j;
  this.f=0;
  this.g=0;
  this.h=0;
  this.neighbours = [];
  this.previous=undefined;
  this.wall=false;
  
  if(random(1)<0.3){
    this.wall=true;
  }
  
  this.show=function(col){
    fill(col);
    if(this.wall){
       fill(0);
    }
    noStroke();
    rect(this.i*w,this.j*h,w-1,h-1);
  }
  this.Addneighbours=function(grid){
   this.i=i;
   this.j=j;
   if(i<cols-1)
     this.neighbours.push(grid[i+1][j]);
   if(i>0)
     this.neighbours.push(grid[i-1][j]);
   if(j<rows-1)
     this.neighbours.push(grid[i][j+1]);
   if(j>0) 
     this.neighbours.push(grid[i][j-1]);
     if(i>0 && j>0) 
       this.neighbours.push(grid[i-1][j-1]);
     if(i<cols-1 && j>0) 
       this.neighbours.push(grid[i+1][j-1]);
     if(i>0 && j<rows-1) 
       this.neighbours.push(grid[i-1][j+1]);
     if(i<cols-1 && j<rows-1) 
       this.neighbours.push(grid[i+1][j+1]);
  }
}
function setup() {
  createCanvas(400, 400);
  w=width/cols;
  h=height/rows;
  for(var i=0;i<cols;i++)
  { grid[i]=new Array(rows);}
  
  for(i=0;i<cols;i++)
  {
    for(var j=0;j<rows ;j++)
    {
      grid[i][j]=new Spot(i,j);
    }
  }
  for(i=0;i<cols;i++)
  {
    for(var j=0;j<rows;j++)
    {
      grid[i][j].Addneighbours(grid);
    }
  }
  start = grid[0][0];
  end = grid[cols-1][rows-1];
  
  openSet.push(start);
  console.log(grid);
}

function draw() {
    
  if(openSet.length>0)
  {
    var min=0;
    for(var i=0;i<openSet.length;i++)
    {
      if(openSet[i].f<openSet[min].f)
        min=i;
    }
    var cur=openSet[min];
    if(cur===end)
    {
      noLoop();
      console.log("Done!")
    }
    removeFromArray(openSet,cur);
    closedSet.push(cur);
    
    var neighbours = cur.neighbours;
    for(var i=0;i<neighbours.length;i++){
      var neighbour=neighbours[i];
        if(!closedSet.includes(neighbour) && !neighbour.wall){
            var tempG=cur.g+1;
          var newPath=false;
            if(openSet.includes(neighbour)){
                  if(tempG<neighbour.g)
                  {
                    newPath=true;
                    neighbour.g=tempG;
                  }
            }
            else
            {
               newPath=true;
                neighbour.g=tempG;
                openSet.push(neighbour);
            }
          if(newPath){
            neighbour.h=heuristic(neighbour,end);
            neighbour.f=neighbour.g + neighbour.h;
            neighbour.previous=cur;
          }
        }
      
    }
    
    
  }
  else
  {
   console.log('Good Luck finding new path');
    noLoop();
    return;
  }
  background(0);
   for(var i=0;i<cols;i++)
  {
    for(var j=0;j<rows;j++)
      grid[i][j].show(color(255));
  }
  for( i=0;i<closedSet.length;i++)
  {
    closedSet[i].show(color(255,0,0));
  }
  for( i=0;i<openSet.length;i++)
  {
    openSet[i].show(color(0,255,0));
  }
      path=[];
      var temp=cur;
      path.push(temp);
      while(temp.previous)
      {
        path.push(temp.previous);
         temp=temp.previous;
      }
  
  for( i=0;i<path.length;i++)
  {
    path[i].show(color(0,0,255));
  }
}