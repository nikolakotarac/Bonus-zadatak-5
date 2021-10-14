
(function  () {
   const APIKEY = 'rSr9rG1PYvi1yJLKJR5P594fWfmmUayMIMJijSv9cz4';
    const body = document.querySelector('body')
   const main = document.getElementById('main');
   const gridBtn = document.querySelector('.grid-btn');
   const listBtn = document.querySelector('.list-btn');
   const gridTxt = document.querySelector('.grid h3');
   const listTxt = document.querySelector('.list h3');
   const loading = document.querySelector('.loading');
   const lightbox = document.querySelector('.lightbox');
   const lightboxImg = document.querySelector('.lightbox img');
   
   
   let page = 1;
   
   function getData() {
       fetch(`https://api.unsplash.com/photos/?page=${page};per_page=9;client_id=${APIKEY}`)
       .then(res => res.json())
       .then(res => {
           const data = res;
        //    console.log(data)
           showPhotos(data)
       })    
   }
   
   function showPhotos(data) {
       data.forEach(photo => {

           const card = document.createElement('div');
           card.classList.add('card');
           card.classList.add(`${photo.id}`);
           const mainCont = document.createElement('div');
           mainCont.classList.add('main-content');
           const user = document.createElement('div');
          
               const img = document.createElement('div');
               img.classList.add('img-content');
               const mainImg = document.createElement('img');
               mainImg.src = photo.urls.small;
               mainImg.alt = photo.alt_description? photo.alt_description : `Image`;
               mainImg.title = photo.alt_description ? photo.alt_description : photo.description ? photo.description : '';
           const about = document.createElement('div');
          about.classList.add('about');
           user.classList.add('avatar');
           const avatar = document.createElement('img');
           avatar.src = photo.user.profile_image.medium;
           const userName = document.createElement('h3');
           userName.textContent  = `${photo.user.first_name} ${photo.user.last_name ||"" }`;
               const info = document.createElement('p');
               info.classList.add('info')
               info.innerHTML = `<a href="${photo.user.links.html}" target="_blank">@profile</a>
               <a href="https://instagram.com/${photo.user.social.instagram_username || ""}">@instagram</a>
               <a href="https://twitter.com/${photo.user.social.twitter_username || ""}">@twitter</a> 
                `
              
               const more = document.createElement('p');
               more.classList.add('more');
               more.innerHTML = `<span class="url">More info</span>`;
        
            main.append(card);
            card.append(mainCont);
            user.append(avatar);
            user.append(userName);
            mainCont.append(img);
            img.append(mainImg);
            card.append(about);
            about.append(user);
            about.append(info);
            about.append(more);
     
           mainImg.addEventListener('click', ()=> {
               const content = data.find(photo => photo.id === card.classList[1]);
               openLoading(content)
               console.log(content)
           })
   
           more.addEventListener('click', ()=> {
               window.open(`${photo.links.html}`, '_blank');
           })
       })
   
       loading.classList.remove('show')
       page++
   
   }
   function openLoading(imgData) {
    lightbox.classList.add('active')
    lightboxImg.src = imgData.urls.small;
}
   function showLoading(){
       loading.classList.add('show');
       setTimeout(getData,1000)
   }
   
   function scrolling() {
       const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
   
      if(clientHeight + scrollTop >= scrollHeight - 1) {
         showLoading();
      }
   }
   
   setTimeout(showLoading,1000)
   
   window.addEventListener('scroll', scrolling)

   gridBtn.addEventListener('click', () => {
       main.classList.remove('list');
       gridBtn.style.filter = "invert(45%) sepia(69%) saturate(2100%) hue-rotate(162deg) brightness(96%) contrast(101%)";
       listBtn.style.filter = "invert(17%) sepia(15%) saturate(1136%) hue-rotate(178deg) brightness(90%) contrast(87%)";
       listTxt.style.color = "#2B3442";
       gridTxt.style.color = "#00a4d6";
   })
   
   listBtn.addEventListener('click', () => {
       main.classList.add('list');
       listBtn.style.filter = "invert(45%) sepia(69%) saturate(2100%) hue-rotate(162deg) brightness(96%) contrast(101%)";
       gridBtn.style.filter = "invert(17%) sepia(15%) saturate(1136%) hue-rotate(178deg) brightness(90%) contrast(87%)";
       gridTxt.style.color = "#2B3442";
       listTxt.style.color = "#00a4d6";
   })
   lightbox.addEventListener('click', (e)=> {
    if(e.target !== e.currentTarget) 
    return 
    lightbox.classList.remove('active');
})
  
   }());
