"use strict";let $=document;import{albumName as e,audios as t,backgroundMusic as n,dateAlbum as a,durationMusic as r,genreAlbum as i,singersAlbums as l,songNames as s}from"./datas.js";import{slider as d}from"./slider.js";let audio=$.getElementById("audio"),time_past=$.getElementById("time-past"),time_left=$.getElementById("time-left"),fill=$.getElementById("fill"),fill_btn=$.getElementById("fill-btn"),imgMusicHead=$.querySelector(".img-music-head "),backgroundPage=$.getElementById("background"),album=$.querySelector(".album"),singer=$.querySelector(".singer"),songName=$.querySelector(".song-name"),btnPlayPause=$.querySelector(".btn-play-pause"),btnBackward=$.getElementById("btn-backward"),btnForward=$.getElementById("btn-forward"),repeat=$.querySelector(".bi-repeat"),shuffle=$.querySelector(".bi-shuffle"),imgMusicTb=$.querySelector(".img-music-table"),prevAlbumBtn=$.querySelector(".fa-angle-left"),nextAlbumBtn=$.querySelector(".fa-angle-right"),songNameTb=$.querySelector(".song-name-tb"),singerNameTb=$.querySelector(".singer-name"),genreSongTb=$.querySelector(".genre-song"),favoriteAlbumParent=$.querySelector(".favorite-album-parent"),parentLiList=$.querySelector(".parent-li-list"),dateEducation=$.querySelector(".date-education"),traksNumber=$.querySelector(".traks-number"),minutesSongs=$.querySelector(".minute-songs"),forwardArrow=!1,backArrow=!1,played=!1,numberLi=0,number=0,indLi=0,ind=0,num=0,numPlus=0,indexCard=-1,indexFavorite=0,indexnext=number-1,numberMax=null,numberMaxPrev=null,liTagElem,itemSongFrogment=$.createDocumentFragment(),cardSongFrogment=$.createDocumentFragment(),favoriteFrogment=$.createDocumentFragment(),cardMusicRow=$.querySelector(".card-music-row"),cardMusicBtn,favoritCard,spanElem;function nextSound(){numberMax+=number,number>0&&!favoriteAlbumParent.children[0].classList.contains("d-none")&&favoriteAlbumParent.children[0].classList.add("d-none"),0==number&&favoriteAlbumParent.children[0].classList.contains("d-none")?(indexnext=t.length-1,num=0,favoriteAlbumParent.children[numberMaxPrev].classList.contains("d-none")||favoriteAlbumParent.children[numberMaxPrev].classList.add("d-none")):(numberMax>numberMaxPrev?(numberMaxPrev&&!favoriteAlbumParent.children[numberMaxPrev].classList.contains("d-none")&&favoriteAlbumParent.children[numberMaxPrev].classList.add("d-none"),num>number&&(numPlus=num),num+=number,indexnext=numberMaxPrev||num-number,num>number&&(num=number-numPlus)):numberMaxPrev>numberMax&&0==!number&&(indexnext=numberMaxPrev),numberMaxPrev&&numberMax<numberMaxPrev&&!favoriteAlbumParent.children[numberMaxPrev].classList.contains("d-none")&&favoriteAlbumParent.children[numberMaxPrev].classList.add("d-none"),numberMaxPrev=numberMax),favoriteAlbumParent.children[number].classList.contains("d-none")&&(favoriteAlbumParent.children[indexnext||numberMaxPrev].classList.add("d-none"),favoriteAlbumParent.children[number].classList.remove("d-none")),numberMax=0}let backSound=()=>{cardMusicBtn[number].classList.remove("text-dark"),0==number&&0==ind?(ind=0,number=l.length-1,nextSound()):number<=l.length-1&&0==ind&&(number--,nextSound()),0==ind&&s[number].length-1>0?0==ind&&(ind=s[number].length-1):ind<=s[number].length-1&&ind>0&&ind--,cardMusicBtn[number].classList.add("text-dark")},forwardSound=()=>{cardMusicBtn[number].classList.remove("text-dark"),++ind==s[number].length&&(number+1>l.length-1?(number=0,ind=0,nextSound()):number>=0&&ind>=0&&(number++,ind=0,nextSound())),cardMusicBtn[number].classList.add("text-dark")},textsAndPics=()=>{imgMusicTb.src=[...n][number],songNameTb.innerHTML=e[number],singerNameTb.innerHTML=l[number],genreSongTb.innerHTML=i[number],dateEducation.innerHTML=a[number],traksNumber.innerHTML=s[number].length+" tracks";let d=0;backgroundPage.style.backgroundImage=`url(" ${n[number]} ") `,imgMusicHead.src=[...n][number],songName.innerHTML=s[number][ind],album.innerHTML=e[number],singer.innerHTML=l[number],audio.src=t[number][ind],console.log("ind",ind),console.log("number",number);let c,u;for(let o of(indLi=0,s[number])){if(c=r[number][numberLi++],(u=$.createElement("li")).className="li-elem mx-0 mx-md-5 border-li py-3 text-light d-flex justify-content-between align-items-center",u.setAttribute("numberAlbum",`${number}`),u.setAttribute("indexAlbum",`${indLi++}`),u.insertAdjacentHTML("afterbegin",`                

            <p class="song-name-table me-2 w-100 d-flex align-items-center justify-content-start" style="margin-bottom: 0rem;">${o}</p>
            
            <div class=" d-flex align-items-center">
                <span class="duration-time ms-3 ms-lg-5">${c}</span>
                <i class="ms-3" title="Add To Your List Favorite">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </i>
            </div>

        `),itemSongFrogment.append(u),number>=0){let m=Array.from(parentLiList.children);for(let b of m)b.remove()}d+=parseInt(c.replace(":","."))}numberLi=0,minutesSongs.innerHTML="+"+d+"m",parentLiList.append(itemSongFrogment),(liTagElem=$.querySelectorAll(".li-elem")).forEach(e=>{e.children[0].innerHTML==songName.innerHTML&&listMusicLi(e),e.addEventListener("click",()=>{listMusicLi(e),(ind=0)<0&&(ind=0),(ind=ind>=liTagElem.length-1?+e.getAttribute("indexAlbum")-liTagElem.length:+e.getAttribute("indexAlbum"))<0&&(ind=0),played=!1,specification(),play_and_pause()})})};function listMusicLi(e){[...liTagElem].find(e=>{e.classList.contains("active")&&(e.classList.remove("active"),e.style.backgroundColor="transparent",e.children[0].style.color="#fff",e.style.animation="")}),e.classList.contains("active")||(e.style.backgroundColor="rgba(10,10,10,1)",e.children[0].style.color="orange",e.classList.add("active"),e.style.animation="lineColor 5s ease-in-out infinite")}let specification=()=>{forwardArrow?(forwardSound(),forwardArrow=!1):backArrow&&(backSound(),backArrow=!1),textsAndPics()},btnForwardHandler=()=>{forwardArrow=!0,specification(),played=!1,play_and_pause()},btnBackwardHandler=()=>{backArrow=!0,specification(),played=!1,play_and_pause()},play_and_pause=()=>{played&&"-0:00"==time_left.innerText&&(played=!1),played?(played=!1,btnPlayPause.classList.replace("fa-pause","fa-play"),btnPlayPause.setAttribute("title","Play"),imgMusicHead.style.animation="",audio.pause()):(played=!0,btnPlayPause.classList.replace("fa-play","fa-pause"),btnPlayPause.setAttribute("title","Pause"),imgMusicHead.style.animation="bgMove 35s linear infinite alternate",audio.play());let e=e=>{let t=parseInt(e/60),n=parseInt(e-60*t);return n>9?t.toString()+":"+n.toString():t.toString()+":0"+n.toString()};audio.addEventListener("timeupdate",function(){fill.style.width=100*audio.currentTime/audio.duration+"%",fill_btn.style.left=100*audio.currentTime/audio.duration+"%",time_past.innerText=e(audio.currentTime),time_left.innerText="-"+e(audio.duration-audio.currentTime),"-0:00"==time_left.innerText&&!audio.hasAttribute("loop")&&(time_left.innerHTML="-0:00",time_past.innerHTML="0:00",fill.style.width="0%",fill_btn.style.left="0%",btnPlayPause.setAttribute("title","Play"),btnPlayPause.classList.replace("fa-pause","fa-play"),imgMusicHead.style.animation="",repeat.classList.contains("activeRepeat")?btnForwardHandler():shuffle.classList.contains("active")&&randomMusic()),"-NaN:0NaN"==time_left.innerText&&(time_left.innerText="-0:00")})},randomMusic=()=>{shuffle.style.color="orange",ind=s[number=parseInt(Math.random()*(l.length-1))].length>0?parseInt(Math.random()*s[number].length):parseInt(Math.random()*s[number][ind]),audio.src=t[number][ind],specification(),played=!1,play_and_pause()},shuffleHandler=()=>{shuffle.classList.toggle("active"),shuffle.classList.contains("active")?randomMusic():shuffle.style.color="white"},repeatHandler=()=>{repeat.classList.toggle("activeRepeat"),repeat.classList.contains("activeRepeat")&&(repeat.style.color="orange",played=!1,play_and_pause(),repeat.setAttribute("title","Repeat Music")),repeat.classList.contains("activeRepeat")?repeat.classList.contains("bi-repeat-1")&&(repeat.classList.replace("bi-repeat-1","bi-repeat"),audio.removeAttribute("loop",""),repeat.style.color="white",repeat.classList.remove("activeRepeat"),repeat.setAttribute("title","Repeat Albums")):(repeat.classList.replace("bi-repeat","bi-repeat-1"),audio.setAttribute("loop",""),repeat.setAttribute("title",""))},prevAlbumBtnHandler=()=>{cardMusicBtn[number].classList.remove("text-dark"),ind=0,number<=0?number=t.length-1:number--,specification(),played=!1,play_and_pause(),cardMusicBtn[number].classList.add("text-dark"),nextSound()},nextAlbumBtnHandler=()=>{cardMusicBtn[number].classList.remove("text-dark"),ind=0,number>=t.length-1?number=0:number++,specification(),played=!1,play_and_pause(),cardMusicBtn[number].classList.add("text-dark"),nextSound()};function favoriteAlbumCard(){indexFavorite=-1,t.forEach(()=>{indexFavorite++,(spanElem=$.createElement("span")).className=`favorite-album d-inline-flex ${indexFavorite} d-none`,spanElem.insertAdjacentHTML("afterbegin",'<i class="bi bi-bookmark-heart text-secondary fst-normal d-flex align-items-center" style="transition: all 400ms;">Favorite</i>'),favoriteFrogment.append(spanElem)}),favoriteAlbumParent.append(favoriteFrogment),$.querySelectorAll(".favorite-album").forEach(e=>{e.addEventListener("click",()=>{e.firstElementChild.classList.toggle("red"),e.firstElementChild.classList.toggle("text-danger"),$.querySelectorAll(".favorit-card__text").forEach(t=>{t.classList[5]==e.classList[2]&&t.classList.toggle("text-danger")})})})}favoriteAlbumCard(),favoriteAlbumParent.children[number].classList.contains("d-none")&&favoriteAlbumParent.children[number].classList.remove("d-none");let cards=()=>{t.forEach(()=>{indexCard++;let t=$.createElement("div");t.className="col-6 mx-auto mx-lg-0 col-sm-5 col-lg-4 col-xxl-2 mt-5 ",t.insertAdjacentHTML("afterbegin",`                
            <div class="card-sound h-100">
                <div class="card-music-img">
                    <div class="card-music-img-child">
                        <img src='${n[indexCard]}' class="card-music-img__img" alt="image card">
                        <div class="card-music-img__btn">
                            <i class="fas fa-play main-button fs-3 mx-5 over btn-play-pause card-music-img__btn-play ${indexCard}" title="Play" ></i>
                        </div>
                    </div>
                </div>
                <div class="spece-parent">
                    <div class="spec-card">
                        <p class="name-album-card">Album ${e[indexCard]}</p>
                        <small class="name-singer-card">Singer ${l[indexCard]}</small>
                    </div>
                    <div class="favorit-card over">
                        <i class="bi bi-bookmark-heart favorit-card__text fs-5 fst-normal ${indexCard}"><h5 class="fs-6">Favorite</h5></i>
                    </div>
                </div>
            </div>
        `),cardSongFrogment.append(t)}),cardMusicRow.append(cardSongFrogment),cardMusicBtn=$.querySelectorAll(".card-music-img__btn-play"),(favoritCard=$.querySelectorAll(".favorit-card__text")).forEach(e=>{e.addEventListener("click",()=>{e.classList.toggle("text-danger"),favoriteAlbumParent.children[e.classList[5]].firstElementChild.classList.toggle("text-danger"),favoriteAlbumParent.children[e.classList[5]].firstElementChild.classList.toggle("red")})}),cardMusicBtn[number].classList.add("text-dark"),cardMusicBtn.forEach(e=>{e.addEventListener("click",t=>{cardMusicBtn[number].classList.remove("text-dark"),e.classList.add("text-dark"),number=+e.classList[8],ind=0,played=!1,specification(),play_and_pause(),nextSound(),console.log(t.target.classList[8])})})};specification(),d("volum","volum"),d("time-line","time-line",()=>{audio.pause()},()=>{played&&audio.play()}),cards(),btnForward.addEventListener("click",btnForwardHandler),btnBackward.addEventListener("click",btnBackwardHandler),btnPlayPause.addEventListener("click",play_and_pause),shuffle.addEventListener("click",shuffleHandler),repeat.addEventListener("click",repeatHandler),prevAlbumBtn.addEventListener("click",prevAlbumBtnHandler),nextAlbumBtn.addEventListener("click",nextAlbumBtnHandler);