// express 모듈 셋팅
const express = require('express');
const app = express(); 
app.listen(8888);

// data 셋팅
let user1 = {
    userName : "김김김",
    email : "kim@programmers.co.kr",
    age: 14,
    sex: "F"
}

let user2 = {
    userName : "이이이",
    email : "lee@programmers.co.kr",
    age: 21,
    sex: "M"
}

let user3 = {
    userName : "박박박",
    email : "park@programmers.co.kr",
    age: 22,
    sex: "M"
}


let db = new Map();
let id = 1; // id (map의 키 값)

db.set(id++, user1);
db.set(id++, user2);
db.set(id++, user3);

// id 별 조회
app.get('/users/:id', (req, res) => {
    let {id} = req.params; // Destructuring 문법
    id = parseInt(id);
    let user = db.get(id);

    if (user) {
        user.id = id; // id 필드 추가
        res.json(user);
    } else {
        res.json({
            msg: "등록된 회원이 아닙니다"
        });
    }
})

// 등록 
app.use(express.json()); // http 외 모듈인 미들웨어 json 설정
app.post('/user', (req, res) => {
    const userdata = req.body;
    const userage = userdata.age;
    if (userage < 14) {
        res.json({
            msg: "14세 미만은 가입이 불가능합니다"
        });
    } else {
        db.set(id++, userdata); // 회원등록
        res.json({
            msg: `${userdata.userName}님의 회원 등록이 완료되었습니다!`
        });
    }
})