//establish work hours 9-5;
let timeBlocks=$('#time-blocks');
let startTime=9;
let endTime=17;
// initialise toDoList
let toDoList=[];
for(let i=startTime;i<endTime;i++){
    toDoList.push('');
}

// retrieve items from local storage
function retrieveItems(){

    //Retrieve data from the local storage
    if(localStorage.getItem('toDoList')!=null && localStorage.getItem('toDoList')!=''){
    toDoList = JSON.parse(localStorage.getItem('toDoList'));
    console.log(toDoList);
    }

    if(toDoList.length>0){
        for(let item in toDoList){
            //display scores in the table
            let listItem=parseInt(item)+startTime;
            console.log(listItem);
            $('#time-'+listItem).val(toDoList[item]);
        }
    }

}
///////////////////////////////////////////////////
// function to build task list
function formulateBlocks(){
    for(let i=startTime;i<endTime;i++){
        let timeBlock=$('<form>')
            .addClass('row');
        let timeBlockDiv1= $('<div>')
            .addClass('col-1 hour')
            .text(moment(i,'h')
            .format('kk:mm'));
        let timeBlockDiv2=$('<textarea>')
            .addClass('col-10 future')
            .attr('id','time-'+i)
            .attr('time-attr',i);
        let timeBlockDiv3=$('<button>')
            .addClass('col-1 btn-primary saveBtn')
            .text('💾')
            .attr('id','save-'+i)
            .attr('time-attr',i);
        // timeBlockDiv3.on('click',saveItem(timeBlockDiv3.attr('time-attr')));

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
///////////////////////////////////////////////////
//style time blocks by the time of the day
function styleByTime(){
    let hourNow=parseInt(moment().format('kk'));
    //reset the clock to 0 at 24:00;
    if (hourNow==24){hourNow=0;}
    // colour code elements
    for(let i=startTime;i<endTime;i++){
        if(hourNow>i){
            document.getElementById('time-'+i).className='col-10 past';
            // document.getElementById('time-'+i).value='This is in the past';
        }else if(hourNow==i){
            document.getElementById('time-'+i).className='col-10 present';
            // document.getElementById('time-'+i).value='This is now';
        }else{
            document.getElementById('time-'+i).className='col-10 future';
            // document.getElementById('time-'+i).value='This is the future';
        }
    }
}
///////////////////////////////////////////////////
// build task list
formulateBlocks();
styleByTime();
retrieveItems();
///////////////////////////////////////////////////

// display current time
let timeText=$('#currentDay');
timeText.html(moment().format('[Today is] dddd [the] Do [of] MMMM, YYYY')+'<br><br>Time now: '+moment().format('kk:mm:ss'));

let currentHour=parseInt(moment().format('kk'));
let timer=setInterval(() => {
    // update time;
    timeText.html(moment().format('[Today is] dddd [the] Do [of] MMMM, YYYY')+'<br><br>Time now: '+moment().format('kk:mm:ss'));
    //
    //the following block is to avoid running a for-loop to change the styles of the time blocks every second. Only when the hour changes.
    if(currentHour<parseInt(moment().format('kk'))){
        styleByTime();
    }
    //
}, 1000);
///////////////////////////////////////////////////
// Button event listeners
for (let i=startTime;i<endTime;i++){
    document
    .getElementById('save-'+i)
    .addEventListener('click',function(event){
        event.preventDefault();
        let itemNumber =parseInt(document.getElementById('save-'+i).getAttribute('time-attr'));
        console.log(itemNumber);
        itemNumber=parseInt(itemNumber);
        toDoList[parseInt(itemNumber)-startTime]=$('#time-'+itemNumber).val();
        localStorage.setItem('toDoList',JSON.stringify(toDoList));
        $('#alert-message')
        .html('To-do tasks for '+moment(itemNumber,'kk').format('kk:mm')+ ' are saved into <em>\'local storage\'</em>')
        .parent()
        .css('display','block');
    });
 }
 ///////////////////////////////////////////////////
 document.getElementById('hide-alert').addEventListener('click',(event)=>{
     event.stopPropagation();
     document.getElementById('alert').style.display='none';
 })
 
 document.getElementById('reset').addEventListener('click',(event)=>{
    event.stopPropagation();
    toDoList=[];
    for(let i=startTime;i<endTime;i++){
    toDoList.push('');
    }
    localStorage.setItem('toDoList',JSON.stringify(toDoList));
    retrieveItems();
});