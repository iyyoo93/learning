import _ from 'lodash';

let initState = {
       "schedule": [
         {
             "description": "Scrum: 'stand up'",
             "time": "9:00",
             "duration": 30
          }, {
             "description": "Meet friends for lunch",
             "time": "12:00",
             "duration": 60
          }, {
             "description": "Meet with Tom",
             "time": "14:00",
             "duration": 120
          }, {
             "description": "Call Dave",
             "time": "14:30",
             "duration": 60
          }, {
             "description": "Resourceing for 'project X'",
             "time": "18:00",
             "duration": 60
          }, {
             "description": "Sync with India dev team",
             "time": "18:00",
             "duration": 30
          }, {
             "description": "Status about 'project Z'",
             "time": "19:30",
             "duration": 60
        }
      ],
      isSchedulePlanned : false,
      timeSchedule:[]
    }

export default function (state = initState, action) {
    switch (action.type) {
        case 'GET_SCHEDULE':
            let schedulePeriod = [];
            for(var time = 9; time < 21; time++) {
              let timeSchedule = {
                  startTime : time + ':00',
                  EndTime : time + ':30',
                  scheduleName: getScheduleList(state.schedule, time, true)
              }
              schedulePeriod.push(timeSchedule);
              timeSchedule = {
                  startTime : time + ':30',
                  EndTime : (time + 1) + ':00',
                  scheduleName: getScheduleList(state.schedule, time, false)
              }
              schedulePeriod.push(timeSchedule);
            }


            return _.extend({}, state, {isSchedulePlanned: true, timeSchedule: schedulePeriod });
            break;
    }
    return state;
}

function getScheduleList(schedule, time, isFirstHalf) {
    var scheduleWorks = [], timeSchedule = [];

    if(isFirstHalf) {
        timeSchedule.push(time);
        timeSchedule.push(parseFloat(time + .5));
    } else {
        timeSchedule.push(parseFloat((time) + .5));
        timeSchedule.push(time+1);
    }

    for(var index=0; index < schedule.length; index++) {
        var curMettingHalfs = [];
        for(var remainingTime = schedule[index].duration, itr = 0; remainingTime > 0; remainingTime = remainingTime-30, itr++) {
            var hour = schedule[index].time.split(":")[0];
            var min = schedule[index].time.split(":")[1];
            var schTime = null;

              if(min == '00') {
               schTime = hour;
              } else {
                 schTime = parseFloat(hour) + .5;
              }
              curMettingHalfs.push(parseFloat(schTime));
           curMettingHalfs.push(parseFloat(schTime) + (.5 * (itr + 1)))
        }
        if(!timeSchedule.some(val => curMettingHalfs.indexOf(val) === -1)) {
            scheduleWorks.push(schedule[index].description);
        }
    }
    return scheduleWorks;
}
