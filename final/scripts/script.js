//----Loading----
let mainanim = document.querySelector('.load-container');

setTimeout(function(){
    mainanim.classList.remove('_animofbg');
    document.querySelector('#setblock').style.display = 'none';
    document.querySelector('.all-body').style.display = 'block';
},3000)
    document.querySelector('#setblock').style.display = 'block';
    document.querySelector('.all-body').style.display = 'none';


//----60second----
function time() {
    let time;
    let i = 0;
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;
    window.onclick = resetTimer;
    window.addEventListener('scroll', resetTimer, true);

    function closesms() {
        setTimeout(function(){
            document.querySelector('.confirm__no').onclick = function(){
                window.close();
            }
            if(i == 0){window.close();}
        },10000);
        document.querySelector('.confirm').style.display = 'block';
        document.querySelector('.confirm__yes').onclick = function(){
            resetTimer();
            document.querySelector('.confirm').style.display = 'none';
            i++;
        };
    }
    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(closesms, 60000)
    }
};
time();

//----Day-Night----
const togglebtn = document.querySelector('.nav-toggle');
let dateObj = new Date();
let hour = dateObj.getHours() * 100 + dateObj.getMinutes();

if (hour >= 2100 || hour <= 600)  {
    togglebtn.classList.toggle('act');
    document.documentElement.setAttribute('theme','dark');
}
togglebtn.addEventListener('click', () =>{
    togglebtn.classList.toggle('act');
    document.documentElement.setAttribute('theme','dark');
    if(!togglebtn.classList.contains('act')){
        document.documentElement.removeAttribute('theme','dark');
    }
});

//----Menu----
const iconMenu = document.querySelector('.nav-icon');
const bodyMenu = document.querySelector('.nav-all-menu');
const navMenu = document.querySelector('.nav');
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle('_lock');
    bodyMenu.classList.toggle('_active');
    iconMenu.classList.toggle('_active');
    navMenu.classList.toggle('_active');
  });
}
if (iconMenu.classList.contains('_active')) {
  bodyMenu.classList.remove('_active');
  iconMenu.classList.remove('_active');
  navMenu.classList.remove('_active');
}

//----Progress Bar----
const progress = document.querySelector('.progress');
window.addEventListener('scroll',progbar);

function progbar(e){
    let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let Height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let persent = windowScroll / Height * 100;

    progress.style.width = persent + '%';
}

//----Validation----
let regname = /^[A-Z]+[a-zA-Z]*$/;
let regemail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
let regsub = /[a-zA-ZА-Яа-яіІЇї]/;

let inp = document.querySelectorAll('.text');
let nameinp = document.querySelector('.name');
let emailinp = document.querySelector('.email');
let subinp = document.querySelector('.sub');

let arrofname = [];
let arrofemail = [];
let arrofsub = [];

function validname(name){
    return regname.test(name);
}

function validemail(email){
    return regemail.test(email);
}

function validsub(sub){
    return regsub.test(sub);
}

document.querySelector('.butn').onclick = function(){
    let nameval = nameinp.value,
        emailval = emailinp.value,
        subval = subinp.value;
    
    inp.forEach(function(inp){
        if(inp.value === ''){
            inp.classList.add('_error');
            return false;
        }else{
            inp.classList.remove('_error');
        }
    })

    if(!validname(nameval)){
        nameinp.classList.add('_error');
        return false;
    }else{
        nameinp.classList.remove('_error');
    }
    if(!validemail(emailval)){
        emailinp.classList.add('_error');
        return false;
    }else{
        emailinp.classList.remove('_error');
    }
    if(!validsub(subval)){
        subinp.classList.add('_error');
        return false;
    }else{
        subinp.classList.remove('_error');
    }
    arrofname.push(nameval);
    localStorage.setItem("names", JSON.stringify(arrofname));
    arrofemail.push(emailval);
    localStorage.setItem("emails", JSON.stringify(arrofemail));
    arrofsub.push(subval);
    localStorage.setItem("subjects", JSON.stringify(arrofsub));

    if(subval === "зробити замовлення" || subval === "Зробити замовлення"){
        let bodycontainer = document.querySelector('.body');
        let animationblock = document.querySelector('.animation-of-order');
        let anim = document.querySelector('.text-spans');
        setTimeout(function(){
            bodycontainer.style.display = 'block';
            animationblock.style.display = 'none';
            anim.classList.remove('_animate');
        },3000);
        bodycontainer.style.display = 'none';
        animationblock.style.display = 'block';
        anim.classList.add('_animate');
    }

}
//----API----
let weather = {
    key: "44c96a1d27f74983bd7bfac03e8d305c",
    urlweater: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            +"&units=metric&appid="
            + this.key)
        .then((response) => response.json())
        .then((data) => this.displaywether(data));
    },
    displaywether: function(data){
        const {name} = data;
        const{icon, description} = data.weather[0];
        const{temp, humidity} = data.main;

        document.querySelector(".weather__city").innerText = name;
        document.querySelector(".weather__icon").src= "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        document.querySelector(".weather__description").innerText = description;
        document.querySelector(".weather__humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".weather__temp").innerText = temp + "°C";

    },
    info: function(){
        this.urlweater(document.querySelector(".search__bar").value);
    }
};

document.querySelector(".search__btn").addEventListener("click", function(){
    weather.info();
});

document.querySelector(".search__bar").addEventListener("keyup", function(event){
    if (event.key == "Enter") { weather.info();}
});

//----Animation Scroll----
let scrollelem = document.querySelectorAll('.anim-item');

window.addEventListener('scroll',scrollanimate);
function scrollanimate(){
    for(let i = 0; i<scrollelem.length; i++){
        const elem = scrollelem[i];
        const elemh = elem.offsetHeight;
        const elemposition = offset(elem).top;
        const startanimate = 5;

        let point = window.innerHeight - elemh / startanimate;
        if (elemh > window.innerHeight){
            point = window.innerHeight - window.innerHeight / startanimate;
        }

        if((pageYOffset > elemposition - point && pageYOffset < (elemposition + elemh))){
            elem.classList.add('_activean');
        } else{
            elem.classList.remove('_activean');
        }
    }
}
function offset(el){
    const g = el.getBoundingClientRect();
    const leftscrl = window.pageXOffset || document.documentElement.scrollLeft;
    const topscrl = window.pageYOffset|| document.documentElement.scrollTop;
    return {top: g.top + topscrl, left: g.left + leftscrl}
}

//----Scroll All----
let container = document.querySelector('#father');
let counter = 1;
const cards = document.querySelectorAll('.news-blog');
document.querySelector('.all-button').onclick = function(){
    addfirstblock();
    document.querySelector('.all-button').hidden = true;
    document.querySelector('.blog-border-bottom').style.bottom = 0.5+'%';
    document.querySelector('.all-button-remove').hidden = false;
        const observe = new IntersectionObserver(entries =>{
            entries.forEach(blockelem => {
                blockelem.target.classList.toggle("_activean", blockelem.isIntersecting);
            })
            const lastcard = entries[0];
            if (!lastcard.isIntersecting) return;
            if(counter < 15)
            {
                addblock();
            }
            counter ++;
            console.log(counter);
            observe.unobserve(lastcard.target);
            observe.observe(document.querySelector(".news-blog:last-child"));
        }, {
            threshold: 1,
        });
    
        observe.observe(document.querySelector(".news-blog:last-child"));
    
        cards.forEach(blockelem => {
            observe.observe(blockelem);
            
    });
}
document.querySelector('.all-button-remove').onclick = function(){
    document.querySelector('.all-button').hidden = false;
    document.querySelector('.all-button-remove').hidden = true;
    counter = 1;
    document.querySelector('.blog-border-bottom').style.bottom = 2+'%';
    document.querySelector('.paddingforblock').remove();
}

function addblock(){
    let newcontainer = document.querySelector('.paddingforblock');
    const blockel = document.createElement('div');
    blockel.classList.add('news-blog');
    blockel.innerHTML = `
    <div class="img-box anim-item _activean"></div>
    <div class="text-box anim-item _activean">
        <p class="text-box__title">Add block</p>
        <p class="text-box__subtitle">JULY 28, 2014 // ADMIN // FUN, TRENDS, WEB DESIGN <span style="padding-left: 38%;">NO RESPONSE</span></p>
        <hr style="float: left;"> <br>
        <p class="text-box__text">Many of the content, and often about their precious turfpossessed selves and principles are shortcomings of seeing and colors to cover up a paucity of design. Zero out your interface. I think that are deep and profound indeed, these tasks and showing. (MORE…)</p>
    </div>`;
    newcontainer.appendChild(blockel);
}
 function addfirstblock(){
    const blockelem = document.createElement('div');
    blockelem.classList.add('paddingforblock');
    blockelem.innerHTML = `
    <div class="news-blog">
    <div class="img-box anim-item _activean"></div>
    <div class="text-box anim-item _activean">
        <p class="text-box__title">Add block</p>
        <p class="text-box__subtitle">JULY 28, 2014 // ADMIN // FUN, TRENDS, WEB DESIGN <span style="padding-left: 38%;">NO RESPONSE</span></p>
        <hr style="float: left;"> <br>
        <p class="text-box__text">Many of the content, and often about their precious turfpossessed selves and principles are shortcomings of seeing and colors to cover up a paucity of design. Zero out your interface. I think that are deep and profound indeed, these tasks and showing. (MORE…)</p>
    </div>
    </div>`;
    container.appendChild(blockelem);
 }

 //----Filter----
 let json = [{
    "name":"GALLERIES ARE FUNNY",
    "date":"12.01.2005",
    "technologies":"html css js",
    "cost":"100$",
    "category":"design",
    "pngimg":"photo",
    "foto":"d1"
},{
    "name":"A VIMEO REEL",
    "date":"13.05.2020",
    "technologies":"html css",
    "cost":"20$",
    "category":"videos",
    "pngimg":"tv2",
    "foto":"w1"
},{
    "name":"LOVE FOR OLD CAMERAS",
    "date":"01.01.2019",
    "technologies":"html css js",
    "cost":"55$",
    "category":"logo",
    "pngimg":"sound",
    "foto":"l1"
},{
    "name":"YOUTUBE VIDEO",
    "date":"04.04.2018",
    "technologies":"html",
    "cost":"10$",
    "category":"videos",
    "pngimg":"tv2",
    "foto":"w2"
},{
    "name":"ANOTHER EXTERNAL LINK",
    "date":"19.02.2022",
    "technologies":"html css",
    "cost":"30$",
    "category":"resources",
    "pngimg":"clip",
    "foto":"r1"
},{
    "name":"DETAILED PROJECT PAGE",
    "date":"15.09.2005",
    "technologies":"html css js",
    "cost":"90$",
    "category":"foto",
    "pngimg":"note",
    "foto":"f1"
},{
    "name":"CAT LOVE",
    "date":"28.06.2020",
    "technologies":"html",
    "cost":"20$",
    "category":"logo",
    "pngimg":"sound",
    "foto":"l2"
},{
    "name":"WOW COOL",
    "date":"30.03.2012",
    "technologies":"html css js",
    "cost":"35$",
    "category":"design",
    "pngimg":"photo",
    "foto":"d2"
},{
    "name":"MORNING DAY",
    "date":"02.05.2003",
    "technologies":"html",
    "cost":"200$",
    "category":"foto",
    "pngimg":"note",
    "foto":"f2"
},{
    "name":"SWEET DREAMS",
    "date":"22.06.2009",
    "technologies":"html css",
    "cost":"87$",
    "category":"design",
    "pngimg":"photo",
    "foto":"d3"
},{
    "name":"TASTY CHOCOLATE",
    "date":"09.09.2009",
    "technologies":"html css js",
    "cost":"76$",
    "category":"resources",
    "pngimg":"clip",
    "foto":"r2"
},{
    "name":"FRIED POTATO",
    "date":"14.07.2005",
    "technologies":"html",
    "cost":"43$",
    "category":"design",
    "pngimg":"photo",
    "foto":"d4"
},{
    "name":"FAST CAR",
    "date":"15.03.2012",
    "technologies":"html css",
    "cost":"65$",
    "category":"foto",
    "pngimg":"note",
    "foto":"f3"
},{
    "name":"BEST POWER SUPPLY",
    "date":"15.03.2014",
    "technologies":"html css js",
    "cost":"105$",
    "category":"resources",
    "pngimg":"clip",
    "foto":"r3"
},{
    "name":"SUPER GAMING MOUSE",
    "date":"21.09.2003",
    "technologies":"html",
    "cost":"199$",
    "category":"videos",
    "pngimg":"tv2",
    "foto":"w3"
},{
    "name":"AMAZING SPIDER MAN",
    "date":"23.04.2005",
    "technologies":"html css js",
    "cost":"25$",
    "category":"foto",
    "pngimg":"note",
    "foto":"f4"
},{
    "name":"NINJA TURTLE",
    "date":"11.01.2001",
    "technologies":"html css",
    "cost":"413$",
    "category":"design",
    "pngimg":"photo",
    "foto":"d5"
},{
    "name":"FLAT LAPTOP",
    "date":"11.02.2003",
    "technologies":"html",
    "cost":"189$",
    "category":"videos",
    "pngimg":"tv2",
    "foto":"w4"
},{
    "name":"FLEX BOX",
    "date":"01.01.2020",
    "technologies":"html css js",
    "cost":"163$",
    "category":"design",
    "pngimg":"photo",
    "foto":"d6"
},{
    "name":"PAGE RELOAD",
    "date":"15.06.2007",
    "technologies":"js",
    "cost":"65$",
    "category":"foto",
    "pngimg":"note",
    "foto":"f5"
},];

let buttns = document.querySelectorAll('.filters__butn');
let countclick = 0;
let  blockprod;
let products = document.createElement('div');
products.classList.add('newproducts');
document.querySelector('.products').appendChild(products);
buttns.forEach(function(buttns){
    buttns.addEventListener('click', () =>{
        let visibleblock = document.querySelectorAll('.product-block');
        visibleblock.forEach(function(visibleblock){
            visibleblock.hidden = true;
        });
        buttns.classList.toggle("press");
        const ourfilter = document.querySelectorAll('.press');
        if(document.querySelectorAll('.press').length == 0){
            visibleblock.forEach(function(visibleblock){
                visibleblock.hidden = false;
                products.innerHTML = '';
            });
        }
        ourfilter.forEach(function(ourfilter){
            const filter = ourfilter.innerText;
            for (let i in json) {
                if(json[i]["category"] == filter) {
                    blockprod = document.createElement('div');
                    blockprod.classList.add('product-block');
                    blockprod.innerHTML = `
                        <div class="product-block__img">
                            <img src="../image/${json[i]["foto"]}.jpg">
                            <div class="textonpic">
                            <div><span>Name:</span>${json[i]["name"]}</div>
						    <div><span>Date:</span> ${json[i]["date"]};</div>
						    <div><span>Technologies:</span> ${json[i]["technologies"]};</div>
						    <div><span>Cost:</span> ${json[i]["cost"]};</div>
                            </div>
                        </div>
                        <div class="product-block__text">
                        <img src="../image/${json[i]["pngimg"]}.png">
                        ${json[i]["name"]}
                        </div>`;
                    products.appendChild(blockprod);
                }
            }
        });
    })
});
const btnall = document.querySelector('.browse-all-button');
const btnhide = document.querySelector('.hide-all-button');
btnall.addEventListener('click', () =>{
    btnall.hidden = true;
    btnhide.hidden = false;
    products.innerHTML = '';
    visibleblock = document.querySelectorAll('.product-block');
        visibleblock.forEach(function(visibleblock){
            visibleblock.hidden = true;
        });
    buttns.forEach(function(buttns){
        if(!buttns.classList.contains(("press"))){
            buttns.classList.toggle("press");
        }
    })
    const allfilters = document.querySelectorAll('.press');
    allfilters.forEach(function(allfilters){
        const filters = allfilters.innerText;
        for (let i in json) {
            if(json[i]["category"] == filters) {
                blockprod = document.createElement('div');
                blockprod.classList.add('product-block');
                blockprod.innerHTML = `
                    <div class="product-block__img">
                        <img src="../image/${json[i]["foto"]}.jpg">
                        <div class="textonpic">
                        <div><span>Name:</span>${json[i]["name"]}</div>
                        <div><span>Date:</span> ${json[i]["date"]};</div>
                        <div><span>Technologies:</span> ${json[i]["technologies"]};</div>
                        <div><span>Cost:</span> ${json[i]["cost"]};</div>
                        </div>
                    </div>
                    <div class="product-block__text">
                    <img src="../image/${json[i]["pngimg"]}.png">
                    ${json[i]["name"]}
                    </div>`;
                products.appendChild(blockprod);
            }
        }
    });
});
btnhide.addEventListener('click', () =>{
    visibleblock.forEach(function(visibleblock){
        visibleblock.hidden = false;
        products.innerHTML = '';
    });
    btnall.hidden = false;
    btnhide.hidden = true;
    buttns.forEach(function(buttns){
        buttns.classList.remove("press");
    })
});

