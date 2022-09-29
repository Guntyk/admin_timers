import { useState, useRef, useEffect } from 'react';
import { timeFormatter } from '../../../helpers/timeFormatter';
import './User.css'

const rate = 0.02

export default function User({ user, setUsers }) {
  const [time, setTime] = useState(0);
  const timerIdRef = useRef(null);
  let price = Math.round((time / 60) * rate)

  useEffect(() => {
    if (user.start) {
      if (user.end) {
        setTime((user.end - user.start) / 1000);
      } else {
        setTime((Date.now() - user.start) / 1000);
        startTimer();
      }
    }
  }, []);

  function changeName(event) {
    const name = event.target.value.trim();
    setUsers((prev) => {
      const currentUser = prev.find((item) => item.id === user.id);
      currentUser.name = name;
      return [...prev];
    });
  }
  function changeHall(event) {
    const hall = event.target.value;
    setUsers((prev) => {
      const currentUser = prev.find((item) => item.id === user.id);
      currentUser.hall = hall;
      return [...prev];
    });
  }
  function changeType(event) {
    const type = event.target.value;
    setUsers((prev) => {
      const currentUser = prev.find((item) => item.id === user.id);
      currentUser.type = type;
      return [...prev];
    });
  }
  function start(event) {
    if (user.hall && user.type && user.name) {
      setUsers((prev) => {
        const currentUser = prev.find((item) => item.id === user.id);
        currentUser.start = Date.now();
        return [...prev];
      });
      startTimer();
      event.target.disabled = true;
    } else {
      alert('Fill all fields');
    }
  }
  function end() {
    setUsers((prev) => {
      const currentUser = prev.find((item) => item.id === user.id);
      currentUser.end = Date.now();
      return [...prev];
    });
    stopTimer();
  }
  function startTimer() {
    timerIdRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  }
  function stopTimer() {
    clearInterval(timerIdRef.current);
    timerIdRef.current = null;
  }
  function deleteUser() {
    if (user.end || !user.start) {
      setUsers((prev) => prev.filter((item) => item.id !== user.id));
    } else {
      alert('Please, end the session');
    }
  }
  return (
    <div className='client'>
      <button className='deleteBtn' onClick={deleteUser}><svg className='delete-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Delete</title><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg></button>
      <input
        className='input'
        type="text"
        name="name"
        onChange={changeName}
        defaultValue={user.name}
        placeholder="Name"
      />
      <div className="select">
        <select className='input hall' name="hall" defaultValue={user.hall} onChange={changeHall}>
          <option value="" disabled>
            Select hall
          </option>
          <option value="1">Hall 1</option>
          <option value="2">Hall 2</option>
          <option value="3">Hall 3</option>
          <option value="4">Hall 4</option>
        </select>
      </div>
      <div className="select">
        <select className='input type' name="type" defaultValue={user.type} onChange={changeType}>
          <option value="" disabled>
            Select type
          </option>
          <option value="private">Private</option>
          <option value="self">Self</option>
        </select>
      </div>
      <button className='btn userBtn' onClick={start}>
        {time < 1 ? `Start` : timeFormatter(time)}
      </button>
      <button className='btn userBtn'>Pause</button>
      <button className='btn userBtn' onClick={end}>Stop</button>
      <input className='btn price' type="text" readOnly value={price} />
    </div>
  );
}
