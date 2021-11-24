var offset = [0,0],
    id = null,
    pos = 0,
    isDown = false;

var btnDiv = document.querySelector(".button-block"),
    containerWidth = document.querySelector(".bg-change-section .bg-change-inner-block").offsetWidth - 35,
    btnDivHeight = document.querySelector(".bg-change-section .bg-change-inner-block").offsetHeight,
    overlayDiv = document.querySelector(".bg-change-section .second-block"),
    btnInnerDiv = document.querySelector(".bg-change-section .button-image"),
    video = document.querySelectorAll(".bg-change-section .car-video");

let clickTime;

[ btnInnerDiv, btnDiv ].forEach(function(element) {
   element.addEventListener('mousedown', function(e) {      
    isDown = true;
    offset = [
        btnDiv.offsetLeft - e.clientX,
        btnInnerDiv.offsetTop - e.clientY
    ];
    clickTime = new Date();
  }, true);
});


[ btnInnerDiv, btnDiv, document ].forEach(function(element) {
    element.addEventListener('mouseup', function() {
        isDown = false;
    }, true);
});

[ btnInnerDiv, btnDiv ].forEach(function(element) {
    if (screen.width > 767) {
        document.addEventListener('mousemove', function(e) {
            event.preventDefault();
            if (isDown) {
                if (e.clientX + offset[0] >= 0 && e.clientX + offset[0] <= containerWidth) {
                    btnDiv.style.left = (e.clientX + offset[0]) + 'px';
                    overlayDiv.style.width = (e.clientX + offset[0]) + 'px';
                } 

                if((e.clientY + offset[1]) >= 0 && (e.clientY + offset[1]) <= btnDivHeight){
                    btnInnerDiv.style.top  = (e.clientY + offset[1]) + 'px';
                }
            }
        }, true);
    }
});




btnInnerDiv.addEventListener("click", function(event) {
    if (new Date() - clickTime < 150) {
        document.querySelector('.bg-change-inner-block').classList.toggle('video-control');
        if (screen.width > 767) {
            for (let i = 0; i < video.length; i++) {
                if (document.querySelector('.bg-change-inner-block').classList.contains('video-control')) {
                    video[i].pause();
                }
                else{
                    video[i].play();   
                }
            }
        }
      } else {}
    
});

const tabList = document.querySelectorAll(".tab-listing li");

for (let i = 0; i < tabList.length; i++) {
    tabList[i].addEventListener("click", function(event) {
        for (let j = 0; j < tabList.length; j++) {
          tabList[j].classList.remove('active');
        }
        event.target.classList.add('active');
        const tabElement = event.target.getAttribute('data-id');

        overlayDiv.classList.add('transition-style');
        btnDiv.classList.add('transition-style');
        setTimeout(function(){ 
            overlayDiv.classList.remove('transition-style');
            btnDiv.classList.remove('transition-style');
         }, 1500);
        if (tabElement === 'storage-lifecycle') {
            btnDiv.style.left = containerWidth + 'px';
            overlayDiv.style.width = containerWidth + 'px';
        }
        else if (tabElement === 'refresh-cycle') {
            btnDiv.style.left = 0 + 'px';
            overlayDiv.style.width = 0 + 'px';
        }
    });
}