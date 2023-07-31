import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

const Calender = ({ tasks }) => {
    return (
        tasks &&
        <FullCalendar
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            plugins={[dayGridPlugin, timeGridPlugin]}
            events={tasks.map(task => ({
                title: task.name,
                start: task.rangeTime[0],
                end: task.rangeTime[1],
                textColor: "#F8FAFC",
                backgroundColor: "#2F80ED",
            }))}
        />
    )
}

export default Calender;