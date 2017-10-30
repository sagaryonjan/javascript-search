var search = (function() {

    function searchManagedUrl(url, searchObj) {

        var query = '';

        Object.keys(searchObj).forEach(function(field) {

            query = searchIfValueExist(query, field, searchObj[field]);

        });

        return url+query;
    }

    function searchAllValue( url, searchObj ) {

        var query = '';

        Object.keys(searchObj).forEach(function(field) {

            query = getQuery(query, field, searchObj[field]);

        });

        return url + query;
    }

    
    function searchIfValueExist(query, field, value) {

        if(value !== '') {

            query = getQuery(query, field, value);

        }

        return query;
    }


    function getQuery(query, field, value) {

        if (query == '') {

            query = '?' + field + '=' + value;

        } else {

            query = query + '&' + field + '=' + value;

        }

        return query;

    }

    return {
        generate : '',
        filterUrl: function (url, searchObj) {
            return this.urlFilterGenerator(url, searchObj).redirect();
        },
        url: function (url, searchObj) {
            return this.urlGenerator(url, searchObj).redirect();
        },
        urlFilterGenerator: function (url, searchObj){
            this.generate = searchManagedUrl(url, searchObj);

            return this;
        },
        urlGenerator: function (url, searchObj) {
            this.generate = searchAllValue(url, searchObj);

            return this
        },
        redirect: function () {
            return location.href = this.generate;
        }

    };

})();