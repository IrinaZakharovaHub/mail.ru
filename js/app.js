(function () {

    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    function json(response) {
        return response.json()
    }

    function createFetchMethod(address) {
        fetch(`${address}.json`)
            .then(status)
            .then(json)
            .then(function (data) {
                init(data);
            }).catch(function (error) {
            console.log('Request failed', error);
        });
    }

    function init(data) {
        let grid = data;
        createGroup(grid);
    }

    function createGroup(data) {
        console.log(data);
        for (let key in data) {
            let arrForSort = [];
            let name = document.querySelector(`.groups__group--${key}`);
            data[key].forEach(function (el, i) {
                console.log(el);
                arrForSort.push(el);
                arrForSort.sort(compareRating);
                setTimeout(()=> {
                    let gridRow = document.createElement('div');
                    gridRow.classList.add('groups__row');
                    let gridRating = document.createElement('div');
                    gridRating.classList.add('groups__ratings');
                    gridRow.appendChild(addDiv(arrForSort[i].place, "groups__place"));
                    gridRow.appendChild(addImg(arrForSort[i].logo, "groups__logo"));
                    gridRow.appendChild(addDiv(arrForSort[i].name, "groups__name"));
                    arrForSort[i].rating.forEach(function(el, i) {
                        gridRating.appendChild(addDiv(el, "groups__rating"));
                    });
                    gridRow.appendChild(gridRating);
                    name.lastElementChild.appendChild(gridRow);
                });
            });
        }
    }

    function addImg(link, className) {
        let img = document.createElement('img');
        img.classList.add(className);
        img.src = `img/${link}`;
        return img;
    }

    function addDiv(text, className) {
        let div = document.createElement('div');
        div.classList.add(className);
        div.textContent = text;
        return div;
    }

    function compareRating(a, b) {
        return a.place - b.place;
    }

    document.querySelector('.grid').addEventListener('click', function(e) {
        if (e.target.classList.contains('grid__subtab')) {
            [...document.querySelectorAll('.grid__subtab')].forEach((el)=> {
                el.classList.remove('active');
            });
            e.target.classList.add('active');
            [...document.querySelectorAll(`.groups__content`)].forEach(
                (el)=> {
                    el.innerHTML = '';
                }
            );
            createFetchMethod(e.target.getAttribute('data-address'))
        }
        e.preventDefault();
        e.stopPropagation();
    });

    createFetchMethod('data')

})();
