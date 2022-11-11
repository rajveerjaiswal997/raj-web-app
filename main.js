song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song1_status = "";
song2_status = "";
scoreRightWrist = 0;


function preload(){
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}

function setup(){
    canvas = createCanvas(400,400);
    canvas.position(450,250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modeLoaded);
    poseNet.on('pose',gotPoses);
}

function modeLoaded(){
    console.log("poseNet is initilized");
}
function draw(){
    image(video,0,0,400,400);
    fill("#FF0000");
    stroke("#FF0000");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();

        if(song1_status == false){
        song1.play();
        document.getElementById("song").innerHTML = " playing -  tum hi ho  song ";
        } 
    }


    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();

        if(song2_status == false){
        song2.play();
        document.getElementById("song").innerHTML = "playing - dil ko karya hai song";
        } 
    }


   
   
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX + "rightWristY = "+ rightWristY);
    }
}

function play(){
    song.play();
    
}

