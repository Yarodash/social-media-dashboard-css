import React, { useContext, useEffect, useState } from 'react';
import './App.css'

function numberToString(num) {
  if (num < 10000) {
    return num.toString();
  } else if (num < 10000000) {
    return Math.floor(num / 1000) + 'k';
  } else {
    return Math.floor(num / 1000000) + 'm';
  }
}

function IncreaseShow({ text, up }) {
  return (
    <div className={"difference " + (up ? "up" : "down")}>
      <img src={`/images/icon-${up?"up":"down"}.svg`} alt={up ? "+" : "-"}/>
      {text}
    </div>
  )
}

function FollowersCard({ username, followers_count, difference, category }) {
  return (
    <div className="card follower-card" data-category={category}>
      <div className='profile'>
        <img className='icon' src={`/images/icon-${category}.svg`} alt={category}/>
        <span className='username'>{username}</span>
      </div>
      <div className='followers_count'>{numberToString(followers_count)}</div>
      <div className='followers_text'>{category==='youtube'?"SUBSCRIBERS":"FOLLOWERS"}</div>
      <IncreaseShow text={Math.abs(difference) + ' Today'} up={difference >= 0}/>
    </div>
  )
}

function SmallCard({ name, category, value, difference }) {
  return (
    <div className="card small-card" data-category={category}>
      <div className='small-card-content'>
        <span className='name'>{name}</span>
        <img className='icon' src={`/images/icon-${category}.svg`} alt={category}/>
        <span className='value'>{numberToString(value)}</span>
        <IncreaseShow text={Math.abs(difference) + '%'} up={difference >= 0}/>
      </div>
    </div>
  )
}

const DarkModeContext = React.createContext();

function DarkModeSwitch() {
  const [isDark, setIsDark] = useContext(DarkModeContext);

  return (
    <div 
      className={'dark-switch' + (isDark ? " active" : "")}
      onClick={() => setIsDark(!isDark)}
    >
      <span>Dark Mode</span>
      <div className='switch'>
        <div className='switch-point'></div>
      </div>
    </div>
  )
}

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <DarkModeContext.Provider value={[isDark, setIsDark]}>
      <div className={"app " + (isDark ? "dark" : "light")}>
        <div className='padding'>
          <div className='header'>
            <div className='header__left'>
              <span className='title'>Social Media Dashboard</span>
              <span className='info'>Total Followers: 23,004</span>
            </div>
            <hr/>
            <DarkModeSwitch/>
          </div>
          <section className='section-followers'>
            <FollowersCard username="@nathanf" followers_count={1987} difference={12} category="facebook"/>
            <FollowersCard username="@nathanf" followers_count={1044} difference={12} category="twitter"/>
            <FollowersCard username="@realnathanf" followers_count={11734} difference={1099} category="instagram"/>
            <FollowersCard username="Nathan F." followers_count={8239} difference={-144} category="youtube"/>
          </section>
          <section className='section-overview'>
            <span className='title'>Overview - Today</span>
            <div className='cards'>
              <SmallCard name="Page Views" category="facebook" value={87} difference={3}/>
              <SmallCard name="Likes" category="facebook" value={52} difference={-2}/>
              <SmallCard name="Likes" category="instagram" value={5462} difference={2257}/>
              <SmallCard name="Profile Views" category="instagram" value={52000} difference={1375}/>
              <SmallCard name="Retweets" category="twitter" value={117} difference={303}/>
              <SmallCard name="Likes" category="twitter" value={507} difference={553}/>
              <SmallCard name="Likes" category="youtube" value={107} difference={-19}/>
              <SmallCard name="Total Views" category="youtube" value={1407} difference={-12}/>
            </div>
          </section>
        </div>
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;
