import React from 'react';
import logo from './logo.svg';
import './style.css';

class App extends React.Component {

  state={
    
  }

  render() {
    return (
      <div className="App">

        {/* 切換列表模式(.list_sty) */}
        <div className="calendar_box">
          <a href="javascript:;" className="list_switch">
            <i class="fas fa-list"></i>
            切換列表顯示
        </a>

          {/* 日期選擇 */}
          <div className="switch_bar">
            <button type="button" className="ctrl_btn prev_btn">
            </button>
            <ul className="month_bar">
              <li className="month_box">
                <span>2019 7月</span>
              </li>
              <li className="month_box clk">
                <span>2019 8月</span>
              </li>
              <li className="month_box">
                <span>2019 9月</span>
              </li>
            </ul>
            <button type="button" className="ctrl_btn next_btn">
            </button>
          </div>

          {/* 星期 */}
          <ul className="week_bar">
            <li>星期日</li>
            <li>星期一</li>
            <li>星期二</li>
            <li>星期三</li>
            <li>星期四</li>
            <li>星期五</li>
            <li>星期六</li>
          </ul>

          {/* 日期 */}
          <div className="calendar_tb">
            <div className="day_box no_date">
            </div>
            <div className="day_box no_date">
            </div>
            <div className="day_box no_date">
            </div>
            <div className="day_box has_date has_data">
              <p className="day">1<span className="week_day">星期一</span></p>
              <p className="status">報名</p>
              <p className="available">可賣:<span>20</span></p>
              <p className="total">團位:<span>35</span></p>
              <p className="price">$28,000</p>
            </div>
            <div className="day_box has_date has_data">
              <p className="day">2<span className="week_day sunday">星期日</span></p>
              
              <p className="status alternate">候補</p>
              <p className="available">可賣:<span>20</span></p>
              <p className="total">團位:<span>35</span></p>
              <p className="price">$28,000</p>
            </div>
            <div className="day_box has_date">
              <p className="day">3</p>
            </div>
            <div className="day_box has_date">
              <p className="day">4</p>
            </div>
            <div className="day_box has_date">
              <p className="day">5</p>
            </div>
            <div className="day_box has_date has_data">
              <p className="day">6<span className="week_day">星期一</span></p>
              <p className="status">報名</p>
              <p className="available">可賣:<span>20</span></p>
              <p className="total">團位:<span>35</span></p>
              <p className="price">$28,000</p>
              <p className="guaranteed">成團</p>
            </div>
            <div className="day_box no_date">
            </div>
            <div className="day_box no_date">
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default App;


