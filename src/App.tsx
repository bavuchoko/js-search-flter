import React from 'react';
import JsSearchFilter from "./app/JsSearchFilter";

function App() {

    const user =[
        {id:1, name:'홍길동'},
        {id:2, name:'김길동'},
        {id:3, name:'최길동'},
        {id:4, name:'박길동'},
    ]
    const company =[
        {id:1, name:'NC'},
        {id:2, name:'네이버'},
        {id:3, name:'다음'},
        {id:4, name:'MSN'},
    ]
    const createdBy ={
        label:"등록자",
        data: user
    }

    const updatedBy ={
        label:"수정자",
        data: user
    }

    const requestedBy ={
        label:"요청자",
        data: user
    }

    const fistMngCompany ={
        label:"1차 업체",
        data: company
    }


    const secondMngCompany ={
        label:"2차 업체",
        data: company
    }
    const filters =[createdBy, requestedBy, updatedBy, fistMngCompany, secondMngCompany];
  return (
    <div className="App" style={{width:'100%', display:"flex"}}>

        {/*left*/}
        <div style={{width:'200PX', background:"#dbbbbb"}}>
            <p>
              TEST
            </p>
        </div>

        {/*right*/}
        <div style={{width:'100%'}}>
            <div style={{width:'100%', height:'150px', background:"#b2a8a8"}}></div>
            {/*<div style={{width:'200px', background:"beige"}}>*/}
            <div>
                <JsSearchFilter  filter={filters}/>
            </div>
        </div>
    </div>
  );
}

export default App;
