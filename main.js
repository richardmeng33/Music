song = "";
leftWristX = 0
leftWristY = 0
rightWristX = 0
rightWristY = 0
scoreLeftWrist = 0
scoreRightWrist = 0
function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(800, 600);
    canvas.position(900, 250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized')
}

function gotPoses(results)
{
 if(results.length > 0)
 {
    //console.log(results)
    scoreLeftWrist = results[0].pose.keypoints[9].score
    //console.log("scoreRightWrist"+scoreRightWrist+"scoreLeftWrist = " + scoreLeftWrist)

    //console.log(results)
    scoreRightWrist = results[0].pose.keypoints[10].score
    console.log("scoreRightWrist = " + scoreRightWrist)


    leftWristX = results[0].pose.leftWrist.x
    leftWristY = results[0].pose.leftWrist.y
    //console.log("leftWristX = " + leftWristX + "leftWirstY = "+ leftWristY)

    rightWristX = results[0].pose.rightWrist.x
    rightWristY = results[0].pose.rightWrist.y
    //console.log("rightWristX = " + rightWristX + "rightWristY = "+ rightWristY)
 }
}

function draw()
{
    image(video, 0, 0, 800, 600);

    fill("#FF0000")
    stroke("#FF0000")

if(scoreRightWrist > 0.0002)
{

    circle(rightWristX,rightWristY,20);

    if(rightWristY >0 && rightWristY <= 100)  
    {
        document.getElementById("speed").innerHTML = "Speed = 0.25x"
        song.rate(0.25);
    }
    else if(rightWristY >100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x"
        song.rate(0.5);
    }
    else if(rightWristY >200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x"
        song.rate(1);
    }
    else if(rightWristY >300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x"
        song.rate(1.5)
    }
    else if(rightWristY >400 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x"
        song.rate(2)
    }
    else if(rightWristY >500 && rightWristY <= 600)
    {
        document.getElementById("speed").innerHTML = "Speed = 4x"
        song.rate(4)
    }
}
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20)
        InNumberleftWristY = Number(leftWristY)
        remove_decimals = floor(InNumberleftWristY)
        volume = (remove_decimals/600)
        document.getElementById("volume").innerHTML = "Volume = " + volume
        song.setVolume(volume)
    } 

}

function play()
{
    song.play()
}

function stop()
{
    song.stop()
    song.setVolume(1)
    song.rate(1)
}