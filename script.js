const form = document.querySelector("form");
const input = document.querySelector(".search");
const clocation = document.querySelector(".location");
const time = document.querySelector(".time");
const day =  document.querySelector(".day");
const date = document.querySelector(".date");
const tempr = document.querySelector(".temp");
const humi = document.querySelector(".hum");
const wede = document.querySelector(".weather-desc");
const imege = document.querySelector("img");
const cont = document.querySelector(".container");
apikey = "988ee9c85e4d4a1cbe454244242009";


form.addEventListener("submit",search);
function search(e){
    e.preventDefault();
    const searchval = input.value;
    fetchdata(searchval);
}
async function fetchdata(location){

    let url =`//api.weatherapi.com/v1/current.json?key=${apikey}&q=${location}`;
    try{
    const res = await fetch(url);
    const data = await res.json();
    let temp = data.current.temp_c;
    let location  = data.location.name;
    let humidity = data.current.humidity;
    let desc = data.current.condition.text;
    let  icon = data.current.condition.icon;
    let datetime = data.current.last_updated;

    updateDom(temp,location,humidity,desc,icon,datetime);
    }catch(error){
        console.log("error",err);
    }

    function updateDom(temp,location,humidity,desc,icon,datetime){
        cont.style.display = "flex";
        const execttime = datetime.split(" ")[1];
        const exectdate = datetime.split(" ")[0];
        const exectday =  daysofweek(new Date(exectdate).getDay());
        clocation.innerText = location;
        tempr.innerText = `${temp}°C`;
        humi.innerText = `Humidity: ${humidity}%`;
        wede.innerText = desc;
        imege.src = icon; 
        console.log(execttime);
        console.log(exectdate);   
        console.log(exectday);
        time.innerText = execttime;
        day.innerText = exectday;
        date.innerText = exectdate;
        
    }
    function daysofweek(num){
        const days = ["Sunday","Monday","Tuseday","Wednesday","Thusday","Friday","Saturday"];
        return days[num];
    }

}
