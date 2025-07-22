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
    ]
    const company =[
        {id:1, name:'NC'},
        {id:2, name:'네이버'},
        {id:3, name:'다음'},
        {id:4, name:'MSN'},
        {id:5, name:'NVIDIA'},
        {id:6, name:'KAKAO'},
        {id:7, name:'NEXEN'},
    ]

    const department =[
        {id:2, name:'개발부', parentId:1, children:[
                {id:9, name:'개발1팀', parentId:2, children:[{id:20, name:'개발2-2팀', parentId:9}]},
                {id:10, name:'개발2팀', parentId:2},
                {id:11, name:'개발3팀', parentId:2},
                {id:12, name:'개발4팀', parentId:2},
            ]},
        {id:3, name:'영업부', parentId:1,children:[
                {id:13, name:'영업1팀', parentId:3},
                {id:14, name:'영업2팀', parentId:3},
                {id:15, name:'영업3팀', parentId:3},
                {id:16, name:'영업4팀', parentId:3},
            ]},
        {id:4, name:'기획부', parentId:1, children:[
                {id:17, name:'기획2팀', parentId:4},
                {id:18, name:'기획3팀', parentId:4},
                {id:19, name:'기획4팀', parentId:4},
            ]},
        {id:5, name:'경영부', parentId:1},
        {id:6, name:'인사부', parentId:1},
        {id:7, name:'재무부', parentId:1},
        {id:8, name:'사업부', parentId:1},
    ]

    const createdBy:Filter ={
        label:"등록자",
        key:'createdBy',
        data: user,
        target:['name', 'department.name', 'company.name'],
        searchBy:[{label:"부서별", data:department, listener:(v:any)=>console.log(v) }, ],
        type:'user'
    }

    const updatedBy:Filter ={
        label:"수정자",
        key: 'updatedBy',
        data: user,
        type:'user'
    }
    const depart:Filter ={
        label:"업무부서",
        key: 'department',
        data: department,
        type:'department',
        recursive:true
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

    const createdAt:Filter ={
        label:"기간검색",
        key:[{key:'createdAt', label:'등록일'},{key:'updatedAt', label:'수정일'},{key:'requestedAt', label:'요청일'}],
        data:[],
        type:'date'
    }

    const filters:Filter[] =[createdBy, createdAt, depart, requestedBy, updatedBy, fistMngCompany, secondMngCompany];


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
            <div style={{padding:'16px'}}>
                <JsSearchFilter
                    filter={filters}
                    onSearch={(v)=>console.log(v)}
                    onValueChange={(v)=>console.log(v)}
                    initialValues={{
                        createdBy:[1],
                        createdAt:{startDate:'2025-01-01', endDate:'2025-10-10'},
                        updatedAt:{startDate:'2025-01-01', },
                        requestedAt:{startDate:'2025-01-01', endDate:'2025-12-10'},
                    }}
                />
            </div>
        </div>
    </div>
  );
}

export default App;
