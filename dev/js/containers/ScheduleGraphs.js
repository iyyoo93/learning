import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSchedule} from '../actions/index';
import {bindActionCreators} from 'redux';


class ScheduleGraphs extends Component {

    getTImeStamp(time) {
      var timestamp;
      var hour = time.split(":")[0];
      var min = time.split(":")[1];
      if(hour < 12) {
          timestamp = time + "AM";
      } else if(hour > 12) {
          timestamp = (hour - 12) + ":" + min + "PM";
          timestamp = "0" + timestamp;
      } else {
          timestamp = time + "PM";
      }
      return timestamp;
    }

    getScheduledivs(schedule, classNameDiv, istop) {
        var schedulediv = [];
        var classnone = "scheduleWorkDivNoSch" + istop;
        if(schedule.scheduleName.length == 0) {
            schedulediv.push(<div className={classnone} style={{width: "80%", "background": "#e3d6d6;"}}>  </div>)
        } else {
            for(var index=0; index < schedule.scheduleName.length; index++) {
                var barWidth = 80/schedule.scheduleName.length;
                barWidth = barWidth + "%"
                schedulediv.push(<div className={classNameDiv} style={{width: barWidth}}> {schedule.scheduleName[index]} </div>);
            }



          // schedulediv.push(<div className={classNameDiv}> dsvfdsfugfjdfh </div>);
          // schedulediv.push(<div className={classNameDiv}> dsvfdsfugfjqwertyuioifdsdfghdfh </div>);
        }

        return (
          <div>
            {schedulediv}
          </div>
        )
    }

    getScheduleWork() {
        const { workMap } = this.props;
        var scheduleWorks = [];
        for(var index=0; index < workMap.timeSchedule.length/2; index++) {
            scheduleWorks.push(
              <div>

                  <div style={{ background: "white"}}>{this.getTImeStamp(workMap.timeSchedule[index*2].startTime)}&nbsp;&nbsp;&nbsp;</div>
                  <div style={{float: "left", background: "white", color: "#9b9494"}}>{this.getTImeStamp(workMap.timeSchedule[index*2].EndTime)}&nbsp;&nbsp;&nbsp;</div>
                  <div className="scheduleDiv"  >
                      {this.getScheduledivs(workMap.timeSchedule[index*2], "scheduleWorkDivtop", true)}
                  </div>


                  <div style={{ background: "white", color: "#9b9494"}}>{this.getTImeStamp(workMap.timeSchedule[index*2 + 1].startTime)}&nbsp;&nbsp;&nbsp;</div>
                  <div style={{float: "left", background: "white"}}>{this.getTImeStamp(workMap.timeSchedule[index*2 + 1].EndTime)}&nbsp;&nbsp;&nbsp;</div>
                  <div className="scheduleDiv"  >
                      {this.getScheduledivs(workMap.timeSchedule[index*2 + 1], "scheduleWorkDivbottom", false)}
                  </div>
              </div>
            );
        }

        var scheduleWork = (
            <div>
                <div style={{ background: "white"}}>09.00 AM&nbsp;&nbsp;&nbsp;</div>
                <div style={{float: "left", background: "white", color: "#9b9494"}}>09.30 AM&nbsp;&nbsp;&nbsp;</div>
                <div className="scheduleDiv"  >
                    <div className="scheduleWorkDivtop"> dsvfdsfugfjdfh </div>
                    <div className="scheduleWorkDivtop"> dsvfdsfugfjqwertyuioifdsdfghdfh </div>
                </div>

                <br />
                <div style={{ background: "white", color: "#9b9494"}}>09.30 AM&nbsp;&nbsp;&nbsp;</div>
                <div style={{float: "left", background: "white"}}>10.00 AM&nbsp;&nbsp;&nbsp;</div>
                <div className="scheduleDiv"  >
                    <div className="scheduleWorkDivbottom" > dsvfdsfugfjdfh </div>
                    <div className="scheduleWorkDivbottom"> dsvfdsfugfjqwertyuioifdsdfghdfh </div>
                </div>
            </div>
        );

        return (
            <div>
                {scheduleWorks}
            </div>
        );
    }

    render() {
        return (
          this.props.workMap.isSchedulePlanned ? this.getScheduleWork()
                : <a href='#' onClick={()=>this.props.getSchedule()} > click here to see Schedule </a>

        );
    }
}

function mapStateToProps(state, props) {
    return {
        workMap: state.schedulework
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({getSchedule: getSchedule}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ScheduleGraphs);
