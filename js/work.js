const url = './data.json';
const dibujar = document.getElementById('json-card');
const svg = `<svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>`;
const dailyBtn = document.getElementById('daily');
const weeklyBtn = document.getElementById('weekly');
const monthlyBtn = document.getElementById('monthly');
const mostrarCards = async ()=>{
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    data.forEach((element, index) =>{
        const {title} = element; 
        const {weekly} = element.timeframes;
        const {current, previous} = weekly
        dibujar.innerHTML +=`
        <article class="card${index}">
            <section>
                <section class="card-container">
                    <section class="card-header">
                    <span>${title}</span>
                    <a href="#">
                        ${svg}
                    </a>
                    </section>
                    <section class="card-main">
                    <h1>${current}hrs</h1>
                    </section>
                    <section class="card-footer">
                    <span>Last Week - ${previous}hrs</span>
                    </section>
                </section>
            </section>
        </article>
        `
    })

    weeklyBtn.addEventListener('click', ()=>{
        weeklyBtn.classList.add('active');
        dailyBtn.classList.remove('active');
        monthlyBtn.classList.remove('active');
        mostrarCards();
    });

    dailyBtn.addEventListener('click', ()=>{
        weeklyBtn.classList.remove('active');
        dailyBtn.classList.add('active');
        monthlyBtn.classList.remove('active');
        data.forEach((element, index) =>{
            const {title} = element; 
            const {daily,weekly,monthly} = element.timeframes;
            const {current, previous} = daily
            dibujar.innerHTML +=`
            <article class="card${index}">
                <section>
                    <section class="card-container">
                        <section class="card-header">
                        <span>${title}</span>
                        <a href="#">
                            ${svg}
                        </a>
                        </section>
                        <section class="card-main">
                        <h1>${current}hrs</h1>
                        </section>
                        <section class="card-footer">
                        <span>Last Day - ${previous}hrs</span>
                        </section>
                    </section>
                </section>
            </article>
            `
        })
    })

    monthlyBtn.addEventListener('click', ()=>{
        weeklyBtn.classList.remove('active');
        dailyBtn.classList.remove('active');
        monthlyBtn.classList.add('active');
        data.forEach((element, index) =>{
            const {title} = element; 
            const {monthly} = element.timeframes;
            const {current, previous} = monthly
            dibujar.innerHTML +=`
            <article class="card${index}">
                <section>
                    <section class="card-container">
                        <section class="card-header">
                        <span>${title}</span>
                        <a href="#">
                            ${svg}
                        </a>
                        </section>
                        <section class="card-main">
                        <h1>${current}hrs</h1>
                        </section>
                        <section class="card-footer">
                        <span>Last Month - ${previous}hrs</span>
                        </section>
                    </section>
                </section>
            </article>
            `
        })
    })
}

mostrarCards();

