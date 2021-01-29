import React,{useEffect} from 'react'

const Home = () => {
    useEffect(() => {
        var c = document.getElementById("stringVib");
        var ctx = c.getContext("2d");
        c.width=window.innerWidth;
        c.height=window.innerHeight;
        let collection=[];
        
        const mousePosition={
            x:null,
            y:null,
            radius:100
        }
        document.addEventListener("mousemove",function(event){
            mousePosition.x=event.x;
            mousePosition.y=event.y;
        })

        ctx.fillStyle='red';
        ctx.font='60px verdana'
        ctx.fillText('Welcome',10,100);
        let ImageCoordinates=ctx.getImageData(0,0,c.width,c.height);
        
        function Point(x,y) {
            this.CurrX=x;
            this.CurrY=y;
            let size=2;
            let origX=this.CurrX;
            let origY=this.CurrY;


            this.draw=function(){
                if(Math.sqrt((mousePosition.x-this.CurrX)*(mousePosition.x-this.CurrX)+(mousePosition.y-this.CurrY)*(mousePosition.y-this.CurrY))<100) ctx.fillStyle='black';
                else ctx.fillStyle='grey';
                ctx.beginPath();
                ctx.arc(this.CurrX,this.CurrY,size,0, 2* Math.PI);
                ctx.closePath();
                ctx.fill();
            }

            this.move=function(){
                let difX=mousePosition.x-this.CurrX;
                let difY=mousePosition.y-this.CurrY;
                let distance=Math.sqrt(difX*difX+difY*difY);
                let velocityX=difX/distance;
                let velocityY=difY/distance;
                let acceleration=(mousePosition.radius-distance)/mousePosition.radius;
                let moveX=10*velocityX*acceleration;
                let moveY=10*velocityY*acceleration;
                if(distance<mousePosition.radius) {
                    this.CurrX-=moveX;
                    this.CurrY-=moveY;
                }else {
                    if(this.CurrX!==origX){
                        this.CurrX+=(origX-this.CurrX)/5;
                    }
                    if(this.CurrY!==origY){
                        this.CurrY+=(origY-this.CurrY)/5;
                    }
                }
            }
        } 
        function begin() {
            collection=[];
            for(let y=0;y<ImageCoordinates.height;y++){
                for(let x=0;x<ImageCoordinates.width;x++){
                    if(ImageCoordinates.data[(y*4*ImageCoordinates.width)+(x*4)+3]>128){
                        collection.push(new Point(5*(x+5),5*(y-20)));
                    } 
                }
            }
        }
        begin();
        
        function animate() {
            ctx.clearRect(0,0,c.width,c.height);
            for(let i=0;i<collection.length;i++){
                collection[i].draw();
                collection[i].move();
            }
            requestAnimationFrame(animate);
        }
        animate();
    }
    , [])
    return (
        <div className="content">
            <canvas id="stringVib"></canvas>
        </div>
    )
}

export default Home;
