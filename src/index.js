import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.Calendar = ReactDOM.render(<App
    dataSource= {'/json/data2.json'}
    // 輸入一開始要在哪一個月份 [string] YYYYMM，若輸入的年月沒有資料，
    // 就要找相近的年月，若前一個月後一個月都有資料，就顯示資料比數比較多的那一個月
    initYearMonth={'201702'}
    // 設定各資料的key
    dataKeySetting={
        {// 保證出團
            'guaranteed': 'guaranteed',
            // 狀態
            'status': 'status',
            // 可賣團位
            'available': 'availableVancancy',
            // 團位
            'total': 'totalVacnacy',
            // 價格
            'price': 'price'
        }
    }
    // 點上一個月時
    // @param $btn {$object} jquery 物件
    // @param $data {array} 上一個月的資料
    // @param module {object} 此模組實例物件
    onClickPrev={($btn, data, module)=>{
        console.log($btn, data, module);
    }}
    // 點下一個月時
    onClickNext={($btn, data, module)=> {
        console.log($btn, data, module);
    }}
    // 點日期時
    onClickDate={($date, data)=>{
        console.log($date, data);
    }} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
