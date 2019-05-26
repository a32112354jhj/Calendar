import React from 'react';
import logo from './logo.svg';
import './style.css';
import classNames from 'classnames';
import moment from 'moment';

class App extends React.Component {


  state = {
    list_style: false,
    initYearMonth: '201705', //當前月份
    initYearMonth_next: '201706',
    initYearMonth_prev: '201704',
    data: {
      "guaranteed": true, // {boolean}
      "date": "2016/12/15", // {string} YYYY/MM/DD
      "price": "234567", // {string|number} XXXXXX | 近期上架
      "availableVancancy": 0, // {number}
      "totalVacnacy": 20, // {number}
      "status": "報名" // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
    },
  }

  // 列表模式切換========================================
  ListStatus = () => {
    if (this.state.list_style === true) {
      this.setState({
        list_style: false,
      });
    }
    else if (this.state.list_style === false) {
      this.setState({
        list_style: true,
      });
    }
  }

  // 年月處理=============================================
  YearMonth = () => {

    let month_li = [];

    let YearMonth = this.state.data.map((item, key) => {
      month_li.push(item.date.substr(0, 7));
    });

    let date_filter = month_li.filter(function (element, index, arr) {
      return arr.indexOf(element) === index;
    }).sort();

    // console.log(date_filter);

    // 取得月份天數
    console.log(moment("201905", "YYYYMM").daysInMonth());
  }

  // componentDidMount=====================
  componentDidMount() {

    fetch(
      '/json/data1.json'
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        this.setState({
          data: data,
        });
        this.YearMonth();
      })
      .catch(e => console.log('錯誤:', e));
  }
  // componentDidMount(E)===================

  render() {
    return (
      <div className="App">

        {/* 切換列表模式(.list_sty) */}
        <div className={classNames("calendar_box", { list_sty: this.state.list_style === true })}>
          <a href="javascript:;" className="list_switch" onClick={this.ListStatus}>
            <i className="fas fa-list"></i>
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

          }

          {/* HTML樣板 */}
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

