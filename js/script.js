
let inputName = document.querySelector('.newclient__name');
let inputCounter = document.querySelector('.newclient__counter');
let inputAdress = document.querySelector('.newclient__adress');
let inputPhone = document.querySelector('.newclient__phone');
let inputSource = document.querySelector('.newclient__source');
let inputCity = document.querySelector('.newclient__city');

let btnAddClient = document.querySelector('.newclient__btn');
let formInputs = document.querySelector('.newclient__input-body');
let baseBody = document.querySelector('.base__body');
let baseEmpty = document.querySelector('.base__empty');



const arr = [];

//Активность кнопки при заполнении инпутов



if (localStorage.getItem('client')) {
   client = JSON.parse(localStorage.getItem('client'));
   client.forEach(function (i) {


      const clientHTML = `
   
         <div class="base__client" id="${i.id}">
        
         <div class="base__client_content">
            <h3 class="base__client-name base__client-item">${i.name}</h3>
            <h3 class="base__client-counter base__client-item">${i.counter}</h3>
            <h3 class="base__client-city base__client-item">${i.city}</h3>
            <h3 class="base__client-adress base__client-item">${i.adress}</h3>
            <h3 class="base__client-phone base__client-item">${i.phone}</h3>
            <h3 class="base__client-source base__client-item">${i.source}</h3>
            <h3 class="base__client-price base__client-item">${i.price}</h3>
            <h3 class="base__client-status base__client-item">${i.status}</h3>
            <button class="base__client_button-info">
         <img src="img/cart-icon/info.png" alt="">
      </button>    
         </div>
         <div class="base__action">

                  <button class="base__wrapper-for-icon">
                     <img src="img/cart-icon/reduct.png" alt="">
                  </button>

                  <button id="status-client" class="base__wrapper-for-icon">
                     <img src="img/cart-icon/lucoshko.png" alt="">
                  </button>
                  <button id="delete-client" class="base__wrapper-for-icon">
                     <img src="img/cart-icon/close.png" alt="">
                  </button>
               </div>
</div>
      </div>
      
      `

      baseBody.insertAdjacentHTML('beforeend', clientHTML);



      arr.push(i);


      emptyOrFull();
      removeClient();
      counterFinalSumm();

   })
}




formInputs.addEventListener('input', function () {
   if (inputName.value !== '' && inputCounter.value !== '' && inputAdress.value !== '' && inputPhone.value !== '' && inputSource.value !== '') {

      btnAddClient.style.cursor = 'pointer';
      btnAddClient.style.backgroundColor = 'rgba(255, 0, 55, 0.945)';
   } else if (inputName.value == '' || inputCounter.value == '' || inputAdress.value == '' || inputPhone.value == '' || inputSource.value == '') {
      btnAddClient.style.backgroundColor = 'rgb(226, 186, 186)';
      btnAddClient.style.cursor = 'unset';
   }


})


//добавление нового клиента в базу


formInputs.addEventListener('submit', function (event) {

   event.preventDefault();

   let inputNameValue = inputName.value;
   let inputCounterValue = inputCounter.value;
   let inputAdressValue = inputAdress.value;
   let inputPhoneValue = inputPhone.value;
   let inputSourceValue = inputSource.value;
   let inputCityValue = inputCity.value;

   const clientHTML = `

   <div class="base__client">
  
   <div class="base__client_content">
      <h3 class="base__client-name base__client-item">${inputNameValue}</h3>
      <h3 class="base__client-counter base__client-item">${inputCounterValue}</h3>
      <h3 class="base__client-city base__client-item">${inputCityValue}</h3>
      <h3 class="base__client-adress base__client-item">${inputAdressValue}</h3>
      <h3 class="base__client-phone base__client-item">${inputPhoneValue}</h3>
      <h3 class="base__client-source base__client-item">${inputSourceValue}</h3>
      <h3 class="base__client-price base__client-item"></h3>
      <h3 class="base__client-status base__client-item">ожидает</h3>
      <button class="base__client_button-info">
         <img src="img/cart-icon/info.png" alt="">
      </button>   
   </div>
   <div class="base__action">

                  <button class="base__wrapper-for-icon">
                     <img src="img/cart-icon/reduct.png" alt="">
                  </button>

                  <button id="status-client" class="base__wrapper-for-icon">
                     <img src="img/cart-icon/lucoshko.png" alt="">
                  </button>
                  <button id="delete-client" class="base__wrapper-for-icon">
                     <img src="img/cart-icon/close.png" alt="">
                  </button>
               </div>
</div>

`



   if (inputNameValue !== '' && inputCounterValue !== '' && inputAdressValue !== '' && inputPhoneValue !== '' && inputSourceValue !== '' && inputCityValue !== '') {
      baseBody.insertAdjacentHTML('beforeend', clientHTML);

      let newObj = {
         id: Date.now(),
         name: inputNameValue,
         counter: inputCounterValue,
         city: inputCityValue,
         adress: inputAdressValue,
         phone: inputPhoneValue,
         source: inputSourceValue,
         status: 'ожидает',
         price: 0
      }

      arr.push(newObj);


      saveClientToLS();
      removeClient();
      emptyOrFull();
      counterFinalSumm();

   }




   //очистка инпутов после добавления

   inputName.value = '';
   inputCounter.value = '';
   inputAdress.value = '';
   inputPhone.value = '';
   inputSource.value = '';
   inputCity.value = '';



   //активность кнопки после добавления

   if (inputName.value !== '' && inputCounter.value !== '' && inputAdress.value !== '' && inputPhone.value !== '' && inputSource.value !== '') {

      btnAddClient.style.cursor = 'pointer';
      btnAddClient.style.backgroundColor = 'rgba(255, 0, 55, 0.945)';
   } else if (inputName.value == '' || inputCounter.value == '' || inputAdress.value == '' || inputPhone.value == '' || inputSource.value == '') {
      btnAddClient.style.backgroundColor = 'rgb(226, 186, 186)';
      btnAddClient.style.cursor = 'unset';
   }


})



//передача в local storage

function saveClientToLS() {
   if (inputName.value !== '' && inputCounter.value !== '' && inputAdress.value !== '' && inputPhone.value !== '' && inputSource.value !== '' && inputCity.value !== '') {
      localStorage.setItem('client', JSON.stringify(arr));
   }

}


function saveChangeToLS() {
   localStorage.setItem('client', JSON.stringify(arr));
}



//скрытие/показ "список пуст"

function emptyOrFull() {
   if (arr.length <= 0) {
      baseEmpty.style.display = 'flex';

   }
   if (arr.length > 0) {
      baseEmpty.style.display = 'none';
   }

}


//появление кнопок при нажатии на карточку



window.addEventListener('click', function showHideBlock(event) {
   if (event.target.closest('.base__client')) {
      let iconsBlock = event.target.closest('.base__client').querySelector('.base__action');
      let infoButton = event.target.closest('.base__client').querySelector('.base__client_button-info');
      let infoBlock = event.target.closest('.base__client').querySelector('.base-client-info');

      iconsBlock.classList.toggle('hide');
      removeClient();


      iconsBlock.addEventListener('click', function (event) {
         event.stopPropagation();
      })
      infoButton.addEventListener('click', function (event) {
         event.stopPropagation();
      })


   }

})



//удаление клиента


function removeClient() {
   const deleteClient = document.querySelectorAll('#delete-client');




   deleteClient.forEach(function (i) {
      i.addEventListener('click', function (event) {
         event.preventDefault();
         let cardClientWithBtnClose = event.target.closest('.base__client');
         let cardClientWithBtnCloseId = parseInt(cardClientWithBtnClose.id);



         for (let i = 0; i < arr.length; i++) {
            if (parseInt(arr[i].id) === cardClientWithBtnCloseId) {

               arr.splice(arr.indexOf(arr[i]), 1);
               saveChangeToLS();
               emptyOrFull();
               counterFinalSumm();
            }

         }


         cardClientWithBtnClose.remove();


      })

   })





}

//вызов и закрытие информации

const cardButtonInfo = document.querySelectorAll('.base__client_button-info');

cardButtonInfo.forEach(function (item) {
   item.addEventListener('click', function (event) {

      const cardBlockWithButtonInfo = event.target.closest('.base__client');
      const infoCounter = cardBlockWithButtonInfo.querySelector('.base__client-counter').innerText;
      const infoCity = cardBlockWithButtonInfo.querySelector('.base__client-city').innerText;
      const infoAdress = cardBlockWithButtonInfo.querySelector('.base__client-adress').innerText;
      const infoSource = cardBlockWithButtonInfo.querySelector('.base__client-source').innerText;
      const infoPhone = cardBlockWithButtonInfo.querySelector('.base__client-phone').innerText;
      const infoPrice = cardBlockWithButtonInfo.querySelector('.base__client-price').innerText;


      const infoBlock = `

   <div class="base__client_info base-client-info">
   <h3 class="base-client-info__counter">${infoCounter}</h3>
   <h3 class="base-client-info__city">${infoCity}</h3>
   <h3 class="base-client-info__adress">${infoAdress}</h3>
   <h3 class="base-client-info__phone">${infoPhone}</h3>
   <h3 class="base-client-info__source">${infoSource}</h3>
   <h3 class="base-client-info__price">${infoPrice}</h3>
   <button class="base__client_button-info-close">
      <img src="img/cart-icon/close.png" alt="">
   </button>
</div>

   `

      cardBlockWithButtonInfo.insertAdjacentHTML('beforeend', infoBlock);
      item.style.display = 'none';

      const buttonsCloseInfo = cardBlockWithButtonInfo.querySelector('.base__client_button-info-close');
      const infoBlockForRemove = cardBlockWithButtonInfo.querySelector('.base-client-info');
      buttonsCloseInfo.addEventListener('click', function () {
         infoBlockForRemove.remove();
         item.style.display = 'flex';
      })


   })


})



//смена статуса заказа


const buttonsStatus = document.querySelectorAll('#status-client');

buttonsStatus.forEach(function (item) {
   item.addEventListener('click', function (event) {
      const cardBlockForBtnStatus = event.target.closest('.base__client');
      const infoStatus = cardBlockForBtnStatus.querySelector('.base__client-status');



      infoStatus.classList.toggle('done');

      if (infoStatus.classList.contains('done')) {

         let bodyBlock = document.querySelector('body');

         const RenderEnterSumm = `
         <div class="enter-summ">
            <div class="enter-summ__body">
              <form id="form-enter-summ" class="enter-summ__form">
                 <input required class="enter-summ__input" type="text" placeholder="Введи сумму">
              </form>
            <button class="enter-summ__button" form="form-enter-summ">Добавить</button>
           </div>
         </div>

           `

         bodyBlock.insertAdjacentHTML('beforebegin', RenderEnterSumm);


         const blockEnterSumm = document.querySelector('.enter-summ');
         const enterSummForm = blockEnterSumm.querySelector('.enter-summ__form');



         enterSummForm.addEventListener('submit', function (event) {

            if (enterSummForm.querySelector('.enter-summ__input').value === '') {

            } else {
               event.preventDefault();
               const enterSummInputValue = parseInt(enterSummForm.querySelector('.enter-summ__input').value);
               const infoPrice = cardBlockForBtnStatus.querySelector('.base__client-price');



               infoPrice.innerText = enterSummInputValue;

               arr.forEach(function (i) {
                  if (parseInt(cardBlockForBtnStatus.id) === i.id) {
                     i.price = enterSummInputValue;
                     console.log(i);
                     saveChangeToLS();
                     counterFinalSumm();
                  }
               })


               blockEnterSumm.remove();

            }


         })




         infoStatus.innerText = 'получено';
         const cardBlockForBtnStatusId = parseInt(cardBlockForBtnStatus.id);
         arr.forEach(function (i) {
            if (cardBlockForBtnStatusId === parseInt(i.id)) {
               //arr[arr.indexOf[i]]['status'] = 'получено';
               //console.log(arr);
               i.status = 'получено';
               saveChangeToLS();
            }
         })
      } else {
         infoStatus.innerText = 'ожидает';
         const infoPrice = cardBlockForBtnStatus.querySelector('.base__client-price');
         infoPrice.innerText = '0';
         const cardBlockForBtnStatusId = parseInt(cardBlockForBtnStatus.id);
         arr.forEach(function (i) {
            if (cardBlockForBtnStatusId === parseInt(i.id)) {
               //arr[arr.indexOf[i]]['status'] = 'получено';
               //console.log(arr);
               i.status = 'ожидает';
               i.price = 0;
               saveChangeToLS();
               counterFinalSumm();
            }
         })
      }





   })

})


//подсчет итоговой суммы

function counterFinalSumm() {

   const finalSumm = document.querySelector('.final-base__body');
   let counter = 0;

   arr.forEach(function (item) {
      counter += item.price;
   })

   finalSumm.innerText = counter + ' руб.';

}




//фильтрация



const buttonFilterBlock = document.querySelector('.base__filter-btn');
const buttonFilterItems = document.querySelector('.base__filter-items');

buttonFilterBlock.addEventListener('click', function () {
   buttonFilterItems.classList.toggle('hide');
   buttonFilterItems.addEventListener('click', function (event) {
      event.stopPropagation();
   })
})




const buttonFilterUndone = buttonFilterItems.querySelector('#filter-undone');

buttonFilterUndone.addEventListener('click', function (event) {
   event.preventDefault();

   const infoStatusForFilterBtn = document.querySelectorAll('.base__client-status');

   infoStatusForFilterBtn.forEach(function (i) {
      if (i.innerText === 'получено') {
         const parentNodeFirst = i.parentNode;
         const parentNodeSecond = parentNodeFirst.parentNode;

         parentNodeSecond.style.display = 'none';
      } else {
         i.parentNode.parentNode.style.display = 'flex';
      }
   })
})


const buttonFilterDone = buttonFilterItems.querySelector('#filter-done');

buttonFilterDone.addEventListener('click', function (event) {
   event.preventDefault();

   const infoStatusForFilterBtn = document.querySelectorAll('.base__client-status');

   infoStatusForFilterBtn.forEach(function (i) {
      if (i.innerText === 'ожидает') {
         const parentNodeFirst = i.parentNode;
         const parentNodeSecond = parentNodeFirst.parentNode;

         parentNodeSecond.style.display = 'none';
      } else {
         i.parentNode.parentNode.style.display = 'flex';
      }
   })
})



const buttonFilterAll = buttonFilterItems.querySelector('#filter-all');

buttonFilterAll.addEventListener('click', function (event) {
   event.preventDefault();

   const infoStatusForFilterBtn = document.querySelectorAll('.base__client-status');

   infoStatusForFilterBtn.forEach(function (i) {
      if (i.innerText === 'получено' || i.innerText === 'ожидает') {
         const parentNodeFirst = i.parentNode;
         parentNodeFirst.parentNode.style.display = 'flex';

      }
   })


})

