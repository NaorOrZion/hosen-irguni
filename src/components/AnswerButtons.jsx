import * as React from 'react';

function AnswerButtons() {
  return (
    <div className="answer-buttons">
      <button className="answer-button">שומעים קצת רעשים  בסיבוב – הצוות תרגל לאחרונה, אבל תכלס יש מה להשתפר...</button>
      <button className="answer-button">החלפנו גלגלים לא מזמן – הצוות סיים תרגל לאחרונה, מכיר את הנהלים ויודע לאן נוסעים</button>
      <button className="answer-button">לא יודע אם הרכב ישרוד את העליה לירושלים - הצוות לא הוכשר למשימה הנוכחית</button>
      <button className="answer-button">פנס רוורס לא עובד – הצוות תרגל לאחרונה, רק</button>
    </div>
  );
}

export default AnswerButtons;