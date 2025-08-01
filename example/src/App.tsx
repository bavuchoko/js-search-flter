import {JsSearchFilter } from '@bavuchoko/js-search-filter'
import {Filter} from "../../src";
function App() {

    const user =[
        {id:1, name:'홍길동', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:2, name:'김길동', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:3, name:'최길동', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:4, name:'송길동', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:5, name:'김나리', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:6, name:'박기리', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:7, name:'홍길루', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:8, name:'김기동', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:9, name:'최기동', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:10, name:'송기동', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:11, name:'김기리', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:12, name:'박누리', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:13, name:'박누리1', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:14, name:'박누리2', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},
        {id:15, name:'박누리3', department:{id: 1, name:'개발부'}, company:{id:'1', name:'업체'}},

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
                {id:9, name:'개발1팀', parentId:2, children:[
                    {id:20, name:'개발1-1팀', parentId:9,
                        children:[
                            {id:23, name:'개발1-1-1팀', parentId:20,  children:[
                                    {id:30, name:'개발1-1-1-1팀', parentId:23},
                                    {id:31, name:'개발1-1-2-1팀', parentId:23},
                                    {id:32, name:'개발1-1-3-1팀', parentId:23},
                                ]},
                            {id:24, name:'개발1-1-2팀', parentId:20},
                            {id:25, name:'개발1-1-3팀', parentId:20},
                        ]},
                    {id:21, name:'개발1-2팀', parentId:9,children:[
                            {id:33, name:'개발1-2-1팀', parentId:21,  children:[
                                    {id:36, name:'개발1-2-1-1팀', parentId:33},
                                    {id:37, name:'개발1-2-1-2팀', parentId:33},
                                    {id:38, name:'개발1-2-1-3팀', parentId:33},
                                ]},
                            {id:34, name:'개발1-2-2팀', parentId:21},
                            {id:35, name:'개발1-2-3팀', parentId:21},
                        ]},
                    {id:22, name:'개발1-3팀', parentId:9},
                    ]},
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
        {id:8, name:'사업부1', parentId:1},
        {id:26, name:'사업부2', parentId:1},
        {id:27, name:'사업부3', parentId:1},
        {id:28, name:'사업부4', parentId:1},
        {id:29, name:'사업부5', parentId:1},
    ]

    const createdBy:Filter ={
        label:"등록자",
        key:'createdBy',
        data: {contents:user , page:{currentPage:0, totalPages:10, totalElements:100, size:10}, listener:(v:any)=>console.log(v)},
        target:['name', 'department.name', 'company.name'],
        searchBy:[
            {key:'department', label:"부서", data:department},
            {key:'company', label:"업체", data:company},
            {key:'location', label:"지역", data:department},
            {key:'authority', label:"권한", data:department},
        ],
        type:'user'
    }

    const updatedBy:Filter ={
        label:"수정자",
        key: 'updatedBy',
        data: {contents:user},
        type:'user'
    }
    const depart:Filter ={
        label:"업무부서",
        key: 'department',
        data: {contents:department},
        type:'department',
        recursive:true
    }

    const requestedBy:Filter ={
        label:"요청자",
        key:'requestedBy',
        data: {contents:user},
        type:'user'
    }

    const fistMngCompany:Filter ={
        label:"1차 업체",
        key:'fistMngCompany',
        data: {contents:company},
        type:'company'
    }

    const secondMngCompany:Filter ={
        label:"2차 업체",
        key:'secondMngCompany',
        data: {contents:company},
        type:'company'
    }

    const date:Filter ={
        label:"기간검색",
        key:[{key:'createdAt', label:'등록일'},{key:'updatedAt', label:'수정일'},{key:'requestedAt', label:'요청일'}],
        type:'date'
    }

    const filters:Filter[] =[createdBy, date, depart, requestedBy, updatedBy, fistMngCompany, secondMngCompany,];


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
                    onSearch={(v:any)=>console.log(v)}
                    onValueChange={(v:any)=>console.log(v)}
                />
            </div>
        </div>
    </div>
  );
}

export default App;
