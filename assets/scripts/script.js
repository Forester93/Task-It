// display current time
let timeText=$('#currentDay');
timeText.html(moment().format('[Today is] dddd [the] Do [of] MMMM, YYYY')+'<br><br>Time now: '+moment().format('kk:mm:ss'));

let timer=setInterval(() => {
    // alert(time);
    timeText.html(moment().format('[Today is] dddd [the] Do [of] MMMM, YYYY')+'<br><br>Time now: '+moment().format('kk:mm:ss'));
}, 1000);

//establish work hours 9-5;
let timeBlocks=$('#time-blocks');


function formulateBlocks(){
for(let i=9;i<17;i++){
    let timeBlock=$('<article>').addClass('row');
    let timeBlockDiv1= $('<div>').addClass('col-1 hour').text(moment(i,'h').format('kk:mm'));
    let timeBlockDiv2=$('<textarea>').addClass('col-10 future');
    let timeBlockDiv3=$('<button>').addClass('col-1 btn-primary saveBtn').text('💾').attr('id','time-'+moment(i,'h').format('kk'));

    timeBlock.append(timeBlockDiv1);
    timeBlock.append(timeBlockDiv2);
    timeBlock.append(timeBlockDiv3);
    timeBlocks.append(timeBlock);
}

let timeBlock=$('<article>').addClass('row');
let timeBlockDiv1= $('<div>').addClass('col-1 hour').text(moment(17,'h').format('kk:mm'));
timeBlock.append(timeBlockDiv1);
timeBlocks.append(timeBlock);


}

formulateBlocks();