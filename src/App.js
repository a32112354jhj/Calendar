import React from 'react';
import logo from './logo.svg';
import './style.css';
import classNames from 'classnames';
import moment from 'moment';


class App extends React.Component {
  weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  
  // guaranteed=data.guaranteed;
  // date=data.date;
  // price=data.price;
  // availableVancancy=data.availableVancancy;
  // totalVacnacy=data.totalVacnacy;
  // status=data.status;

  constructor(props) {
    super(props)

    // 資料名----------------------------

    this.state = {
      list_style: false,
      initYearMonth: '201709', //當前年月
      initYearMonth_next: '201706',
      initYearMonth_prev: '201704',
      data: [{
        "guaranteed": true, // {boolean}
        "date": "2016/12/15", // {string} YYYY/MM/DD
        "price": "234567", // {string|number} XXXXXX | 近期上架
        "availableVancancy": 0, // {number}
        "totalVacnacy": 20, // {number}
        "status": "報名" // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
      }],
      getDays: 0,      //當前月份天數
      FirstDayWeek: 0,//當前月份第一天星期
      days: [],       //日期欄位
      days_nd: [],    //空欄位
      days_nda: [],   //補空欄位
    }

    this.YearMonth = this.YearMonth.bind(this);
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

    let month_li = [];//月份

    // let YearMonth = this.state.data.map((item, key) => {
    //   month_li.push(item.date.substr(0, 7));
    // });

    // Data月份排序
    // let date_filter = month_li.filter(function (element, index, arr) {
    //   return arr.indexOf(element) === index;
    // }).sort();

    // 取得月份天數
    let _this = this;
    this.setState({
      getDays: moment(this.state.initYearMonth, "YYYYMM").daysInMonth(),
      FirstDayWeek: moment(this.state.initYearMonth + "01", "YYYYMMDD").format('d')
    }, () => {
      _this.calendarDays()
    });
  }

  // 日曆日期===================================
  calendarDays = () => {
    let days_nd = []; //空日期
    let days = [];    //日曆日期
    let days_nda = []; //補空日期
    let vacancy = 42 - (parseInt(this.state.getDays) + parseInt(this.state.FirstDayWeek));

    for (var i = 0; i < this.state.FirstDayWeek; i++) {
      days_nd[i] = i;
    }

    // 塞入日期天數
    for (var x = 1; x <= this.state.getDays; x++) {
      let n = x;
      if (x < 10) {
        n = "0" + n;
      }
      days[x] = this.state.initYearMonth + n;
    }

    // 塞入空的天數
    for (var y = 1; y <= vacancy; y++) {
      days_nda[y] = y;
    }



    this.setState({
      days_nd: days_nd,
      days: days,
      days_nda: days_nda,
    }, () => {
      console.log('Date:' + this.state.days);
    });

    return;
  }


  // componentDidMount=====================
  componentDidMount() {
    this.YearMonth();

    fetch(
      '/json/data1.json'
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data,
        });
      })
      .catch(e => console.log('錯誤:', e));

  }

  // componentDidMount(E)===================

  // 塞入月曆內容===========================
  findData = (item) => {

    let row = this.state.data.find((item2) => {
      return item2.date == moment(item, 'YYYYMMDD').format('YYYY/MM/DD')
    })

    if (row) {
      return (
        <div className="day_box has_date has_data">
          <p className="day">{item.substr(6, 8)}
            <span className={moment(item).format('d') === '0' ? "week_day sunday" : "week_day"}>{this.weekList[moment(item).format('d')]}</span>
          </p>
          <p className={"status " + this.statusColor(row.status)}>{row.status}</p>
          <p className="available">可賣:<span>{row.availableVancancy}</span></p>
          <p className="total">團位:<span>{row.totalVacnacy}</span></p>
          <p className="price">${row.price.toLocaleString()}</p>

          <p className={row.guaranteed ? "guaranteed" : "guaranteed hide"}>成團</p>
        </div>
      )
    }

    return (
      <div className="day_box has_date no_data">
        <p className="day">{item.substr(6, 8)}
          <span className={moment(item).format('d') === '0' ? "week_day sunday" : "week_day"}>{this.weekList[moment(item).format('d')]}</span>
        </p>
      </div>
    );
  }

  // 狀態樣式=================================
  statusColor = (status) => {
    let statusClass = ['sign', 'alternate', 'cutoff'];
    if (status === "後補" || status === "請洽專員") {
      return statusClass[1];
    }
    else if (status === "報名" || status === "預定") {
      return statusClass[0];
    }
    else if (status === "額滿" || status === "關團" || status === "截止") {
      return statusClass[2];
    }
  }

  render() {

    return (
      <div className="App">

        {/* 切換列表模式(.list_sty) */}
        <div className={classNames("calendar_box", { list_sty: this.state.list_style === true })}>
          <a href="javascript:;" className="list_switch" onClick={this.ListStatus}>
            <i className="fas fa-list"></i>
            切換列表顯示
          </a>

          {/* 月份選擇 */}
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
            {
              this.weekList.map((item, key) => {
                return (
                  <li key={key}>{item}</li>
                )
              })
            }
          </ul>

          {/* 日期 */}

          <div className="calendar_tb">
            {/* 空(前) */}
            {
              this.state.days_nd.map((item, key) => {
                return (
                  <div className="day_box no_date" key={key}>
                  </div>
                )
              })
            }

            {
              this.state.data.map((item, index, arr) => {
                index = item["date"];
                if (index === "2017/09/09") {
                  console.log(item["price"])
                }
              })
            }

            {
              this.state.days.map((item, key) => {
                return (
                  this.findData(item)
                )
              })
            }

            {/* 空(後) */}
            {
              this.state.days_nda.map((item, key) => {
                return (
                  <div className="day_box no_date" key={key}>
                  </div>
                )
              })
            }

            {/* HTML樣板 */}
            {/* <div className="day_box no_date">
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
            </div> */}

          </div>
          {/* calendar_tb(END) */}

        </div>
      </div>
    );
  }
}

export default App;

