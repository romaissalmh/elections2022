import './App.css';
import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route,Routes } from "react-router-dom"
//compoenents
import DashboardView from './components/Dashboard/DashboardView'
import AnalyticsView from './components/Analytics/AnalyticsView'
import FirstRoundView from './components/Analytics/FirstRoundView'
import SecondRoundView from './components/Analytics/SecondRoundView'
import DemographicView from './components/Analytics/DemographicView'
import RegionsView from './components/Analytics/RegionsView'
import ExploreView from './components/Explore/ExploreView'
//styling sheets
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import {  FaBars } from 'react-icons/fa'; 
import { IntlProvider } from 'react-intl';
import messages from './components/messages';
import { install } from "resize-observer";
import AboutUsView from './components/AboutUs/AboutUsView';
import WhoSeesWhat from './components/Analytics/WhoSeesWhatView';


function App() {
  const [toggled, setToggled] = useState(false);
  const [locale, setLocale] = useState('fr');
  const [rtl, setRtl] = useState(false);
  useEffect(() => {
      if (typeof window !== "undefined") {
      install();
      }


  }, []);

  const handleRtlChange = (checked) => {
    setRtl(checked);
    setLocale(checked ? 'en' : 'fr');
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  
  return (
        <IntlProvider locale={locale} messages={messages[locale]}>

       <Router>
          <div className="App">
                <Header         
                handleRtlChange={handleRtlChange}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                rtl={rtl}
                />
                <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                  <FaBars />
                </div>
              
                <Routes>
                      <Route path="/"  element={<DashboardView rtl={rtl} />} />
                      <Route path="/aboutUs" element={<AboutUsView rtl={rtl} />}/>
                      <Route path="/dashboard" element={<DashboardView  rtl={rtl}/>}/>
                      <Route path="/analytics"  element={<AnalyticsView rtl={rtl} />}/>
                      <Route path="/analytics/firstround"  element={<FirstRoundView rtl={rtl} />}/>
                      <Route path="/analytics/secondround"  element={<SecondRoundView rtl={rtl} />}/>
                      <Route path="/analytics/demographics"  element={<DemographicView rtl={rtl} />}/>
                      <Route path="/analytics/regions"  element={<RegionsView rtl={rtl} />}/>
                      <Route path="/analytics/whoseeswhat" element={<WhoSeesWhat rtl={rtl}/>} />
                      <Route path="/explore" element={<ExploreView />}/>
                </Routes>
          </div> 
      </Router>
      </IntlProvider>

  );
}

export default App;

