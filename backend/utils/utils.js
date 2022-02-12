module.exports = {
    getDateToday: () => {
        const today = new Date().toISOString().split('T')[0].replace(/-/g, '')
        return today;
    },
    makeDataTotal: (items) => {
        const arr = items.reduce((acc, cur) => {
            const currentDate = new Date(cur.createDt);
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const date = currentDate.getDate();
            const accExamCnt = cur.accExamCnt;
            const accExamCompCnt = cur.accExamCompCnt;
            const decideCnt = cur.decideCnt;
            const deathCnt = cur.deathCnt;
            const accDefRate = cur.accDefRate;

            const findItem = acc.find(a => a.year === year && a.month === month);
            
            // 년, 월에 해당하는 값이 계속 쌓아서 축적시켜서 넘기고 있는 반복문 때마다 계속 축적시킨 이 배열 acc 안에 들어 있지 않다면 추가 push
            if (!findItem) {
                acc.push({ year, month, date, accExamCnt, accExamCompCnt, decideCnt, deathCnt, accDefRate })
            }
            // 들어 있다면 날짜를 비교해서 큰 날짜 것만 저장되게 함
            if (findItem && findItem.date < date) {
                findItem.year = year;
                findItem.month = month;
                findItem.date = date;
                findItem.accExamCnt = accExamCnt;
                findItem.accExamCompCnt = accExamCompCnt;
                findItem.decideCnt = decideCnt;
                findItem.deathCnt = deathCnt;
                findItem.accDefRate = accDefRate;
            }
            return acc;
        }, []);
        return arr;
    },
    makeDataLocal: (items) => {
        const arr = items.reduce((acc, cur, index) => {
            const currentDate = new Date(cur.createDt);
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const date = currentDate.getDate();
            const gubun = cur.gubun;
            const incDec = cur.incDec;
            const qurRate = cur.qurRate;

            if (index < 19 * 7) {
                acc.push({ currentDate, year, month, date, gubun, incDec, qurRate })
            };
            return acc;
        }, []);
        return arr;
    },
    makeDataAgeSex: (items) => {

        let arr = items.filter((i, index) => index < 11 * 2);

        const confCaseToday = [];
        const deathCaseToday = [];

        for (let i = 0; i < 11; i++) {
            confCaseToday.push(arr[i].confCase - arr[i+11].confCase);
            deathCaseToday.push(arr[i].death - arr[i+11].death);
        }

        // JSON Obj에 새로운 key, value 추가하기
        arr.map((i, index) => {
            if (index < 11) {
                i.confCaseToday = confCaseToday[index];
                i.deathCaseToday = deathCaseToday[index];
            } else {
                i.confCaseToday = "null"
                i.deathCaseToday = "null"
            }
        }) 
        return [arr.slice(0, 9), arr.slice(9, 11)];
    },
    makeDataVaccinated: (items) => {
        const arr = items.reduce((acc, cur) => {
            
            return acc;
        }, []);
        return arr;
    },
    makeDataGlobal: (items) => {
        const arr = items.reduce((acc, cur) => {
            const currentDate = new Date(cur.Date);
            const TotalConfirmed = cur.TotalConfirmed;
            const TotalDeaths = cur.TotalDeaths;
            const NewConfirmed = cur.NewConfirmed;
            const NewDeaths = cur.NewDeaths;

            acc.push({ currentDate, NewConfirmed, NewDeaths, TotalConfirmed, TotalDeaths })
            return acc;
        }, []);
        return arr;
    },
    makeDataCountries: (items) => {
        const arr = items.reduce((acc, cur) => {
            const Country = cur.Country;
            const TotalConfirmed = cur.TotalConfirmed;

            acc.push({ Country, TotalConfirmed });
            return acc;
        }, []);
        return arr;
    }
}

/*
const currentDate = new Date(cur.createDt);
const year = currentDate.getFullYear();
const month = currentDate.getMonth();
const date = currentDate.getDate();
const gubun = cur.gubun;
const confCase = cur.confCase;
const confCaseRate = cur.confCaseRate;
const criticalRate = cur.criticalRate;
const death = cur.death;
const deathRate = cur.deathRate;
*/