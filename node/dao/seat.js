const axios = require("axios");
function getSeat() {
    return new Promise((resolve, reject) => {
            // const big_serve = "2266799831.62325.0000";
            // const MEDIA_SOURCE_NAME = "ptsweb";
            // const CAS_SSO_COOKIE = `9e90f8465e5298ac015e7041fa150006-dd612008383f43f69cac25c84cc936b1`;
            // const WLS_HTTP_BRIDGE_ICOREPTS = "WE0sogIBiX0BW7lliy_ixdYWWhxYWiJt7597Nsa-pxApOb53d41r!2021152470";
            // const PASESSION = `Z3pH2ekQpHjgypYaq2I49184HZqNo0q!LJvw8SFI5zLhCeXYyWAb3WJXB9UQt8no-QhEd5aGiWl84kahv1j23-72PmF8cjqnr1clDppTn4l!zDST91En3QNWY9kkoymFwzk9iOfMRozq3Tjc42QI7A==|0CAyMj0xMMywxCAiNTMxMzooNQ==`;
            // const cookie = `BIGipServericore-pts_http_ng_PrdPool=${big_serve}; MEDIA_SOURCE_NAME=${MEDIA_SOURCE_NAME}; WLS_HTTP_BRIDGE_ICOREPTS=${WLS_HTTP_BRIDGE_ICOREPTS}; CAS_SSO_COOKIE=${CAS_SSO_COOKIE}; PASESSION=${PASESSION}`
            // axios.defaults.headers.common['Cookie'] = "BIGipServericore-pts_http_ng_PrdPool=2233245399.62325.0000; MEDIA_SOURCE_NAME=ptsweb; WLS_HTTP_BRIDGE_ICOREPTS=6TQtFq2BvYgcrYB46i0fw-ZtjruTcgUmaWlTpAB8SdcdCwsU8kOE!1147823262; CAS_SSO_COOKIE=9e90f8465e5298ac015e7041fa150006-0fb0fdf6ce9449058cc4ca294168f5f9; PASESSION=Z3pH2ekQpHjgypYaq2I496SBG3hd1WRlgyTM72qIv!0OQl91nS2nf7x5fWLcsBQw-QhEd5aGiWl84kahv1j23-72PmF8cjqnr1clDppTn4n2ojwEzfjq9P-L2UsYpigxI6-Lr11fGsFImz2j4ZgM0A==|0CAyMj0xMNzwxCAiNzMzMDooNA==";
            axios.get("https://gw.hainishuo.com/movie/movieapitpp/cinema/getSeatPlan?scheduleId=815796874", {
                params: {
                    // d: "W3siY2giOiJCYWlkdSIsInNjIjoiMTQ0MCo5MDAiLCJ1dWlkIjoiM0Q0RjhCODA0MzUwMTFFQjhGOTgzNTlEOUE3RjNGMTg4MjgyQTRDNjgwMTE0MDhGOTBCM0RDM0ZFMDJFRDIxQiIsImN0Ijoid3d3IiwidXRtIjp7InV0bV9zb3VyY2UiOiJCYWlkdSIsInV0bV9tZWRpdW0iOiJvcmdhbmljIn0sImFwcG5tIjoibW92aWUiLCJzZGtfZW52Ijoib25saW5lIiwiZXZzIjpbeyJubSI6Ik1DIiwidG0iOjE2MDg1MzA5MzEyNjgsIm50IjowLCJpc2F1dG8iOjcsInJlcV9pZCI6IjE3NjgzZThlMGU1LTcyOTgtMjczMyIsInNlcSI6MTEzLCJseF9pbm5lcl9kYXRhIjp7ImN2IjoicHJvZCIsIndlYiI6MSwicHJveHkiOjEsImJ0b2EiOnRydWUsImF0b2IiOnRydWUsIl9hcGkiOiJ2MyIsImh0IjpmYWxzZX0sImNpZCI6ImNfMnl6ZDB4cDUiLCJiaWQiOiJiX3M3ZWlpaWpmIiwibGFiIjp7InBhZ2UiOnt9LCJjdXN0b20iOnsiX2FjdCI6InNlYXQtY2xpY2sifX19XSwic3YiOiI0LjE4LjciLCJtcyI6IjE3NjgzZDgyOTA3LWUzYi03ZmMtNmZmIiwiYyI6Im1vdmllIiwibHhpZCI6IjE3NjgzZDgyOTA2YzgtMDdiY2VhNTllMDUyZDUtMzI2NzcwMDctMTNjNjgwLTE3NjgzZDgyOTA2YzgifV0%3D",
                    // t: 1,
                    // r: "17683ea2e448",
                    // _lxsdk_rnd: "17683ea2e459",
                }
            }).then(res => {
                resolve({ err: null, code: 200, data: res.data })
            }).catch(err => {
                resolve({ err: null, code: 400, data: err })
            })
    })
}
module.exports = {
    getSeatDao: getSeat,

}