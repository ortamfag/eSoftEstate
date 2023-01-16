// const searchName = document.getElementById('searchName')
// const searchSurname = document.getElementById('searchSurname')
// const searchPatronymic = document.getElementById('searchPatronymic')
// const searchButton = document.getElementById('searchButton')
    
// let CRName = document.querySelectorAll('.searchCRFirstName')
// let CRSurname = document.querySelectorAll('.searchCRLastName')
// let CRPatronymic = document.querySelectorAll('.searchCRPatronymicName')

// searchButton.addEventListener('click', () => {
//     clearNoneClasses()

//     CRName.forEach((item) => {
//         if (searchName.value !== '') {
//             if ((item.innerHTML === searchName.value) && (item.parentElement.classList !== ('none'))) {
//                 item.parentElement.style.display = "table-row"
//             } else {
//                 item.parentElement.classList.add('none')
//             }
//         }
//     })

//     CRSurname.forEach((item) => {
//         if (searchSurname.value !== '') {
//             if ((item.innerHTML === searchSurname.value) && (item.parentElement.classList !== ('none'))) {
//                 item.parentElement.style.display = "table-row"
//             } else {
//                 item.parentElement.classList.add('none')
//             }
//         }
//     })

//     CRPatronymic.forEach((item) => {
//         if (searchPatronymic.value !== '') {
//             if ((item.innerHTML === searchPatronymic.value) && (item.parentElement.classList !== ('none'))) {
//                 item.parentElement.style.display = "table-row"
//             } else {
//                 item.parentElement.classList.add('none')
//             }
//         }
//     })
// })

// function clearNoneClasses(){
//     CRName.forEach((item) => {
//         item.parentElement.classList.remove('none')
//     })

//     CRSurname.forEach((item) => {
//         item.parentElement.classList.remove('none')
//     })

//     CRPatronymic.forEach((item) => {
//         item.parentElement.classList.remove('none')
//     })
// }

const estateSelect = document.getElementById('EstateDropdown')

estateSelect.addEventListener('change', () => {
    switch(estateSelect.value) {
        case 'flat':
            const estateFlat = document.getElementById('estate_flat')
            estateFlat.classList.add('activeB')
            break

        case 'territory':
            const estateTerritory = document.getElementById('estate_territory')
            estateTerritory.classList.add('activeB')
            break

        case 'house':
            const estateHouse = document.getElementById('estate_house')
            estateTerritory =
            estateHouse.classList.add('activeB')
            break
    }
})