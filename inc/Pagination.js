const conn = require('./db');
class Pagination {
    constructor(
        query,
        params = [],
        itemsPerPage = 10
    ) {
        this.query = query;
        this.params = params;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
    }
    getPage(page = 1) {
        this.currentPage = page - 1;
        return new Promise((resolve, reject) => {
            this.params.push(
                this.currentPage * this.itemsPerPage,
                this.itemsPerPage
            );
            conn.query([this.query, 'SELECT FOUND_ROWS() AS FOUND_ROWS'].join(';'), this.params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    this.data = results[0];
                    this.total = results[1][0].FOUND_ROWS;
                    this.totalPages = Math.ceil(this.total / this.itemsPerPage);
                    this.currentPage++;
                    resolve(this.data);
                }
            });
        });
    }
    getTotal() {
        return this.total;
    }
    getCurrentPage() {
        return this.currentPage;
    }
    getTotalPages() {
        return this.totalPages;
    }
    getQueryString(obj) {
        let params = [];
        for (let name in obj) {
            params.push(`${name}=${obj[name]}`);
        }
        return params.join('&');
    }
    getNavigation(params) {
        let limitPageNav = 5;
        let links = [];
        let nrstart = 0;
        let nrend = 0;
        if (this.getTotalPages() < limitPageNav) {
            limitPageNav = thi.getTotalPages();
        }
        if ((this.getCurrentPage() - parseInt(limitPageNav / 2)) < 1) {
            nrstart = 1;
            nrend = limitPageNav;
        } else if ((this.getCurrentPage() + parseInt(limitPageNav / 2)) > this.getTotalPages()) {
            nrstart = this.getTotalPages() - limitPageNav;
            nrend = this.getTotalPages();
        } else {
            nrstart = this.getCurrentPage() - parseInt(limitPageNav / 2)
            nrend = this.getCurrentPage() + parseInt(limitPageNav / 2)

        }
        if (this.getCurrentPage() > 1) {
            links.push({
                text: '<<',
                href: '?' + this.getQueryString(Object.assign({}, params, {
                    page: this.getCurrentPage() - 1
                }))
            });
        }
        for (let x = nrstart; x <= nrend; x++) {
            links.push({
                text: x,
                href: '?' + this.getQueryString(Object.assign({}, params, { page: x })),
                active: (x === this.getCurrentPage())
            });
        }
        if (this.getCurrentPage() < this.getTotalPages()) {
            links.push({
                text: '>>',
                href: '?' + this.getQueryString(Object.assign({}, params, {
                    page: this.getCurrentPage() + 1
                }))
            })
        }
        return links
    }
}
module.exports = Pagination;