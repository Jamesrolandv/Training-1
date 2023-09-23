// FILE UPLOAD and Forms Submit===========================================

let file = document.querySelector('#file');
let button = document.querySelectorAll('.buttons button');
let progress = document.querySelector('progress');
let p_i = document.querySelector('.progress-indicator');
let load = 0;
let process = "";

file.oninput = () => {
    let fileName = file.files[0].name;
    let extension = fileName.split('.').pop();
    let fileSize = file.files[0].size;
    if(fileSize <= 1000000){
        fileSize = (fileSize/1000).toFixed(2) + 'kb';
    }
    if(fileSize == 1000000 || fileSize <= 1000000000){
        fileSize = (fileSize/1000000).toFixed(2) + 'mb';
    }
    if(fileSize == 1000000000 || fileSize <= 1000000000000){
        fileSize = (fileSize/1000000000).toFixed(2) + 'gb';
    }
    document.querySelector('form h4').style.visibility = 'hidden';
    document.querySelector('label[for="file"]').style.opacity = 1;
    document.querySelector('label[for="file"]').innerText = fileName;
    document.querySelector('.ex').innerText = extension;
    document.querySelector('.size').innerText = fileSize;
    button[0].style.visibility = 'visible';
    getFile(fileName);

}

let upload = () => {
    if(load >= 100){
        clearInterval(process);
        p_i.innerHTML = `100% Upload Completed`;
        button[0].classList.remove('active');
        button[1].style.visibility = 'hidden';
    }
    else{
        load++;
        progress.value = load;
        p_i.innerHTML = `${load}% Upload`;
        document.querySelector('.pr').style.opacity = 1;
        button[1].onclick = btn => {
            btn.preventDefault();
            clearInterval(process);
            document.querySelector('.pr').style.opacity = 0;
            button[1].style.visibility = 'hidden';
            button[0].classList.remove('active');
        }
    }
}

function getFile(fileName){
    if(fileName){
        document.querySelector('.pr').style.opacity = 1;
        load = 0;
        progress.value = 0;
        p_i.innerText = '';
        button[0].onclick = btn => {
            btn.preventDefault();
            button[0].classList.add('active');
            button[1].style.visibility = 'visible';
            process = setInterval(upload, 100);
        }
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    for (item of formData){
        console.log(item[0], item[1]);
    }
    document.querySelector('#form-result').textContent = 'Form Complete!';
})
// ======================================================

// INTERSECTION OBSERVER=================================

// information-------------------------------------------

const infos = document.querySelectorAll('.content-info');
let infoCards = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(window.innerWidth <= 960){
            infos.forEach(info => {
                info.classList.add('is-showing');
            })
            return infoCards;
        }else {
            entry.target.classList.toggle('is-showing', entry.isIntersecting);
        }
   
    });
}, {
    threshold: .8,
});
infos.forEach(info => {
    infoCards.observe(info);  
});


// cards------------------------------------------------

const cards = document.querySelectorAll('.card');
const cardContainer = document.querySelector('.card-overflow');
const cardSlider = document.querySelector('.card').offsetWidth;

document.addEventListener('click', () => {
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('click');
        })
    })
})



let isCardDragging = false, startX, startScrollLeft, timeOutIdCard, timeOutId;

let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(window.innerWidth <= 960){
            cards.forEach(card => {
                card.classList.add('is-showing');
            })
            return observer;
        }else{
            entry.target.classList.toggle('is-showing', entry.isIntersecting);
        }
        
        
    });
}, {
    threshold: .2,
});

cards.forEach(card => {
    observer.observe(card);
})

const cardStart = (e) => {
    isCardDragging = true;
    cardContainer.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = cardContainer.scrollLeft;
    clearTimeout(timeOutIdCard); 
}

const draggingCard = (e) => {
    if(!isCardDragging) return draggingCard;
    cardContainer.scrollLeft = startScrollLeft - (e.pageX - startX);
    clearTimeout(timeOutIdCard);
}

const cardStop = () => {
    isCardDragging = false;
    cardContainer.classList.remove('dragging');
    autoPlayCard();
}

const autoPlayCard = () => {   
    timeOutIdCard = setTimeout(() => {
        cards.forEach(() => {
            cardContainer.scrollLeft += cardSlider;
            
            if(cardContainer.scrollLeft === cardContainer.scrollWidth - cardContainer.offsetWidth){
                cardContainer.scrollLeft = 0;
                return;
            }
        })        
    }, 3000);
};

autoPlayCard();

cardContainer.addEventListener('mousedown', cardStart);
cardContainer.addEventListener('mousemove', draggingCard);
document.addEventListener('mouseup', cardStop);
cardContainer.addEventListener('mouseover', () => clearTimeout(timeOutIdCard));
cardContainer.addEventListener('mouseleave', autoPlayCard);
// videoplay on screen-------------------------------------

const vid = document.querySelector('.vid1');

let vid1 = new IntersectionObserver(entry => {
    entry.forEach(entries => {
        entries.isIntersecting ? vid.play() : vid.pause();
    })
}, {
    threshold: .2,
})

vid1.observe(vid);

// ===================================================================

// showing============================================================

const cardFade = document.querySelectorAll('.card-label');

let cardIndex = 0;

const fadeCard = () => {
    cardFade[cardIndex].classList.remove('showing-card');

    cardIndex++;

    if(cardIndex >= cardFade.length){
        cardIndex = 0;
    }

    cardFade[cardIndex].classList.add('showing-card');
};

setInterval(fadeCard, 5000);



// navigation rate-----------------------------------------------------

const arrowBtns = document.querySelectorAll('.slider-button i');
const arrowCard = document.querySelectorAll('.carousel_slide');
let radioBtn = 1;
setInterval(() => {
    document.getElementById('radio' + radioBtn).checked = true;
    radioBtn++;
    if(radioBtn > 3){
        radioBtn = 1;
    }else if (radioBtn < 1){
        radioBtn = 3;
    }
}, 5000);

function arrow() {
    
}
arrowBtns.forEach(arrowBtn => {
    arrowBtn.addEventListener('click', () => {
        document.getElementById('radio' + radioBtn).checked = true;
        radioBtn++;
        if(radioBtn > 3){
            radioBtn = 1;
        }else if (radioBtn < 1){
            radioBtn = 3;
        }

        if(arrowBtn.id == "left"){
            document.getElementById('radio' + radioBtn).checked = true;
            radioBtn -= 1;
            radioBtn++
        }
    });
    });

