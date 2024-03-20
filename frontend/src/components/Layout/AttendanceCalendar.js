import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const localizer = momentLocalizer(moment);

const AttendanceCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/v1/auth/user/attendance`);
      const { checkIns, checkOuts } = res.data;

      const formattedEvents = [];

      checkIns.forEach((checkIn) => {
        formattedEvents.push({
          title: `Check-in - ${moment(checkIn).format("LT")}`, // Include time in the title
          start: new Date(checkIn),
          end: new Date(checkIn),
          allDay: true,
        });
      });

      checkOuts.forEach((checkOut) => {
        formattedEvents.push({
          title: `Check-out - ${moment(checkOut).format("LT")}`, // Include time in the title
          start: new Date(checkOut),
          end: new Date(checkOut),
          allDay: true,
        });
      });

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        views={["month", "week"]}
        selectable={true}
      />
    </div>
  );
};

export default AttendanceCalendar;
