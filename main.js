leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
noseX = 0;
noseY = 0;

sound = "";

function setup(){
    canvas = createCanvas(600,500);
    canvas.position(400,150);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function preload(){
    sound = loadSound("music.mp3")
}

function draw(){
    image(video,0,0,600,500);

    fill("red");
    stroke("red");
    circle(noseX,noseY,20);
    inNumberleftWristY = Number(noseY);
    remove_decimal = floor(inNumberleftWristY);
    left_wrist_divide_1000 = remove_decimal/1000;
    volume = left_wrist_divide_1000*2;
    document.getElementById("volume").innerText = "Volume = " + volume;
    sound.setVolume(volume);
}

ply = "play";

function play(){
    if(ply == "play"){
        sound.play();
        sound.setVolume(1);
        sound.rate(1);
        ply = "";
    } else {
        sound.stop();
        ply = "play";
    }
}


function modelLoaded(){
    console.log("poseNet is Initialized")
}

function gotPoses(Results){
    if(Results.length > 0){
        console.log(Results);

        leftWristX = Results[0].pose.leftWrist.x;
        rightWristX = Results[0].pose.rightWrist.x;
        leftWristY = Results[0].pose.leftWrist.y;
        rightWristY = Results[0].pose.rightWrist.y;
        noseX= Results[0].pose.nose.x;
        noseY = Results[0].pose.nose.y;
        
        console.log("Left Wrist X = " + leftWristX + "       Left Wrist Y = " + leftWristY);
        console.log("Right Wrist X = " + rightWristX + "       Right Wrist Y = " + rightWristY);
    }
}