const headers = {
    facebook: {
        "accept-language": "es-AR,es-ES;q=0.9,es-US;q=0.8,es-419;q=0.7,es;q=0.6",
        "cookie": `sb=2iq3YFmTT10eCQeGxor9i01L; dpr=1.125; datr=qXglZFoEZbXbbe090056C3Tv; wd=1707x396; m_ls=%7B%22c%22%3A%7B%221%22%3A%22HCwAABaELRai2Kn5BhMEFtLE9Mudvi0A%22%2C%222%22%3A%22GSwVQBxMAAAWABbS4qvCDBYAABV-HEwAABYAFuziq8IMFgAAFigA%22%2C%225%22%3A%22GSwVNBxMAAAWABbu4qvCDBYAABWAARxMAAAWABbu4qvCDBYAABYoAA%22%2C%2216%22%3A%22FQQVCBmsFQQVdCbw4qvCDBYAABUEFWom8uKrwgwWAAAVBBViJu7iq8IMFgAAFQQVhgEm9OKrwgwWAAAVBBVuJvziq8IMFgAAFQQVOib44qvCDBYAABUEFQwm9uKrwgwWAAAVBBU8Jvjiq8IMFgAAFQQVYCb84qvCDBYAABUEFVIm-uKrwgwWAAAWABEmABYUAA%22%2C%2226%22%3A%22dummy_cursor%22%2C%2228%22%3A%221680177334%22%2C%22140%22%3A%22dummy_cursor%22%2C%22141%22%3A%22dummy_cursor%22%2C%22142%22%3A%22dummy_cursor%22%2C%22143%22%3A%22dummy_cursor%22%7D%2C%22d%22%3A%22f067bb97-06c1-46e6-a6cc-f3ada9f03dea%22%2C%22s%22%3A%220%22%7D; c_user=100025170301225; xs=32%3AG6Tl7lt8LygoLA%3A2%3A1680177952%3A-1%3A14162; fr=0qL0qKnOeCcv2E3uZ.AWXzrgK2nBLzvpZk70UHx1uLgus.BkJXit.1L.AAA.0.0.BkJXsg.AWX7V4G7qIw`,
        "origin": "https://www.facebook.com",
        "referer": "https://www.facebook.com",
        "sec-fetch-site": "none",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded",
    }
}

const params = {
    facebook: '&admin_queue_type=pending&count_badge_dom_id=count_badge_pending',
}

const body = {
    facebook: {
        __user: "100025170301225",
        __a: "1",
        fb_dtsg: "NAcMwWJpWj5MAvR5Egx90SL-D-3Yakh62bu4OsM6q03oId4-etrqwsQ:32:1680177952",
        __csr: "",
        __req: "3",
        __beoa: "0",
        __pc: "PHASED:DEFAULT",
        dpr: "1",
        __ccg: "GOOD",
    }
}

const bodyFormData = {
    facebook: new FormData()
}
for (let key in body.facebook) {
    bodyFormData.facebook.append(key, body.facebook[key]);
}

module.exports = {
    headers,
    params,
    body,
    bodyFormData
}