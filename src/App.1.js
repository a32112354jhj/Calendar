import React from 'react';
import logo from './logo.svg';
import './style.css';
import classNames from 'classnames';
import moment from 'moment';


class App extends React.Component {
  weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  constructor(props) {
    super(props)

    this.state = {
      listStyle: false,
      initYearMonth: props.initYearMonth, //當前年月
      initYearMonthNext: '201706',
      initYearMonthPrev: '201704',
      showYearMonth: props.initYearMonth,
      data: [{
        "guaranteed": true, // {boolean}
        "date": "2016/12/15", // {string} YYYY/MM/DD
        "price": "234567", // {string|number} XXXXXX | 近期上架
        "availableVancancy": 0, // {number}
        "totalVacnacy": 20, // {number}
        "status": "報名" // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
      }],
      getDays: 0,      //當前月份天數
      FirstDayWeek: 0, //當前月份第一天星期
      days: [],        //日期欄位
      daysLatticeBefore: [],    //空欄位
      daysLatticeAfter: [],   //補空欄位
    }

    this.YearMonth = this.YearMonth.bind(this);
  }



  // 列表模式切換========================================
  upateListStatus = () => {
    this.setState({
      listStyle: !this.state.listStyle,
    });
  }

  // 年月處理=============================================
  YearMonth = (change) => {

    let monthList = [], //Data月份
      yearMonthPosition = 0; //位置
      
    this.state.data.map((item, key) => {
      monthList.push(moment(item.date.substr(0, 7), "YYYY/MM").format("YYYYMM"));
    });
    monthList = [...(new Set(monthList))].sort(); //篩選重複、排序
    
    yearMonthPosition = monthList.indexOf(this.state.initYearMonth);

    if (change === 'next') {
      if (yearMonthPosition < monthList.length - 2) {
        yearMonthPosition += 1;

        console.log(this.state.showYearMonth);
      }
    }
    else if (change === 'prev') {
      if (yearMonthPosition > 1) {
        yearMonthPosition -= 1;
        console.log(this.state.showYearMonth);
      }
    }

    // 取得月份天數
    this.setState({
      getDays: moment(this.state.initYearMonth, "YYYYMM").daysInMonth(),
      FirstDayWeek: moment(this.state.initYearMonth + "01", "YYYYMMDD").format('d'),
      initYearMonth: monthList[yearMonthPosition],
      initYearMonthNext: monthList[yearMonthPosition + 1],
      initYearMonthPrev: monthList[yearMonthPosition - 1],
    }, () => {
      this.calendarDays()
    });
  }

  // 日曆日期===================================
  calendarDays = () => {
    let daysLatticeBefore = []; //日期空格(前)
    let days = [];              //日曆日期
    let daysLatticeAfter = [];  //日期空格(後)
    let vacancy = 42 - (parseInt(this.state.getDays) + parseInt(this.state.FirstDayWeek));

    for (var i = 0; i < this.state.FirstDayWeek; i++) {
      daysLatticeBefore[i] = i;
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
      daysLatticeAfter[y] = y;
    }

    this.setState({
      daysLatticeBefore: daysLatticeBefore,
      days: days,
      daysLatticeAfter: daysLatticeAfter,
    }, () => {
      // console.log('Date:' + this.state.days);
    });

    return;
  }

  // 塞入月曆內容===========================
  findData = (item, key) => {

    let row = this.state.data.find((item2) => {
      return item2.date == moment(item, 'YYYYMMDD').format('YYYY/MM/DD')
    })

    if (row) {
      // Data值
      let guaranteedData = row.guaranteed || row.certain,
        dateData = row.date,
        priceData = row.price,
        availableVancancyData = row.availableVancancy || row.onsell,
        totalVacnacyData = row.totalVacnacy || row.total,
        statusData = row.status || row.state;

      return (
        <div className="day_box has_date has_data" key={key}>
          <p className="day">{item.substr(6, 8)}
            <span className={moment(item).format('d') === '0' ? "week_day sunday" : "week_day"}>{this.weekList[moment(item).format('d')]}</span>
          </p>
          <p className={"status " + this.statusColor(statusData)}>{statusData}</p>
          <p className="available">可賣:<span>{availableVancancyData}</span></p>
          <p className="total">團位:<span>{totalVacnacyData}</span></p>
          <p className="price">${priceData.toLocaleString()}</p>

          <p className={guaranteedData ? "guaranteed" : "guaranteed hide"}>成團</p>
        </div>
      )
    }

    return (
      <div className="day_box has_date no_data" key={key}>
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

    // componentDidMount=====================
    componentDidMount() {

      fetch(
        '/json/data1.json'
      )
        .then(res => res.json())
        .then(data => {
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
        <div className={classNames("calendar_box", { list_sty: this.state.listStyle === true })}>
          <a href="javascript:;" className="list_switch" onClick={this.upateListStatus}>
            <i className="fas fa-list"></i>
            切換列表顯示
          </a>

          {/* 月份選擇 */}
          <div className="switch_bar">
            <button type="button" className="ctrl_btn prev_btn" onClick={() => this.YearMonth('prev')}>
            </button>
            <ul className="month_bar">
              <li className="month_box">
                <span>{moment(this.state.initYearMonthPrev, "YYYYMM").format("YYYY M月")}</span>
              </li>
              <li className="month_box clk">
                <span>{moment(this.state.initYearMonth, "YYYYMM").format("YYYY M月")}</span>
              </li>
              <li className="month_box">
                <span>{moment(this.state.initYearMonthNext, "YYYYMM").format("YYYY M月")}</span>
              </li>
            </ul>
            <button type="button" className="ctrl_btn next_btn" onClick={() => this.YearMonth('next')}>
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
            {/* 空格(前) */}
            {
              this.state.daysLatticeBefore.map((item, key) => {
                return (
                  <div className="day_box no_date" key={key}>
                  </div>
                )
              })
            }

            {/* 日曆格子 */}
            {
              this.state.days.map((item, key) => {
                return (
                  this.findData(item, key)
                )
              })
            }

            {/* 空格(後) */}
            {
              this.state.daysLatticeAfter.map((item, key) => {
                return (
                  <div className="day_box no_date" key={key}>
                  </div>
                )
              })
            }

          </div>
          {/* calendar_tb(END) */}

        </div>
      </div>
    );
  }
}

export default App;

