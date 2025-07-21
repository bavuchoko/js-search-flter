import React from 'react';
import JsSearchFilter from "./app/JsSearchFilter";
import {Filter} from "./app/type/Types";

function App() {

    const user =[
        {id:1, name:'홍길동', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:2, name:'김길동', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:3, name:'최길동', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:4, name:'송길동', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:5, name:'김나리', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:6, name:'박나리', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:7, name:'홍나리', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:8, name:'유나리', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:9, name:'김호떡', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:10, name:'박호떡', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:11, name:'유호떡', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:12, name:'최호떡', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:13, name:'유재길', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:14, name:'김재길', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:15, name:'황재길', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:16, name:'김태리', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:17, name:'박태리', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:18, name:'유태리', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:19, name:'황태리', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:20, name:'강산수', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:21, name:'홍산수', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:22, name:'최산수', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:23, name:'박산수', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:24, name:'이길순', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:25, name:'김길순', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:25, name:'황길순', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:25, name:'나길순', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
    ]
    const company =[
        {id:1, name:'NC'},
        {id:2, name:'네이버'},
        {id:3, name:'다음'},
        {id:4, name:'MSN'},
    ]
    const createdBy:Filter ={
        label:"등록자",
        key:'createdBy',
        data: user,
        groupBy:["departments", "company"],
        type:'user'
    }

    const updatedBy:Filter ={
        label:"수정자",
        key: 'updatedBy',
        data: user,
        type:'user'
    }

    const requestedBy:Filter ={
        label:"요청자",
        key:'requestedBy',
        data: user,
        type:'user'
    }

    const fistMngCompany:Filter ={
        label:"1차 업체",
        key:'fistMngCompany',
        data: company,
        type:'company'
    }


    const secondMngCompany:Filter ={
        label:"2차 업체",
        key:'secondMngCompany',
        data: company,
        type:'company'
    }


    const filters:Filter[] =[createdBy, requestedBy, updatedBy, fistMngCompany, secondMngCompany];


  return (
    <div className="App" style={{width:'100%', display:"flex"}}>

        {/*left*/}
        <div style={{width:'200PX', background:"#dbbbbb"}}>
            <p>
              A 영역
            </p>
        </div>

        {/*right*/}
        <div style={{width:'100%'}}>
            <div style={{width:'100%', height:'150px', background:"#b2a8a8"}}>B 영역</div>
            {/*<div style={{width:'200px', background:"beige"}}>*/}
            <div>
                <JsSearchFilter
                    filter={filters}
                    onSearch={(v)=>console.log(v)}
                    onValueChange={(v)=>console.log(v)}
                />
            </div>
        </div>
    </div>
  );
}

export default App;
