require('dotenv').config();
const express = require("express");
const path = require('path')
const app = express()
const hbs = require("hbs")



const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


app.set("view engine", "hbs")
app.use(express.static(publicDirectoryPath))
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.json())





app.get("", (req, res) => {
    let quickLinks = [
    
    {
        "name": "Hacker News",
        "link": "https://news.ycombinator.com",
        "description": "Stay up to date with news Stay up to date with news Stay up to date with news Stay up to date with news",
        "headerImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtAAAAFoCAMAAABJ+DwrAAAAV1BMVEX/iFb/////7+j/v6T/wab/39H/jFv/sZD/yrP/4tX/w6n/nHL/m3D/+fb/9O7/6N7/pYD/oHf/k2b/jl7//Pr/0r//l2v/uZz/2sv/1sX/tZb/rIn/ili9np4bAAAD/ElEQVR4Ae3dxUJcaRSF0V2GxV3f/8XiUoI79Kwlfe8A5z+11pzoByG75AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACW1SBL5+lB+qzPc0Eff6fPyUm6vdlMr+PT9Lvoj7e2yNIZZ+lsn6XPeS7q5/HFv1bMTtLv6cUj3DpMt5Msn2G4V84/pg5Bs3WcQgTN/ovUIWi2d1OIoHn4MAi6jqmgBV3Kj6dB0IWcB0EXsvUmN0/QmO4EjelO0Dx8HQRdx3SYmydoTHeCxnQnaLbeB0EXsvMiN07QmO4EjelO0ExHQdCFfDfdCdp0J2hMd4LGdCdoTHeCNt0haNOdoDHdCRrTnaAx3QnadIegK9jeD4IuZKNnukPQpjtBY7oTNKY7QfPGdCfoSrZemu4EXcnpQ9OdoAuZ9YU7ep32CJrhIJ12RmmPoDmamO4EXcnhmulO0JX0Bb21mvYImnnfdLf6IndK0JjuBM1s7wrTHeP8g5OHuaDJItdtdH6eLjsPcyGC5mw3d+/ow9ee6e7ZPDT3LQdfxul2kAYJmpW+oFfTHkGz2xfu8UraI2g2HqbT+TjtETSzjXQbPU97BM3Es+4EXcnnd+n2+1naI2i+vDHdCbqSnRemO0EXsrNjuhN0JQ8eme4EXch03XQn6Eomj013gi7k88B0J+hKFqY7QZdyZroTdCU/l2O6E7Tp7iztETTTh+m2/jwIuj1fTXelgsZ0d0Hj/IPhWi5oZZEbtXj33XR32aAZ7+aCjnPDTl9Me6a7w+Bbjub83DPdVQqa9b7p7jQIuj3Tw3TbeB4E3Z7DNdNdpaBZM91VC9p7oJvu6gftPdAPPqQQQTtf+G0lCLo9w4HprlDQHE1Md4I23Qm6Oaa7BylE0Ka7oxQiaNPdyYcg6PbM9kx3lYJmZLqrFDRH79JtYyV1CNr5wp2tIOgGraQWQTtfWIugnS8sRdDOF9YiaOcLSxG084W1CNr5wloE7XxhKYJ2vrAWQXsP9FIE7XxhLYJ2vrAUQTtfWIugnS+sRdDOF5YiaOcLEbTpTtANcL6wAkE7X1iIoBmkEEGzeJtCBM3pi5QiaOcLaxG084WlCNr5wkIEzeHjIGh/df5UGuA90CsStPdAZxxaNRunFl+hnS8sRdDOF9YiaOcLCxE0dxC0oDHdCRrTnaCdLyxA0M4XlgQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwFzesyUvtAbkUAAAAAElFTkSuQmCC"
        }, 
    
        {
            "name": "DEV Community  👩‍💻👨‍💻",
            "link": "https://dev.to",
            "description": "DEV Community is a page i follow",
            "headerImage": ""
        },
    {
        "name": "DZone",
        "link": "https://dzone.com",
        "description": "DZone articles are fun to read DZone articles are fun to read DZone articles are fun to read",
        "headerImage":"data:image/png;base64,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"
    },
    {
        "name": "StackShare",
        "link": "https://stackshare.io",
        "description": "Learn about stacks used in different orgs",
        "headerImage":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAcFBQYFBAcGBQYIBwcIChELCgkJChUPEAwRGBUaGRgVGBcbHichGx0lHRcYIi4iJSgpKywrGiAvMy8qMicqKyr/2wBDAQcICAoJChQLCxQqHBgcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKir/wAARCAJ2AqEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDOooor9YPyIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK7nwv8Mr/AFhEutVZrC0blVK/vJB7A9B7n8q58RiaWHhz1XZHTh8NVxM+SlG7OJiiknlWOGNpHY4VUXJP4V1mlfDPxFqSh5YI7GM97lsN/wB8gE/nivYNG8PaXoFuItMtUi/vSEZdvq3WtOvl8RxBNu1CNl3f+X/Dn1WG4dglevK77L/P/hjzKy+DcIAOo6tI57rBEFx+JJ/lWpF8JPD0f35r6X/elUfyUV3NFeTPNcbN61H8tD14ZTgoLSmvnr+Zw8vwl8Oyfckvov8AdmX+qmsy6+DdswJstXlQ9hNEG/UEV6XRRHNMbDao/wA/zCeVYKe9NfLT8jw3U/hh4i09WeGGK+jHe3fLf98nB/LNcnPbzWsxiuYZIZF6pIpUj8DX09VDVtD03XLfydUtI7hcfKzDDL9GHIr1cPxBUi7V43Xdb/19x5OI4dpyV6ErPs9v6+8+bKK9E8TfCq6sg9z4fdruEcm3f/WL9P738/rXnjKyMVcFWU4IIwQa+ow2Ko4mPNSdz5XE4SthZ8tWNvyEooorpOUKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAp0cbzSpFCjSSOwVUUZLE9AB3NNr2P4b+C10q0TWNSi/wBOmXMKOOYEPf2Yj8hx3NcOOxkMHS55b9F3O/A4KeNq+zjour7Id4H+HkOkxJqGtxJNft8yRN8ywf0Le/bt613tFFfnuIxNXE1HUqPX8vQ/RcNhqWFpqnSVl+fqFFFFc50hRRRQAUUUUAFFFFABXHeMvANp4ihe6sVS21IDIfGFm9m/xrsaK3oV6mHmqlN2ZhXw9PEU3Tqq6PmO7tJ7C8ltbyJoZ4m2ujDk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igAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvHfi5qv2nxBb6cjZSzi3OP9t+f/QQv517A7rHGzudqqCSfQV82azqL6vrd5fyZzcTM4B7DPA/AYFfRZBQ58Q6r+yvxf/AufOcQYjkw6pL7T/Bf8GxSooor7Y+FCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK9K+Dc4W/1WDu8Ub4/wB0kf8As1ea12PwuvxZeNoo3OFu4nhz78MP1XH4152Z03UwdSK7X+7U9LK6ip42nJ97ffoe40UUV+cH6WFFFFAHz746sH0/xtqSSDiWYzqfUP8AN/Uj8K5+vXviv4cN5p8etWqZltRsmAHWPPB/An8j7V5DX6PluIWIwsZLdaP1R+a5phnh8VKL2eq9GFFFFeieYFFFFABVnTrKTUtStrKD/WXEqxrx0ycZqtXofwn8PG71aTWbhD5NqCkJI4aQjk/gP5iuXGYhYahKq+n59DrweHeJrxpLrv6dT11EEcaonCqAB9KdRRX5ifqQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAHXrXzl4m0v+xvE1/YAYSKU+X/uHlf0Ir6NryX4waV5WpWWqRr8s8ZhkI/vLyPzBP/fNe/kNf2eJdN7SX4r+mfPZ/Q9phlUW8X+D0/yPN6KKK+5PgwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACrGn3smnalb3kH+st5VkX6g5qvRSaUlZlJuLuj6cs7uO+sYLuA7op41kQ+xGamrz34T6+LvR5NHuJP39od0QJ5aMn+h/mK9Cr8yxeHeGrypPp+XQ/UcHiI4mhGquv59QooorlOoRlV0KOoZWGCCMgivF/G/w+udGnl1DSYzNpzsWKKMtb57Ed19D+fqfaaK7sFjquDqc0Nnuu5wY7A0sbT5Z6NbPsfLtFe7658OdC1qVpxE9lO3V7YhQx9SuMfyrkbr4OXisfsWqwSL282Mof0zX2FHO8JUX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MNVw0+SrGzCiiiug5wooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA9Z+D+rebp97pUjfNC4njB/utw35ED/vqvSa+f/Aerf2P4yspWbbFM3kS84G1uOfocH8K+gK+Czuh7LFOS2lr/AJn6BkeI9rhFB7x0/wAv68gooorxD3QooooAKKKKAPD/AIoaV/Z/jGS4RcRXsazDA4DfdYfXIz/wKuNr2X4taX9r8Mw36DL2U3zHPRHwD/49srxqv0PKa/tsJFvdafd/wLH5xm9D2GMkls9fv/4Nwooor1TyQooooAKKKKACiiigAooooAKVVLMFUEknAAHWkr1n4aeC0gt49d1WHM7/ADWsb/wL/fx6nt6DmuPGYuGEpOpP5LuztwWDqYyqqcPm+yDwV8NY7ZYdS8RR75/vR2jD5U9C/qfbt3r0kAAAAYA6Ciivz3FYqriqnPUf/AP0bC4SlhKfJSX+bCiiiuU6gooooAKKKKACiiigArhPGnw5t9YR77RUS3vxy0Y+VJ/8G9+nr613dFdGHxNXDT9pTdmc+Jw1LE0/Z1Vdf1sfME8EttcPBcRtFLGxV0cYKkdQRTK9o+Ifgka3bNqmmoBqEKfOgH+vUf8AswHT16eleLkYOD1r9BwONhjKXPHfqux+dY/AzwVXklt0fcKKKK7zzwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigABIIIOCOhFfRvhnVRrXhmxv85eWICT/AHxw36g185V6v8H9W8yzvtJkbmJhPGPY8N+oH514Ge0PaYb2i3i/wf8ASPocgxHs8S6b2kvxX9M9Looor4Y+8CiiigAooooAp6tp6aro93YSYC3ELR5I+6SOD+B5r5rlieGZ4pVKOjFWU9QR1FfUFcDrPwqtdW1q6v01KS3FzIZDGIQ2GPXnPc5P419Bk2YU8K5wrOyf5nz2dZfVxahOirtafL+vzPG6K9W/4U1b/wDQZk/8Bx/8VR/wpq3/AOgzJ/4Dj/4qvof7awP8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6Z5H4V8ziOH3e9CXyf8An/wD6jDcRK1sRH5r/L/gn0FRXkdl8YtQjAGoaZb3HvE5jP67q1IvjJZH/XaTcJ/uSq39BXkzyfGxfwX9Gj14Z1gZL47eqZ6RRXnT/GLTB9zTLs/VlH9azLz4x3bZGn6TDF6NNKX/AEGKUMnxsn8FvmhzznAxXx39Ez1isbWvFmjaAp/tC9QSjpDH80h/AdPxxXjep/EDxHqiNHLqDQRN1S3UR/qOf1rmySzEsSSTkk969XD8Pu968vkv8zyMTxFG1sPH5v8Ay/4J23ij4l6hrIe20sNYWZ4OD+8kHuR0HsPzriKKK+noYelh4clJWR8viMTVxM+erK7CiiitznCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9k="
    }]

    let user = {
        "name": "Dev"
    }

    res.render('index', {
        quickLinks,
        user
    })
})


app.get("/signup",(req,res)=>{
    res.render('signup');
})

app.get("/login",(req,res)=>{
    res.render("login")
})

// add new items
app.post("/add",(req,res)=>{
    console.log(req.body)
    return res.sendStatus(200);
    
})



app.listen(3000, () => {
    console.log("Started on port 3000");

})