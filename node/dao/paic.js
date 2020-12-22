const axios = require("axios");
function getPaics() {
    return new Promise((resolve, reject) => {
        // axios({
        //     url: "https://pacas-login.pingan.com.cn/cas/PA003/ICORE_PTS/auth.do",
        //     method: "post",
        //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //     data: qs.stringify({
        //         appId: "9e90f8465e5298ac015e7041fa150006",
        //         username: "SPTEA-20137",
        //         password: "E10AB3D5CFC650EDBA17B70DA87832B68F938A103FAB062E823ECFBA3303DCC859A16DAAA34DCBE4CDC95BF64161E595EB9B120594CB1FB02CFA9EDBCC1A62E0EB066DE83CA80498136C9BA23AF6E6A524DEE6246E1933846B12AE54C6CDF5E43A9618B19AF976E0B11277142ADA4C229D729D8E530EE797C5E485825A",
        //         randCodeId: "79aeda0759f14451a8edb4242f16a60e626289f2e-IC-9e90f8465e5298ac015e7041fa150006-118.116.15.178",
        //         code: "kl4s",
        //         ori: "",
        //         timestamp: "1606961223806",
        //         clientCallBack: "",
        //         challenge: "",
        //         seccode: "",
        //         validate: "",
        //     }),
        // }).then(res => {
        //     let content = res.data.content;
        //     const big_serve = "2266799831.62325.0000";
        //     const MEDIA_SOURCE_NAME = "ptsweb";
        //     const CAS_SSO_COOKIE = content.split("?")[1].split("&")[0].split("=")[1];
        //     const WLS_HTTP_BRIDGE_ICOREPTS = "f2Ishf33hylCDkZaSAZ-FdGRPIIhu7dqLMmxOiA-dws6n2KFQNXO!2021152470";
        //     const PASESSION = content.split("?")[1].split("&")[1].split("=")[1];
        //     const cookie = `BIGipServericore-pts_http_ng_PrdPool=${big_serve}; MEDIA_SOURCE_NAME=${MEDIA_SOURCE_NAME}; WLS_HTTP_BRIDGE_ICOREPTS=${WLS_HTTP_BRIDGE_ICOREPTS}; CAS_SSO_COOKIE=${CAS_SSO_COOKIE}; PASESSION=${PASESSION}`
        //     console.log(1111, cookie);
        //     axios.defaults.headers.common['Cookie'] = 'BIGipServericore-pts_http_ng_PrdPool=2266799831.62325.0000; MEDIA_SOURCE_NAME=ptsweb; CAS_SSO_COOKIE=9e90f8465e5298ac015e7041fa150006-d354959d9008404d9052cae0a0ca3524; PASESSION=Z3pH2ekQpHjgypYaq2I49xxleMe24JBiA6w4cjLgDwGExG-YpxDY509SIY8GKD8C-QhEd5aGiWl84kahv1j231n3fQkpUlopLszbdnPWojtlCZjsDBXDsG11V4xhWkE6rII5Ze8F7xtyZjFIOsbJzQ==|0CAyMj0xMMwwxCAiNTM0ODooNw==; WLS_HTTP_BRIDGE_ICOREPTS=YlYslOTJVCwN5ExUu4RIKqW3fIy2PAPrPIu6lFN5oG9fSY5feN5N!2021152470';
        //     axios.get("https://icore-pts.pingan.com.cn/ebusiness/auto/newness/toibcswriter.do?transmitId=apply&partnerCode=").then(res2 => {
        //         console.log(res2.data)
        //         resolve({ err: null, code: 200, data: res2.data })
        //     }).catch(err2 => {
        //         resolve({ err: null, code: 400, data: err2 })
        //     })
        // }).catch(err => {
        //     resolve({ err: null, code: 400, data: err })
        // })
            // let content = res.data.content;
            const big_serve = "2266799831.62325.0000";
            const MEDIA_SOURCE_NAME = "ptsweb";
            const CAS_SSO_COOKIE = `9e90f8465e5298ac015e7041fa150006-dd612008383f43f69cac25c84cc936b1`;
            const WLS_HTTP_BRIDGE_ICOREPTS = "WE0sogIBiX0BW7lliy_ixdYWWhxYWiJt7597Nsa-pxApOb53d41r!2021152470";
            const PASESSION = `Z3pH2ekQpHjgypYaq2I49184HZqNo0q!LJvw8SFI5zLhCeXYyWAb3WJXB9UQt8no-QhEd5aGiWl84kahv1j23-72PmF8cjqnr1clDppTn4l!zDST91En3QNWY9kkoymFwzk9iOfMRozq3Tjc42QI7A==|0CAyMj0xMMywxCAiNTMxMzooNQ==`;
            const cookie = `BIGipServericore-pts_http_ng_PrdPool=${big_serve}; MEDIA_SOURCE_NAME=${MEDIA_SOURCE_NAME}; WLS_HTTP_BRIDGE_ICOREPTS=${WLS_HTTP_BRIDGE_ICOREPTS}; CAS_SSO_COOKIE=${CAS_SSO_COOKIE}; PASESSION=${PASESSION}`
            console.log(1111, cookie);
            axios.defaults.headers.common['Cookie'] = "BIGipServericore-pts_http_ng_PrdPool=2233245399.62325.0000; MEDIA_SOURCE_NAME=ptsweb; WLS_HTTP_BRIDGE_ICOREPTS=6TQtFq2BvYgcrYB46i0fw-ZtjruTcgUmaWlTpAB8SdcdCwsU8kOE!1147823262; CAS_SSO_COOKIE=9e90f8465e5298ac015e7041fa150006-0fb0fdf6ce9449058cc4ca294168f5f9; PASESSION=Z3pH2ekQpHjgypYaq2I496SBG3hd1WRlgyTM72qIv!0OQl91nS2nf7x5fWLcsBQw-QhEd5aGiWl84kahv1j23-72PmF8cjqnr1clDppTn4n2ojwEzfjq9P-L2UsYpigxI6-Lr11fGsFImz2j4ZgM0A==|0CAyMj0xMNzwxCAiNzMzMDooNA==";
            axios.get("https://icore-pts.pingan.com.cn/ebusiness/frames/main_02.jsp").then(res => {
                axios.get("https://icore-pts.pingan.com.cn/ebusiness/auto/newness/toibcswriter.do?transmitId=apply&partnerCode=", 
                // {
                //     headers: {
                //         referer: "https://icore-pts.pingan.com.cn/ebusiness/auto/newness/ToIBCSWriterPartnerMark.do?transmitId=apply",
                //         host: "icore-pts.pingan.com.cn"
                //     }
                // }
                ).then(res2 => {
                    console.log(1111, res2.data)
                    resolve({ err: null, code: 200, data: res2.data })
                }).catch(err2 => {
                    resolve({ err: null, code: 400, data: err2 })
                })
            })
    })
}
module.exports = {
    getPaicsDao: getPaics,

}

// "BIGipServericore-pts_http_ng_PrdPool=2266799831.62325.0000; MEDIA_SOURCE_NAME=ptsweb; CAS_SSO_COOKIE=9e90f8465e5298ac015e7041fa150006-d354959d9008404d9052cae0a0ca3524; PASESSION=Z3pH2ekQpHjgypYaq2I49xxleMe24JBiA6w4cjLgDwGExG-YpxDY509SIY8GKD8C-QhEd5aGiWl84kahv1j231n3fQkpUlopLszbdnPWojtlCZjsDBXDsG11V4xhWkE6rII5Ze8F7xtyZjFIOsbJzQ==|0CAyMj0xMMwwxCAiNTM0ODooNw==; WLS_HTTP_BRIDGE_ICOREPTS=YlYslOTJVCwN5ExUu4RIKqW3fIy2PAPrPIu6lFN5oG9fSY5feN5N!2021152470"
// "BIGipServericore-pts_http_ng_PrdPool=2266799831.62325.0000; MEDIA_SOURCE_NAME=ptsweb; CAS_SSO_COOKIE=9e90f8465e5298ac015e7041fa150006-f687dcbef268490fa0d3d631ae7d88fb; PASESSION=Z3pH2ekQpHjgypYaq2I490r0JBuikBZ!aCHh78az36eQjNjTLiiMF4nWN7mWMf8m-QhEd5aGiWl84kahv1j23-72PmF8cjqnr1clDppTn4lzSjbIqcuJPuRLGBHzxh2IfHRf4ccsfRiCVWpxekjdsA==|0CAyMj0xMMxwxCAiNTMwNzooNw==; WLS_HTTP_BRIDGE_ICOREPTS=tRMsnITEetrIAMvdfVB_1gG0YVQsO4XS303UnbQC-tY5aFACaPxD!2021152470"