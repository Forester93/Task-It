
//establish work hours 9-5;
let timeBlocks=$('#time-blocks');
let startTime=9;
let endTime=17;


// function to build task list
function formulateBlocks(){
for(let i=startTime;i<endTime;i++){
    let timeBlock=$('<article>').addClass('row');
    let timeBlockDiv1= $('<div>')
        .addClass('col-1 hour')
        .text(moment(i,'h')
        .format('kk:mm'));
    let timeBlockDiv2=$('<textarea>')
        .addClass('col-10 future')
        .attr('id','time-'+i);
    let timeBlockDiv3=$('<button>')
        .addClass('col-1 btn-primary saveBtn')
        .text('💾')
        .attr('id','save-'+i);

    timeBlock.append(timeBlockDiv1);
    timeBlock.append(timeBlockDiv2);
    timeBlock.append(timeBlockDiv3);
    timeBlocks.append(timeBlock);
}

// add the end time of the day without the time block - assumed the person leaves at 5:00pm
// there would be no reason to add a timeslot for 5pm
let timeBlock=$('<article>').addClass('row');
let timeBlockDiv1= $('<div>').addClass('col-1 hour').text(moment(endTime,'h').format('kk:mm'));
timeBlock.append(timeBlockDiv1);
timeBlocks.append(timeBlock);
}

//style time blocks by the time of the day
function styleByTime(){
    for(let i=startTime;i<endTime;i++){
        if(parseInt(moment().format('kk'))>i){
            document.getElementById('time-'+i).className='col-10 past';
            // document.getElementById('time-'+i).value='This is in the past';
        }else if(parseInt(moment().format('kk'))==i){
            document.getElementById('time-'+i).className='col-10 present';
            // document.getElementById('time-'+i).value='This is now';
        }else{
            document.getElementById('time-'+i).className='col-10 future';
            // document.getElementById('time-'+i).value='This is the future';
        }
    }
}
// build task list
formulateBlocks();
styleByTime();

// display current time
let timeText=$('#currentDay');
timeText.html(moment().format('[Today is] dddd [the] Do [of] MMMM, YYYY')+'<br><br>Time now: '+moment().format('kk:mm:ss'));

let currentHour=parseInt(moment().format('kk'));
let timer=setInterval(() => {
    // alert(time);
    timeText.html(moment().format('[Today is] dddd [the] Do [of] MMMM, YYYY')+'<br><br>Time now: '+moment().format('kk:mm:ss'));

    //the following block is to avoid running a for loop to change the styles of the time blocks every second. Only when the hour changes.
    if(currentHour<parseInt(moment().format('kk'))){
        styleByTime();
    }
}, 1000);
