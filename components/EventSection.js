import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
const axios = require('axios').default;

function EventSection() {
  const [sections, setSections] = useState([]);
  //從API SERVER抓資料
  async function loadEventSection() {
    let result = await axios.get('http://localhost:8080/api/event/section');
    result = result.data[0];
    setSections(result);
  }

  useEffect(() => {
    loadEventSection();
  }, []);
  // useEffect(() => {
  //   console.log(sections);
  // }, [sections]);

  const display = sections.map((section, index) => {
    return (
      <section
        className="bg-deep section"
        id={`section${index + 1}`}
        key={index}
        s_id={section.s_id}
      >
        <div className="h1 section-title col">
          {section.s_id === 4 ? '動態活動' : '靜態活動'}
        </div>
        <div className="h4 section-subtitle col">
          {section.s_id === 4
            ? '活著是一種美好, 應該用盡全力去珍惜, 從生活中體驗學習, 快來報名活動 !'
            : '生活是否太繁忙需要喘口氣, 別猶豫快來放鬆一下找回自我 !'}
        </div>
        <div className="card-wrapper d-flex flex-wrap col-auto justify-content-center mx-auto">
          <EventCard s_id={section.s_id} />
        </div>
      </section>
    );
  });
  return <>{display}</>;
}

export default EventSection;
